// Archivo: capturaPlugin.js

const { capturaCommand, onCaptureResponse } = require('../lib/captura');

// Manejar el comando ?captura
function handleCommand(command, user) {
    if (command === '?captura') {
        capturaCommand(user);
    }
    // Manejar la respuesta de captura
    else if (command.startsWith('?respuesta')) {
        onCaptureResponse(user);
    }
}

// Exportar la función de manejo de comandos
module.exports = {
    handleCommand
};
