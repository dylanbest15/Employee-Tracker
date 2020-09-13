// requirements
const mysql = require("mysql");

// connect to server
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "135513",
  database: "employee_tracker"
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
});

// export connection
module.exports = connection;