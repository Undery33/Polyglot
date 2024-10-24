const { SlashCommandBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
const { DynamoDBClient, GetItemCommand } = require('@aws-sdk/client-dynamodb');
const { TranslateClient, TranslateTextCommand } = require('@aws-sdk/client-translate');
const fs = require('fs');
const path = require('path');

// Load AWS configuration from config.json
let configPath;
if (fs.existsSync(path.resolve(__dirname, '../../config.json'))) {
    configPath = path.resolve(__dirname, '../../config.json');
} else if (fs.existsSync(path.resolve(__dirname, '../../../config.json'))) {
    configPath = path.resolve(__dirname, '../../../config.json');
} else {
    throw new Error('Configuration file not found in expected paths.');
}

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

module.exports = {
    data: new SlashCommandBuilder()
        .setName('유저정보')
        .setDescription('서버 테스트를 위한 명령어에요!'),
    async execute(interaction) {
        const userId = interaction.user.id;  // 요청한 유저의 ID 가져오기

        // DynamoDB에서 유저 데이터 가져오기
        const params = {
            TableName: 'PG_Users', // 테이블 이름을 명시적으로 설정
            Key: {
                userID: { S: userId }, // 키는 userID로 설정되어 있다고 가정
            },
        };

        try {
            const command = new GetItemCommand(params);
            const data = await dynamodbClient.send(command);

            if (data.Item) {
                const translateData = data.Item.irt_translate ? data.Item.irt_translate.BOOL : false;
                const translateMessage = translateData ? '번역 기능이 활성화되어 있습니다.' : '번역 기능이 비활성화되어 있습니다.';
                const setLang = data.Item.setLang ? data.Item.setLang.S : '설정된 언어가 없습니다.';

                if (translateData) {
                    // AWS Translate 요청 보내기
                    const targetLanguageCode = setLang !== '설정된 언어가 없습니다.' ? setLang.slice(0, 2).toLowerCase() : 'es';
                    const translateParams = {
                        Text: 'Text Translate test complect.',
                        SourceLanguageCode: 'en',
                        TargetLanguageCode: targetLanguageCode,
                    };

                    try {
                        const translateCommand = new TranslateTextCommand(translateParams);
                        const translateResult = await translateClient.send(translateCommand);
                        const translatedText = translateResult.TranslatedText;
                        await interaction.reply(`유저 ID: ${userId}, ${translateMessage}, 설정된 언어: ${setLang}, 번역 테스트: ${translatedText}`);
                    } catch (translateError) {
                        console.error('Translate 요청 오류: ', translateError);
                        await interaction.reply(`유저 ID: ${userId}, ${translateMessage}, 설정된 언어: ${setLang}, 번역 중 오류가 발생했어요. 오류 메시지: ${translateError.message}`);
                    }
                } else {
                    await interaction.reply(`유저 ID: ${userId}, ${translateMessage}, 설정된 언어: ${setLang}`);
                }
            } else {
                await interaction.reply(`유저 데이터를 찾을 수 없어요.`);
            }
        } catch (error) {
            console.error('DynamoDB 조회 오류: ', error);
            await interaction.reply('데이터를 가져오는 도중 오류가 발생했어요. 오류 메시지: ' + error.message);
        }
    },
};
