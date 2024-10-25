/*
    해당 파일은 번역할 언어를 세팅하는 파일입니다.
    
    말할 언어와 번역할 언어를 세팅하여 번역해주도록 하였습니다.

    현재까지는 한국어, 영어, 일본어만 가능케 하였습니다.
*/

const { SlashCommandBuilder } = require('discord.js');
const { DynamoDBClient, UpdateItemCommand } = require('@aws-sdk/client-dynamodb');
const fs = require('fs');
const path = require('path');

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

const data = new SlashCommandBuilder()
    .setName('set_language_preference')
    .setDescription('Set your language preference for translations!')
    .addStringOption(option =>
        option.setName('source_language')
            .setDescription('The language of the input text (e.g., English, Korean)')
            .setRequired(true))
    .addStringOption(option =>
        option.setName('target_language')
            .setDescription('The language you want to translate to (e.g., English, Korean)')
            .setRequired(true));

module.exports = {
    data,
    async execute(interaction) {
        const sourceLanguage = interaction.options.getString('source_language');
        const targetLanguage = interaction.options.getString('target_language');

        // Validate language inputs
        const validLanguages = ['English', 'Korean', 'Japanese'];
        if (!validLanguages.includes(sourceLanguage) || !validLanguages.includes(targetLanguage)) {
            await interaction.reply('Invalid language input. Please specify either "English" or "Korean" for both source and target languages.');
            return;
        }

        // Update user language preferences in DynamoDB using AWS SDK v3
        const params = {
            TableName: 'PG_Users',
            Key: {
                userID: { S: interaction.user.id },
            },
            UpdateExpression: 'SET sourceLanguage = :sourceLang, targetLanguage = :targetLang',
            ExpressionAttributeValues: {
                ':sourceLang': { S: sourceLanguage },
                ':targetLang': { S: targetLanguage },
            },
        };

        try {
            await dynamodbClient.send(new UpdateItemCommand(params));
            console.log(`Language preference for user ${interaction.user.id} updated successfully.`);
            await interaction.reply(`번역 세팅이 업데이트 되었어요! 
${sourceLanguage} 에서 ${targetLanguage} 로 번역해드릴게요!`);
        } catch (error) {
            console.error('Error updating language preference:', error);
            await interaction.reply('There was an error updating your language preference. Please try again later.');
        }
    },
};
