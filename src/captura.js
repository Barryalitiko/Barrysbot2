// Archivo: captura.js

// Comando para manejar la captura de imágenes
function capturaCommand(user) {
    // Lógica para manejar la captura y otorgar coins
    const coinsWon = getRandomCoins();
    const userId = user.id;
    sendMessage(userId, `¡Has capturado! Ganaste ${coinsWon} *🍄ᗾ*`);
}

// Función para obtener coins aleatorios
function getRandomCoins() {
    const rand = Math.random();
    if (rand < 0.4) return 50;
    if (rand < 0.7) return 100;
    if (rand < 0.9) return 150;
    return 200;
}

// Función para enviar mensajes (simulación)
function sendMessage(userId, message) {
    console.log(`Enviando a ${userId}: ${message}`);
}
