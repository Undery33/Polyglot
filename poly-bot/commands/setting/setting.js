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
    .setName('tc_setting')
    .setDescription('채팅을 한정된 공간에서만 사용하세요!')
    .addStringOption(option =>
        option.setName('chatting_space')
            .setDescription('이 외의 공간에서는 채팅이 불가합니다.')
            .setRequired(true))

module.exports = {
    data,
    async execute(interaction) {

        // Update user language preferences in DynamoDB using AWS SDK v3
        const params = {
            TableName: 'PG_server',
            Key: {
                userID: { S: interaction.user.id },
            },
            UpdateExpression: 'SET chattingID = :chatId',
            ExpressionAttributeValues: {
                ':chatId': { S: sourceLanguage }
            },
        };

        try {
            await dynamodbClient.send(new UpdateItemCommand(params));
        } catch (error) {
            console.error('Error updating language preference:', error);
            await interaction.reply('There was an error updating your language preference. Please try again later.');
        }
    },
};
