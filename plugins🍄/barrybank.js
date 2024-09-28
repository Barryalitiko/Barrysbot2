// Archivo: barrybank.js

// Variables globales
let bankData = {}; // Para almacenar los datos del banco
let userIds = {}; // Para controlar el registro único por ID

// Inicializa los datos del banco
function initializeBank() {
    // Cargar datos desde un archivo o base de datos si es necesario
}

// Comando para ver el banco de coins
function bancoCommand(user) {
    const userId = user.id;
    const phoneNumber = user.phone; // Asumiendo que tienes el número de teléfono
    const saldo = bankData[userId] ? bankData[userId].saldo : 0;
    const ganancias = bankData[userId] ? bankData[userId].ganancias : 0;
    const perdidas = bankData[userId] ? bankData[userId].perdidas : 0;

    const responseMessage = `
𝘽𝙖𝙧𝙧𝙮'𝙨 𝘽𝙖𝙣𝙠
════════════════
✓ *𝚄𝚜𝚞𝚊𝚛𝚒𝚘*: ${phoneNumber}
✓ *𝚂𝚊𝚕𝚍𝚘*: ${saldo} *🍄ᗾ*
════════════════
ᵉˡ ᵇᵃⁿᶜᵒ ⁿᵒ ˢᵉ ʰᵃᶜᵉ ʳᵉˢᵖᵒⁿˢᵃᵇˡᵉ ᵈᵉ ᵖᵉ́ʳᵈⁱᵈᵃˢ ᵒ ʳᵒᵇᵒˢ
════════════════
✓ *𝙶𝚊𝚗𝚊𝚗𝚌𝚒𝚊𝚜*: ${ganancias}
✓ *𝙿𝚎𝚛𝚍𝚒𝚍𝚊𝚜*: ${perdidas}
════════════════
𝗖𝗼𝗺𝗮𝗻𝗱𝗼𝘀 𝗘𝘀𝗽𝗲𝗰𝗶𝗮𝗹𝗲𝘀
-👮🏾‍♂️ *?leonel*: este comando te permite robar las ganancias que otro usuario no haya guardado en el banco (máximo 2 veces al día)
-🏦 *?ahorro*: este comando te permite guardar tus *🍄ᗾ* en el banco para evitar que otro usuario te las robe
-🎁 *?regalo*: este comando te permite regalar coins a algún usuario
-💪🏾 *?reto*: usa el comando para retar a alguien 
════════════════`;

    // Aquí envías el mensaje al usuario
    sendMessage(userId, responseMessage);
}

// Comando para ahorrar coins
function ahorroCommand(user, amount) {
    const userId = user.id;

    if (!bankData[userId]) {
        bankData[userId] = { saldo: 0, ganancias: 0, perdidas: 0 };
    }

    if (bankData[userId].saldo >= amount) {
        bankData[userId].saldo -= amount; // Resta la cantidad ahorrada
        sendMessage(userId, `Has ahorrado ${amount} *🍄ᗾ* en el banco. ¡Buen trabajo!`);
    } else {
        sendMessage(userId, `No tienes suficientes *🍄ᗾ* para ahorrar.`);
    }
}

// Comando para robar coins
function leonelCommand(user, targetUserId) {
    const userId = user.id;

    if (!bankData[targetUserId]) {
        sendMessage(userId, "El usuario no tiene un banco creado.");
        return;
    }

    const amountToSteal = Math.min(bankData[targetUserId].saldo * 0.5, 2); // Limita al 50%
    if (amountToSteal > 0) {
        bankData[targetUserId].saldo -= amountToSteal; // Resta de la cuenta del objetivo
        bankData[userId] = bankData[userId] || { saldo: 0, ganancias: 0, perdidas: 0 };
        bankData[userId].saldo += amountToSteal; // Añade a la cuenta del ladrón
        sendMessage(userId, `¡Felicidades! Has robado ${amountToSteal} *🍄ᗾ* de ${targetUserId}.`);
    } else {
        sendMessage(userId, `El usuario no tiene *🍄ᗾ* disponibles para robar.`);
    }
}

// Comando para regalar coins
function regaloCommand(user, targetUserId, amount) {
    const userId = user.id;

    if (bankData[userId].saldo >= amount) {
        bankData[userId].saldo -= amount; // Resta de la cuenta del donador
        bankData[targetUserId] = bankData[targetUserId] || { saldo: 0, ganancias: 0, perdidas: 0 };
        bankData[targetUserId].saldo += amount * 0.95; // Añade al destinatario
        sendMessage(userId, `Has regalado ${amount} *🍄ᗾ* a ${targetUserId}. El banco retuvo un 5%.`);
    } else {
        sendMessage(userId, `No tienes suficientes *🍄ᗾ* para regalar.`);
    }
}

// Comando para retar
function retoCommand(user, targetUserId, amount) {
    const userId = user.id;

    if (bankData[userId].saldo >= amount && bankData[targetUserId].saldo >= amount) {
        sendMessage(targetUserId, `Hola ${targetUserId}, ${userId} te acaba de retar. Responde con *sí🍄* para aceptar el reto. La apuesta es de ${amount} *🍄ᗾ*`);
        // Lógica de tiempo y resultado aquí
    } else {
        sendMessage(userId, `Ambos deben tener suficiente *🍄ᗾ* para realizar un reto.`);
    }
}

// Función para enviar mensajes (simulación)
function sendMessage(userId, message) {
    console.log(`Enviando a ${userId}: ${message}`);
}

// Llamadas de prueba (descomentar para usar)
initializeBank();
// bancoCommand({ id: 'user1', phone: '123456789' });
