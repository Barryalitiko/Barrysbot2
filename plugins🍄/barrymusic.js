const ffmpeg = require('fluent-ffmpeg');
const path = require('path');

// Comando para convertir audio en música
function convertirAudioEnMusica(user, audioPath) {
    const outputPath = path.join(__dirname, 'musica', `musica_${user.id}.mp3`);
    
    ffmpeg(audioPath)
        .audioFilters('asetrate=44100*1.25', 'atempo=1.5', 'aphaser', 'chorus=0.6:0.9:50:0.4:0.25:2')
        .on('end', () => {
            const username = user.username || user.id; // Usa el nombre de usuario o el ID si no está disponible
            const responseMessage = `
♫ 𝙱𝚊𝚛𝚛𝚢 🍄 - @${username}
0:35 ━❍──────── -5:32
↻     ⊲  Ⅱ  ⊳     ↺
sᴏɴɪᴅᴏ: ▁▂▃▄▅▆▇ 100%`;

            sendMessage(user.id, responseMessage, outputPath); // Envía el mensaje con el archivo de música
        })
        .on('error', (err) => {
            console.error(`Error procesando el archivo de audio: ${err.message}`);
            sendMessage(user.id, "Hubo un error al convertir tu audio en música. Inténtalo de nuevo.");
        })
        .save(outputPath); // Guarda el archivo procesado en la ruta
}

// Función para enviar mensajes (simulación)
function sendMessage(userId, message, filePath = null) {
    console.log(`Enviando a ${userId}: ${message}`);
    if (filePath) {
        console.log(`Enviando archivo convertido: ${filePath}`);
    }
}

// Exportar las funciones para ser usadas en otros archivos
module.exports = { convertirAudioEnMusica };
