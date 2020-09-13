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

// export connection
module.exports = connection;