const { SlashCommandBuilder } = require('discord.js');
const { getVoiceConnection } = require('@discordjs/voice');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('leave_voice')
        .setDescription('봇이 음성 채널에서 나가도록 해요!'),
    async execute(interaction) {
        // 현재 길드에서 봇의 음성 연결 가져오기
        const connection = getVoiceConnection(interaction.guild.id);
        if (!connection) {
            await interaction.reply('봇이 현재 어떤 음성 채널에도 접속해 있지 않아요!');
            return;
        }

        // 음성 채널에서 나가기
        connection.destroy();
        await interaction.reply('음성 채널에서 나갔어요!');
    },
};
