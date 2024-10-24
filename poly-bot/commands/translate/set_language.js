const { SlashCommandBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
const { DynamoDBClient, PutItemCommand } = require('@aws-sdk/client-dynamodb');
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
        .setName('set_language')
        .setDescription('First, Set your main language'),
    async execute(interaction) {
        const setLangEn = new ButtonBuilder()
            .setCustomId('setLang_en')
            .setLabel('English')
            .setStyle(ButtonStyle.Success);

        const setLangKr = new ButtonBuilder()
            .setCustomId('setLang_kr')
            .setLabel('한국어')
            .setStyle(ButtonStyle.Success);

        const setLangJp = new ButtonBuilder()
            .setCustomId('setLang_jp')
            .setLabel('日本語')
            .setStyle(ButtonStyle.Success);

        const row = new ActionRowBuilder()
            .addComponents(setLangEn, setLangKr, setLangJp);

        await interaction.reply({
            content: 'Choose your language',
            components: [row],
        });

        const filter = (i) => i.customId === 'setLang_en' || i.customId === 'setLang_kr' || i.customId === 'setLang_jp';
        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });

        collector.on('collect', async (i) => {
            let selectedLanguage;
            if (i.customId === 'setLang_en') {
                selectedLanguage = 'English';
                await i.update({ content: 'You have selected English!', components: [] });
            } else if (i.customId === 'setLang_kr') {
                selectedLanguage = 'Korean';
                await i.update({ content: '한국어로 설정되었어요!', components: [] });
            } else if (i.customId === 'setLang_jp') {
                selectedLanguage = 'Japanese';
                await i.update({ content: '日本語に設定されました!', components: [] });
            }

            // Store user selection in DynamoDB using AWS SDK v3
            const params = {
                TableName: 'PG_Users',
                Item: {
                    userID: { S: i.user.id },
                    setLang: { S: selectedLanguage },
                },
            };

            try {
                await dynamodbClient.send(new PutItemCommand(params));
                console.log(`Language preference for user ${i.user.id} saved successfully.`);
            } catch (error) {
                console.error('Error saving language preference:', error);
            }
        });
    },
};
