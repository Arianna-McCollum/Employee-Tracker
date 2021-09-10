const mysql = require('mysql2');
const util = require("util");

const db = mysql.createConnection({
    host: 'localhost',
    // Your MySQL username,
    user: 'root',
    // Your MySQL password
    password: 'Helloworld1!',
    database: 'tracker'
  });

  db.connect();

  db.query = util.promisify(db.query);

  module.exports = db;