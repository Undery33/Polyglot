const { SlashCommandBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
const { DynamoDBClient, UpdateItemCommand } = require('@aws-sdk/client-dynamodb');
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

module.exports = {
    data: new SlashCommandBuilder()
        .setName('in_real_time_translate')
        .setDescription('실시간 번역을 사용하시겠습니까?'),
    async execute(interaction) {
        const irtTranYes = new ButtonBuilder()
            .setCustomId('irt_yes')
            .setLabel('YES')
            .setStyle(ButtonStyle.Success);

        const irtTranNo = new ButtonBuilder()
            .setCustomId('irt_no')
            .setLabel('NO')
            .setStyle(ButtonStyle.Danger);

        const row = new ActionRowBuilder()
            .addComponents(irtTranYes, irtTranNo);

        await interaction.reply({
            content: '실시간 번역을 활성화 하시겠습니까?',
            components: [row],
        });

        const filter = (i) => (i.customId === 'irt_yes' || i.customId === 'irt_no') && i.user.id === interaction.user.id;
        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });

        collector.on('collect', async (i) => {
            let chooseIrtTrans;
            if (i.customId === 'irt_yes') {
                chooseIrtTrans = true;
                await i.update({ content: '실시간 번역을 시작할게요!', components: [] });
            } else if (i.customId === 'irt_no') {
                chooseIrtTrans = false;
                await i.update({ content: '실시간 번역을 중지할게요..', components: [] });
            }

            // Update user language preferences in DynamoDB using AWS SDK v3
            const params = {
                TableName: 'PG_Users',
                Key: {
                    userID: { S: interaction.user.id },
                },
                UpdateExpression: 'SET irt_translate = :irt_trans',
                ExpressionAttributeValues: {
                    ':irt_trans': { BOOL: chooseIrtTrans },
                },
            };

            try {
                await dynamodbClient.send(new UpdateItemCommand(params));
                console.log(`${i.user.id} choose Translate mode: ${chooseIrtTrans}`);
            } catch (error) {
                console.error('Error saving Translate Mode:', error);
            }
        });

        collector.on('end', async (collected) => {
            if (collected.size === 0) {
                try {
                    await interaction.editReply({ content: '시간이 초과되었습니다. 실시간 번역 설정이 취소되었습니다.', components: [] });
                } catch (error) {
                    console.error('Error editing reply after timeout:', error);
                }
            }
        });
    },
};
