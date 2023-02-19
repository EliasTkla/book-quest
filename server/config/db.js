const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'vertigo-531',
    database: 'bookquest'
});

module.exports = db;