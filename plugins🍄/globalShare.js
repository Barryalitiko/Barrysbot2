// Archivo: globalShare.js

let sentMessageIds = new Set(); // Conjunto para almacenar IDs de mensajes enviados
const CHANNEL_LINK = "https://whatsapp.com/channel/0029Vap2vVA3QxRxY4ZuD00k"; // Enlace del canal

// Función que revisa el canal cada hora
function startChannelCheck() {
    setInterval(checkChannelForGlobal, 3600000); // Cada hora
}

// Función principal que revisa el canal
async function checkChannelForGlobal() {
    const newMessages = await getMessagesFromChannel(); // Obtiene mensajes del canal

    newMessages.forEach(message => {
        if (!sentMessageIds.has(message.id) && message.content.includes("?global")) {
            shareInGroups(message.content); // Comparte solo el contenido
            sentMessageIds.add(message.id); // Agrega el ID del mensaje a los enviados
        }
    });
}

// Función para obtener mensajes del canal (simulación)
async function getMessagesFromChannel() {
    // Simulación de mensajes recibidos. Aquí deberías implementar tu lógica para obtener mensajes reales.
    return [
        { id: "msg1", content: "¡Mira esta publicación! ?global" },
        { id: "msg2", content: "Este es otro mensaje sin comando." },
        { id: "msg3", content: "No te olvides de ver el contenido global. ?global" },
    ];
}

// Función para compartir el mensaje en los grupos donde el bot es admin
async function shareInGroups(content) {
    const groups = await getGroupsWhereBotIsAdmin(); // Obtiene grupos donde el bot es admin
    groups.forEach(group => {
        sendMessage(group.id, content); // Envía el contenido al grupo
    });
}

// Función para obtener los grupos donde el bot es administrador
async function getGroupsWhereBotIsAdmin() {
    // Aquí debes implementar la lógica para obtener los grupos donde el bot es admin
    return [
        { id: "group1", name: "Grupo 1" },
        { id: "group2", name: "Grupo 2" }
    ];
}

// Inicia el chequeo del canal
startChannelCheck();
