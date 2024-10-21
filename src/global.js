// Archivo: global.js

// Función para enviar publicaciones del canal con ?global
function globalCommand(message) {
    // Lógica para manejar el comando y enviar al grupo
    const responseMessage = message; // Solo reenvía el mensaje
    sendToGroup(responseMessage);
}

// Función para enviar mensajes al grupo
function sendToGroup(message) {
    console.log(`Enviando al grupo: ${message}`);
}
