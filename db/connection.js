const mysql = require("mysql2");
const util = require("util");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Helloworld1!",
    database: "tracker"
});

connection.connect();

connection.query = util.promisify(connection.query);

module.exports = connection;