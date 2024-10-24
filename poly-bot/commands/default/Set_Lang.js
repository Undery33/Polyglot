const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('set-lang')
        .setDescription('사용자의 언어를 설정하는 명령어'),
    async execute(interaction){
        await interaction.reply('사용자의 언어를 `설정한 언어`로 설정했어요!');
    },
};
