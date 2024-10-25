const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');
const configPath = path.resolve(__dirname, './config.json');
const { DynamoDBClient, GetItemCommand } = require('@aws-sdk/client-dynamodb');
const { TranslateClient, TranslateTextCommand } = require('@aws-sdk/client-translate');


let try_config;
try {
    try_config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
} catch (err) {
    console.error('Config 파일을 읽는 도중 오류가 발생했습니다: ', err);
    process.exit(1);
}

const client = new Client({ 
	intents: [GatewayIntentBits.Guilds, 
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent ] });


client.commands = new Collection();
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
const dynamodbClient = new DynamoDBClient({
    region: config.region,
    credentials: {
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey,
    },
});

const translateClient = new TranslateClient({
    region: config.region,
    credentials: {
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey,
    },
});


for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

client.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;
	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});

// 실시간 채팅 번역 코드
// choose_irt_trans.js 에서 Yes를 눌렀을 시 실행됨
client.on('messageCreate', async message => {
    // 봇이 보낸 메시지나 번역된 메시지는 무시
    if (message.author.bot || message.content.startsWith('[Translated]')) return;

    // 요청한 유저의 ID 가져오기
    const userId = message.author.id;

    // DynamoDB에서 유저 데이터 가져오기
    const userParams = {
        TableName: 'PG_Users', // 테이블 이름을 명시적으로 설정
        Key: {
            userID: { S: userId }, // 키는 userID로 설정되어 있다고 가정
        },
    };

    try {
        // PG_server 테이블에서 채널 정보를 가져오기
        const serverParams = {
            TableName: 'PG_server',
            Key: {
                serverID: { S: message.guild.id }, // serverID를 기준으로 조회
            },
        };

        const serverCommand = new GetItemCommand(serverParams);
        const serverData = await dynamodbClient.send(serverCommand);

        if (serverData.Item) {
            const chattingID = serverData.Item.chattingID ? serverData.Item.chattingID.S : null;
            
            // 현재 메시지가 전송된 채널이 지정된 채널인지 확인
            if (message.channel.id !== chattingID) {
                console.log('이 채널에서는 봇이 작동하지 않도록 설정되어 있습니다.');
                return;
            }
        } else {
            console.error('PG_server 테이블에서 서버 데이터를 찾을 수 없습니다.');
            return;
        }

        const userCommand = new GetItemCommand(userParams);
        const userData = await dynamodbClient.send(userCommand);

        if (userData.Item) {
            const translateData = userData.Item.irt_translate ? userData.Item.irt_translate.BOOL : false;
            let sourceLang = userData.Item.sourceLanguage ? userData.Item.sourceLanguage.S : 'en';
            let targetLang = userData.Item.targetLanguage ? userData.Item.targetLanguage.S : 'es';

            // 언어 이름을 코드로 변환
            const languageMap = {
                'Korean': 'ko',
                'English': 'en',
                'Spanish': 'es',
                'French': 'fr',
                'Japanese': 'ja'
            };

            sourceLang = languageMap[sourceLang] || sourceLang;
            targetLang = languageMap[targetLang] || targetLang;

            if (translateData) {
                // 언어 설정 유효성 검사 및 AWS Translate 요청 보내기
                const validLangs = ['ko', 'en', 'es', 'fr', 'ja'];

                let sourceLanguageCode = validLangs.includes(sourceLang) ? sourceLang : 'en';
                if (!validLangs.includes(sourceLang)) {
                    console.error(`지원되지 않는 원본 언어 설정: ${sourceLang}`);
                    sourceLanguageCode = 'en'; // 기본값으로 설정
                }

                let targetLanguageCode = validLangs.includes(targetLang) ? targetLang : 'es';
                if (!validLangs.includes(targetLang)) {
                    console.error(`지원되지 않는 대상 언어 설정: ${targetLang}`);
                    targetLanguageCode = 'es'; // 기본값으로 설정
                }

                const translateParams = {
                    Text: `${message.content}`,
                    SourceLanguageCode: sourceLanguageCode,
                    TargetLanguageCode: targetLanguageCode,
                };

                try {
                    const translateCommand = new TranslateTextCommand(translateParams);
                    const translateResult = await translateClient.send(translateCommand);
                    const translatedText = translateResult.TranslatedText;
                    await message.reply(`${translatedText}`);
                } catch (translateError) {
                    console.error('Translate 요청 오류: ', translateError);
                    await message.reply('번역 중 오류가 발생했습니다. 다시 시도해 주세요.');
                }
            } else {
                console.log(`유저 ID: ${userId}, 번역 활성화 여부: ${translateData}, 원본 언어: ${sourceLang}, 대상 언어: ${targetLang}`);
            }
        } else {
            console.error('퐁! 유저 데이터를 찾을 수 없어요.');
        }
    } catch (error) {
        console.error('DynamoDB 조회 오류: ', error);
        console.error('데이터를 가져오는 도중 오류가 발생했어요. 오류 메시지: ' + error.message);
    }
});


client.login(token);