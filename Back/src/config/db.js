// src/config/db.js

const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'instat',
}).promise();

module.exports = pool;

