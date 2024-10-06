// Archivo: captura.js

const fs = require('fs');
const path = require('path');

// Variables globales
const imagesDir = path.join(__dirname, 'imagenes'); // Ruta donde están las imágenes
const images = [
    'IMG-20241006-WA000.jpg',
    'IMG-20241006-WA001.jpg',
    'IMG-20241006-WA002.jpg',
    'IMG-20241006-WA003.jpg',
    'IMG-20241006-WA004.jpg',
    'IMG-20241006-WA005.jpg',
    'IMG-20241006-WA006.jpg',
    'IMG-20241006-WA007.jpg'
];

let currentImage = null;
let imageTimer = null;

// Función para enviar una imagen aleatoria
function sendRandomImage(chatId) {
    const randomIndex = Math.floor(Math.random() * images.length);
    currentImage = images[randomIndex];

    // Envía la imagen al chat
    sendImage(chatId, path.join(imagesDir, currentImage));

    // Establece un temporizador de 3 minutos para eliminar la imagen si no hay respuesta
    imageTimer = setTimeout(() => {
        deleteImage(currentImage);
    }, 3 * 60 * 1000);
}

// Comando ?captura
function capturaCommand(user) {
    const userId = user.id;
    const chatId = user.chatId; // Asumiendo que tienes un ID de chat

    sendRandomImage(chatId);
}

// Función para reaccionar a la imagen
function onCaptureResponse(user) {
    const userId = user.id;

    // Aquí puedes manejar la lógica para otorgar coins
    const reward = getRandomReward();
    addCoins(userId, reward);

    // Reacciona a la imagen
    reactToImage(currentImage, '🍄');

    // Cancela el temporizador
    clearTimeout(imageTimer);
}

// Función para obtener una recompensa aleatoria
function getRandomReward() {
    const randomValue = Math.random();
    if (randomValue < 0.4) return 50;   // 40% probabilidad
    if (randomValue < 0.7) return 100;  // 30% probabilidad
    if (randomValue < 0.9) return 150;  // 20% probabilidad
    return 200;                          // 10% probabilidad
}

// Función para agregar coins al usuario
function addCoins(userId, amount) {
    // Aquí deberías implementar la lógica para agregar coins
    console.log(`Se han añadido ${amount} coins a ${userId}`);
}

// Función para enviar la imagen
function sendImage(chatId, imagePath) {
    // Lógica para enviar la imagen
    console.log(`Enviando imagen a ${chatId}: ${imagePath}`);
}

// Función para reaccionar a la imagen
function reactToImage(image, reaction) {
    // Lógica para reaccionar a la imagen
    console.log(`Reaccionando a la imagen ${image} con ${reaction}`);
}

// Función para eliminar la imagen
function deleteImage(image) {
    // Lógica para eliminar la imagen
    console.log(`Eliminando la imagen ${image}`);
}

module.exports = {
    capturaCommand,
    onCaptureResponse
};
