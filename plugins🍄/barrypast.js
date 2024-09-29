// Archivo: barrypast.js (en plugins)

// Requiere la función getLastDeletedMessages desde la librería
const { getLastDeletedMessages } = require('../lib/barrypastlib');

// Función para ver los últimos 10 mensajes borrados en el grupo
function pasadoCommand(adminUser) {
    // Verifica si el usuario es administrador
    if (!adminUser.isAdmin) {
        sendMessage(adminUser.id, "Este comando solo está disponible para administradores.");
        return;
    }

    // Obtiene los últimos 10 mensajes borrados
    const deletedMessages = getLastDeletedMessages(10); 

    let responseMessage = "🍄⌛ʙᴀʀʀʏ ᴠɪᴀᴊᴏ́ ᴀʟ ᴘᴀsᴀᴅᴏ ⌛🍄\n════════════════\n";
    
    deletedMessages.forEach(msg => {
        const hora = `Hora: ${msg.timeSent} / Borrado: ${msg.timeDeleted}`;
        const usuario = `Usuario: ${msg.deletedBy} ${msg.isAdmin ? '(ADMIN)' : ''}`;
        const mensaje = `Mensaje: ${msg.content}`;
        
        responseMessage += `${hora}\n${usuario}\n${mensaje}\n════════════════\n`;
    });

    // Envía el reporte al admin
    sendMessage(adminUser.id, responseMessage);
}

// Función para enviar mensajes (simulación)
function sendMessage(userId, message) {
    console.log(`Enviando a ${userId}: ${message}`);
}

// Exporta la función del comando para que pueda ser llamada
module.exports = { pasadoCommand };
