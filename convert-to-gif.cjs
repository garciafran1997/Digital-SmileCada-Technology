const ffmpeg = require('fluent-ffmpeg');
const pathToFfmpeg = require('ffmpeg-static');
const path = require('path');

ffmpeg.setFfmpegPath(pathToFfmpeg);

const inputPath = path.join(__dirname, 'public', 'Video_De_Dos_Imágenes.mp4');
const outputPath = path.join(__dirname, 'public', 'Video_De_Dos_Imágenes.gif');

console.log('Starting conversion...');

ffmpeg(inputPath)
    .outputOptions([
        '-vf', 'fps=10,scale=640:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse'
    ])
    .toFormat('gif')
    .on('end', () => {
        console.log('Conversion finished successfully');
        process.exit(0);
    })
    .on('error', (err) => {
        console.error('Error during conversion:', err);
        process.exit(1);
    })
    .save(outputPath);
