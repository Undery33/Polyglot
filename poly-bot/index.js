const fs = require('node:fs');
const path = require('node:path');
const { Client, 
    GatewayIntentBits, 
    Events,
    VoiceConnectionStatus, 
    joinVoiceChannel, 
    createAudioPlayer, 
    NoSubscriberBehavior, 
    createAudioResource, 
    AudioPlayerStatus, 
    Collection } = require('discord.js');
const { DynamoDBClient, GetItemCommand } = require('@aws-sdk/client-dynamodb');
const { TranslateClient, TranslateTextCommand } = require('@aws-sdk/client-translate');
const { TranscribeClient, StartTranscriptionJobCommand } = require('@aws-sdk/client-transcribe');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { token } = require('./config.json');
const configPath = path.resolve(__dirname, './config.json');
const { pipeline } = require('stream');
const prism = require('prism-media');
const VAD = require('node-vad');

let try_config;
try {
    try_config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
} catch (err) {
    console.error('Config 파일을 읽는 도중 오류가 발생했습니다: ', err);
    process.exit(1);
}

const client = new Client({ intents: [
    GatewayIntentBits.Guilds, 
    GatewayIntentBits.GuildVoiceStates, 
    GatewayIntentBits.GuildMessages, 
    GatewayIntentBits.MessageContent] });

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

const transcribeClient = new TranscribeClient({
    region: config.region,
    credentials: {
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey,
    },
});

const s3Client = new S3Client({
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

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand() || interaction.commandName !== 'join') return;
  
    const channel = interaction.member.voice.channel;
    if (!channel) {
        await interaction.reply('음성 채널에 접속한 상태여야 합니다.');
        return;
    }
  
    // 봇이 음소거 상태인지 확인하고 해제
    const botMember = channel.guild.me;
    if (botMember.voice.selfMute) {
        botMember.voice.setMute(false);
        console.log('봇의 음소거 상태를 해제했습니다.');
    }
  
    await interaction.reply('음성 채널에 접속했습니다. 3초간 말이 없으면 음성을 저장합니다.');
  
    const audioStream = receiver.subscribe(interaction.member.id, {
        end: {
            behavior: 'manual',
        },
    });
  
    const opusStream = new prism.opus.Decoder({
        rate: 16000,  // 샘플 레이트를 16kHz로 변경
        channels: 1,
        frameSize: 960,
    });
  
    const filePath = path.join(__dirname, `audio-${Date.now()}.pcm`);
    const writeStream = fs.createWriteStream(filePath);
  
    // VAD 사용 설정 (모드를 VERY_AGGRESSIVE에서 AGGRESSIVE로 변경)
    const vad = VAD.createVAD(VAD.Mode.AGGRESSIVE);
    let silenceStartTime = null;
    let silenceTimeout = null;
  
    opusStream.on('data', async (chunk) => {
        const res = await vad.processAudio(chunk, 16000);  // 샘플 레이트 일치
        if (res === VAD.Event.SILENCE) {
            if (silenceStartTime === null) {
                silenceStartTime = Date.now();
            }

            // 3초간 침묵이 지속되면 파일 저장
            if (Date.now() - silenceStartTime >= 3000) {
                if (silenceTimeout === null) {
                    silenceTimeout = setTimeout(() => {
                        console.log('3초간 침묵이 감지됨. 파일을 저장합니다.');
                        writeStream.end(); // 파일 저장 스트림 종료
                    }, 3000);
                }
            }
        } else {
            if (silenceStartTime === null) {
                console.log('유저의 음성이 감지되었습니다. 녹음을 시작합니다.');
            }
            silenceStartTime = null;
            if (silenceTimeout) {
                clearTimeout(silenceTimeout);
                silenceTimeout = null;
            }
            writeStream.write(chunk);
        }
    });
  
    writeStream.on('finish', () => {
        console.log('파일이 성공적으로 저장되었습니다.');
  
        // S3에 파일 업로드
        const uploadParams = {
            Bucket: 'pg-discord-voice',
            Key: `read-users-voice/audio-${Date.now()}.pcm`,
            Body: fs.createReadStream(filePath),
        };
  
        s3Client.send(new PutObjectCommand(uploadParams)).then((data) => {
            console.log('파일이 S3에 성공적으로 업로드되었습니다.');
        }).catch((err) => {
            console.error('S3 업로드 에러:', err);
        });
    });

    // 스트림에서 오류가 발생했을 때 처리
    audioStream.on('error', (err) => {
        console.error('오디오 스트림 에러:', err);
    });

    opusStream.on('error', (err) => {
        console.error('Opus 스트림 에러:', err);
    });

    writeStream.on('error', (err) => {
        console.error('파일 쓰기 스트림 에러:', err);
    });

    // 음성 채널에 있는지 확인하는 코드
    setInterval(() => {
        if (!interaction.member.voice.channel) {
            console.log('유저가 음성 채널에서 나갔습니다.');
            audioStream.destroy();
            writeStream.end();
        }
    }, 5000);
});

client.login(token);
