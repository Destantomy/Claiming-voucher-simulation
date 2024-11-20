const mysql = require('mysql2');

// configure connection
const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DB,
});

// connection check
connection.connect((error) => {
    if (error) {
        console.error('connection fail: ', error.message);
    } else {
        console.log('db connected!');
    }
})

module.exports = connection;
