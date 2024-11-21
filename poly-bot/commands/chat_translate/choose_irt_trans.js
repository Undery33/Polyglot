/*
    해당 파일의 목적은 <실시간 번역 스위치> 입니다.
    /in_real_time_translate 커멘드를 입력할 시, 실시간 번역 활동에 대해 선택 버튼이 나오고
    yes 누를 시 채팅할 때마다 번역을 수행해줍니다.
    no를 누를 시에는 번역 수행을 그만둡니다.
*/

const { SlashCommandBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
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

// config.json과 AWS DynamoDB 내 설정된 data를 호출 및 저장
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
const dynamodbClient = new DynamoDBClient({
    region: config.region,
    credentials: {
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey,
    },
});

module.exports = {
    // 커멘드 설정
    data: new SlashCommandBuilder()
        .setName('irt_translate')
        .setDescription('Do you want to use real-time translation?'),
    async execute(interaction) {
        const irtTranYes = new ButtonBuilder()  // 예
            .setCustomId('irt_yes')
            .setLabel('YES')
            .setStyle(ButtonStyle.Success);

        const irtTranNo = new ButtonBuilder()   // 아니오
            .setCustomId('irt_no')
            .setLabel('NO')
            .setStyle(ButtonStyle.Danger);

        const row = new ActionRowBuilder()  // 버튼
            .addComponents(irtTranYes, irtTranNo);

        await interaction.reply({   // 채팅으로 확인
            content: 'Do you want to use real-time translation?',
            components: [row],
        });

        const filter = (i) => (i.customId === 'irt_yes' || i.customId === 'irt_no') && i.user.id === interaction.user.id;
        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });

        collector.on('collect', async (i) => {  // 번역 시작 및 중지 채팅
            let chooseIrtTrans;
            if (i.customId === 'irt_yes') {
                chooseIrtTrans = true;
                await i.update({ content: 'Lets start the real-time translation!', components: [] });
            } else if (i.customId === 'irt_no') {
                chooseIrtTrans = false;
                await i.update({ content: 'Ill stop the real-time translation..', components: [] });
            }

            // AWS SDK v3 설정
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
