const { SlashCommandBuilder } = require('discord.js');
const { DynamoDBClient, UpdateItemCommand, PutItemCommand, GetItemCommand } = require('@aws-sdk/client-dynamodb');
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
    .setDescription('Use chat only in a limited space!')
    .addStringOption(option =>
        option.setName('chatting_space')
            .setDescription('Chatting is not possible in other spaces.')
            .setRequired(true))

module.exports = {
    data,
    async execute(interaction) {
        const chattingSpace = interaction.options.getString('chatting_space');
        const serverId = interaction.guild.id;
        const chattingChannelId = chattingSpace.replace(/<#(\d+)>/, '$1');  // Extract channel ID from mention format

        try {
            // Check if the server ID already exists in the database
            const getParams = {
                TableName: 'PG_server',
                Key: {
                    serverID: { S: serverId },
                },
            };
            const data = await dynamodbClient.send(new GetItemCommand(getParams));

            // If server ID doesn't exist, add it
            if (!data.Item) {
                const serverParams = {
                    TableName: 'PG_server',
                    Item: {
                        serverID: { S: serverId },
                    },
                };
                await dynamodbClient.send(new PutItemCommand(serverParams));
            }

            // Update user chatting space preferences in DynamoDB using AWS SDK v3
            const updateParams = {
                TableName: 'PG_server',
                Key: {
                    serverID: { S: serverId },
                },
                UpdateExpression: 'SET chattingID = :chatId',
                ExpressionAttributeValues: {
                    ':chatId': { S: chattingChannelId },
                },
            };

            await dynamodbClient.send(new UpdateItemCommand(updateParams));
            await interaction.reply(`채팅 공간이 성공적으로 설정되었습니다: <#${chattingChannelId}>`);
        } catch (error) {
            console.error('Error updating chatting space preference:', error);
            await interaction.reply('채팅 공간 설정 중 오류가 발생했습니다. 나중에 다시 시도해주세요.');
        }
    },
};
