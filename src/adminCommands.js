// Archivo: adminCommands.js

// Comando para ver comandos de administrador
function adminCommands(user) {
    const userId = user.id;
    const responseMessage = `
𝗖𝗼𝗺𝗮𝗻𝗱𝗼𝘀 𝗱𝗲 𝗔𝗱𝗺𝗶𝗻:
- Comando 1: Descripción
- Comando 2: Descripción
`;
    sendMessage(userId, responseMessage);
}

// Función para enviar mensajes (simulación)
function sendMessage(userId, message) {
    console.log(`Enviando a ${userId}: ${message}`);
}
