const mysql = require('mysql2/promise');
const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	post: '3306',
	password: '123456',
    database: 'album'
});

module.exports = connection;

