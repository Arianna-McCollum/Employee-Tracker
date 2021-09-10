const mysql = require('mysql2');
require('dotenv').config();


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Helloworld1!',
    database: 'tracker'
  });

  module.exports = connection;