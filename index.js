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
            message: "Enter the department's name-"
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
        if (err) throw err;
        inquirer.prompt([
            {
                type: "input",
                name: "title",
                message: "Enter the role's title-"
            },
            {
                type: "input",
                name: "salary",
                message: "Enter the role's salary-",
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
                message: "Choose the role's department-",
                choices: function () {
                    var departmentArray = [];
                    res.forEach(element => {
                        departmentArray.push(element.name);
                    })
                    return departmentArray;
                }
            }
        ]).then(function (answer) {
            console.log("Adding new role...");
            var query = "INSERT INTO role SET title = ?, salary = ?, ";
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

function addEmployee() {
    connection.query("SELECT * FROM role", function (roleErr, roleRes) {
        if (roleErr) throw roleErr;
        connection.query("SELECT * FROM employee", function (employeeErr, employeeRes) {
            if (employeeErr) throw employeeErr;
            inquirer.prompt([
                {
                    type: "input",
                    name: "firstName",
                    message: "Enter the employee's first name-"
                },
                {
                    type: "input",
                    name: "lastName",
                    message: "Enter the employee's last name-"
                },
                {
                    type: "list",
                    name: "role",
                    message: "Choose the employee's role-",
                    choices: function () {
                        var roleArray = [];
                        roleRes.forEach(element => {
                            roleArray.push(element.title);
                        })
                        return roleArray;
                    }
                },
                {
                    type: "list",
                    name: "manager",
                    message: "Choose the employee's manager-",
                    choices: function () {
                        var employeeArray = ["No Manager"];
                        employeeRes.forEach(element => {
                            employeeArray.push(`${element.first_name} ${element.last_name}`);
                        })
                        return employeeArray;
                    }
                }
            ]).then(function (answer) {
                console.log("Adding new employee...");
                var firstName = answer.manager.trim().split(" ")[0];
                var lastName = answer.manager.trim().split(" ")[1];
                var query = "INSERT INTO employee SET first_name = ?, last_name = ?, ";
                query += "role_id = (SELECT id FROM role WHERE title = ?, ";
                query += "manager_id = (SELECT id FROM employee WHERE ";
                query += "first_name = ? AND last_name = ?)";
                connection.query(query,
                    [answer.firstName, answer.lastName, answer.role, firstName, lastName],
                    function (err, res) {
                        if (err) throw err;
                        console.log("New employee added succesfully!");
                        start();
                    }
                )
            })
        })
    })
}