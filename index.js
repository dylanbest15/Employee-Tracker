// requirements
const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

// connect to server
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "135513",
    database: "employee_tracker"
});

// start application
connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    start();
});