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

function start() {
    inquirer.prompt([
        {
            type: "list",
            name: "start",
            message: "Pick an action-",
            chopices: [
                "add a new department",
                "add a new role",
                "add a new employee",
                "view all departments",
                "view all roles",
                "view all employees",
                "update employee roles"
            ]
        }
    ]).then(function (answer) {
        if(answer.start === "add a new department") {
            addDepartment();
        } else if (answer.start === "add a new role") {
            addRole();
        } else if (answer.start === "add a new employee") {
            addEmployee();
        } else if (answer.start === "view all departments") {
            viewDepartments();
        } else if (answer.start === "view all roles") {
            viewRoles();
        } else if (answer.start === "view all employees") {
            viewEmployees();
        } else {
            updateEmployeeRoles();
        }
    })
}