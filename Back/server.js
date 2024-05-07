// server.js
const express = require('express');
const db = require('./config/db');

const app = express();

// ...

// Code pour démarrer le serveur

// Fermer la connexion à la base de données lors de l'arrêt du serveur
process.on('SIGINT', () => {
    db.end((err) => {
        if (err) {
            console.error('Error closing database connection: ', err.message);
        } else {
            console.log('Database connection closed.');
            process.exit();
        }
    });
});
