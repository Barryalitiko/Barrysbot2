// Archivo: barrystickers.js en la carpeta plugins

const sharp = require('sharp');
const { exec } = require('child_process');

async function createSticker(media, userId) {
    try {
        // Verifica si el archivo es una imagen o un video
        if (media.mimetype.includes('image')) {
            // Convierte la imagen en sticker
            await sharp(media.buffer)
                .resize(512, 512)
                .toFile(`./stickers/${userId}-sticker.webp`);
            return `𝙎𝙏𝙄𝘾𝙆𝙀𝙍 𝚌𝚛𝚎𝚊𝚍𝚘 𝚎𝚡𝚒𝚝𝚘𝚜𝚊𝚖𝚎𝚗𝚝𝚎 ᵇʸ ᵇᵃʳʳʸ 🍄`;
        } else if (media.mimetype.includes('video')) {
            // Convierte el video en sticker usando ffmpeg
            const outputPath = `./stickers/${userId}-sticker.webp`;
            exec(`ffmpeg -i ${media.path} -vf "scale=512:512:force_original_aspect_ratio=increase,crop=512:512" -loop 0 ${outputPath}`, (error, stdout, stderr) => {
                if (error) {
                    console.error(`Error al crear sticker: ${error.message}`);
                    return;
                }
            });
            return `𝙎𝙏𝙄𝘾𝙆𝙀𝙍 𝚌𝚛𝚎𝚊𝚍𝚘 𝚎𝚡𝚒𝚝𝚘𝚜𝚊𝚖𝚎𝚗𝚝𝚎 ᵇʸ ᵇᵃʳʳʸ 🍄`;
        }
    } catch (error) {
        console.error('Error en la creación del sticker:', error);
        return 'Ocurrió un error al crear el sticker.';
    }
}

// Comando para convertir en sticker
module.exports = {
    name: 'sticker',
    description: 'Convierte imágenes o videos en stickers.',
    execute: async (message, media) => {
        const userId = message.from;
        const response = await createSticker(media, userId);
        message.reply(response);
    }
};
