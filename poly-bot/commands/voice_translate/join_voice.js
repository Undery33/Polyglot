const { SlashCommandBuilder } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('join_voice')
        .setDescription('봇이 음성 채널에 접속하도록 해요!'),
    async execute(interaction) {
        // 사용자가 음성 채널에 있는지 확인
        const voiceChannel = interaction.member.voice.channel;
        if (!voiceChannel) {
            await interaction.reply('먼저 음성 채널에 접속해주세요!');
            return;
        }

        // 음성 채널에 접속
        const connection = joinVoiceChannel({
            channelId: voiceChannel.id,
            guildId: interaction.guild.id,
            adapterCreator: interaction.guild.voiceAdapterCreator,
            selfMute: false,  // 음소거 해제 설정
            selfDeaf: false,  // 청각 차단 해제 설정
        });

        await interaction.reply('음성 채널에 접속했어요!');
    },
};
