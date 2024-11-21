const { PollyClient, SynthesizeSpeechCommand } = require('@aws-sdk/client-polly');
const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const path = require('node:path');
const { createAudioPlayer, createAudioResource, joinVoiceChannel, getVoiceConnection, AudioPlayerStatus } = require('@discordjs/voice');
const { v4: uuidv4 } = require('uuid');
const ffmpeg = require('ffmpeg-static'); // FFmpeg-static을 가져옵니다

const configPath = path.resolve(__dirname, '../../config.json');

// Config 파일 읽기
let try_config;
try {
    try_config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
} catch (err) {
    console.error('Config 파일을 읽는 도중 오류가 발생했습니다: ', err);
    process.exit(1);
}

const config = try_config;

const pollyClient = new PollyClient({
    region: config.region,
    credentials: {
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey,
    },
});

module.exports = {
    data: new SlashCommandBuilder()
        .setName('tts')
        .setDescription('TTS로 읽어드려요!')
        .addStringOption(option =>
            option.setName('text')
                .setDescription('읽어드릴 텍스트를 입력해주세요.')
                .setRequired(true)
        ),
    async execute(interaction) {
        // 입력된 텍스트 가져오기
        const text = interaction.options.getString('text');

        // AWS Polly를 사용해 TTS 생성
        const params = {
            OutputFormat: 'mp3',
            Text: text,
            VoiceId: 'Seoyeon', // 사용할 목소리 ID. 원하는 목소리로 변경 가능.
        };

        try {
            const command = new SynthesizeSpeechCommand(params);
            const data = await pollyClient.send(command);
            const audioStream = data.AudioStream;

            // tts 폴더가 존재하는지 확인하고, 없다면 생성
            const ttsFolderPath = path.resolve(__dirname, '../../tts');
            if (!fs.existsSync(ttsFolderPath)) {
                fs.mkdirSync(ttsFolderPath);
            }

            // 음성 파일을 tts 폴더에 저장 (고유한 파일 이름 사용)
            const filePath = path.resolve(ttsFolderPath, `tts-${uuidv4()}.mp3`);
            const writeStream = fs.createWriteStream(filePath);
            audioStream.pipe(writeStream);

            writeStream.on('finish', async () => {
                try {
                    // 사용자가 있는 음성 채널 확인
                    const voiceChannel = interaction.member.voice.channel;
                    if (!voiceChannel) {
                        await interaction.reply('먼저 음성 채널에 접속해주세요!');
                        return;
                    }

                    // 현재 연결된 음성 채널이 있는지 확인
                    let connection = getVoiceConnection(interaction.guild.id);
                    if (!connection) {
                        // 연결이 없다면, 사용자가 속한 음성 채널에 연결
                        connection = joinVoiceChannel({
                            channelId: voiceChannel.id,
                            guildId: interaction.guild.id,
                            adapterCreator: interaction.guild.voiceAdapterCreator,
                        });
                    }

                    // 오디오 플레이어 생성 및 재생
                    const player = createAudioPlayer();
                    const resource = createAudioResource(filePath);
                    player.play(resource);
                    connection.subscribe(player);

                    // 플레이어가 끝나면 파일 삭제 (연결은 유지)
                    player.on(AudioPlayerStatus.Idle, () => {
                        // 파일 삭제 (필요에 따라 이 줄을 주석 처리해서 파일 보관 가능)
                        fs.unlinkSync(filePath);
                    });

                    await interaction.reply('TTS를 실행했어요!');
                } catch (error) {
                    console.error('오류 발생: ', error);
                    await interaction.reply('음성을 재생하는 도중 오류가 발생했습니다. 다시 시도해주세요.');
                }
            });

            writeStream.on('error', async (error) => {
                console.error('파일 저장 도중 오류 발생: ', error);
                await interaction.reply('파일을 저장하는 도중 오류가 발생했습니다. 다시 시도해주세요.');
            });

        } catch (error) {
            console.error(error);
            await interaction.reply('음성을 생성하는 도중 오류가 발생했어요. 다시 시도해주세요.');
        }
    },
};
