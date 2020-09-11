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

// starts application
function start() {
    inquirer.prompt([
        {
            type: "list",
            name: "start",
            message: "Choose an action-",
            choices: [
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
        if (answer.start === "add a new department") {
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

// adds department and restarts
function addDepartment() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Enter the department name."
        }
    ]).then(function (answer) {
        console.log("Adding new department...");
        connection.query("INSERT INTO department SET ?",
            { name: answer.name },
            function (err, res) {
                if (err) throw err;
                console.log("New department added successfully!");
                start();
            }
        )
    })
}

// adds role and restarts
function addRole() {
    connection.query("SELECT * FROM department", function (err, res) {
        inquirer.prompt([
            {
                type: "input",
                name: "title",
                message: "Enter the role title."
            },
            {
                type: "input",
                name: "salary",
                message: "Enter the role salary.",
                validate: function (value) {
                    if (isNaN(value)) {
                        return false;
                    }
                    return true;
                }
            },
            {
                type: "list",
                name: "department",
                message: "Choose the role department",
                choices: function () {
                    var departmentArray = [];
                    if (err) throw err;
                    res.forEach(element => {
                        departmentArray.push(element.name);
                    })
                    return departmentArray;
                }
            }
        ]).then(function (answer) {
            console.log("Adding new role...");
            var query = "INSERT INTO role SET title = ?, salary = ?,";
            query += "department_id = (SELECT id FROM department WHERE name = ?)";
            connection.query(query,
                [answer.title, answer.salary, answer.department],
                function (err, res) {
                    if (err) throw err;
                    console.log("New role added successfully!");
                    start();
                }
            )
        })
    })
}