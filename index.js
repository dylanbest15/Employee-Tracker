// requirements
const orm = require("./config/orm.js");
const connection = require("./config/connection.js");
const inquirer = require("inquirer");
const cTable = require("console.table");

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
                "update employee roles",
                "exit employee tracker"
            ]
        }
    ]).then(function ({ start } = answer) {
        switch (start) {
            case "add a new department":
                addDepartment();
                break;
            case "add a new role":
                addRole();
                break;
            case "add a new employee":
                addEmployee();
                break;
            case "view all departments":
                viewDepartments();
                break;
            case "view all roles":
                viewRoles();
                break;
            case "view all employees":
                viewEmployees();
                break;
            case "update employee roles":
                updateRoles();
                break;
            default: connection.end();
        }
    })
}

// adds new department
function addDepartment() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Enter the department's name-"
        }
    ]).then(function ({ name } = answer) {
        return orm.insertIntoDepartment(name);
    }).then(function (res) {
        if (res.affectedRows === 1) console.log("Success!");
        start();
    })
}

// adds new role w/ department foreign key
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
                choices: () => res.map(element => element.name)
            }
        ]).then(function ({ title, salary, department } = answer) {
            return orm.insertIntoRole(title, salary, department);
        }).then(function (res) {
            if (res.affectedRows === 1) console.log("Success!");
            start();
        })
    })
}

// adds new employee w/ role and manager foreign key
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
                    choices: () => roleRes.map(element => element.title)
                },
                {
                    type: "list",
                    name: "manager",
                    message: "Choose the employee's manager-",
                    choices: function () {
                        const employeeArray = ["No Manager"];
                        employeeRes.forEach(element => {
                            employeeArray.push(`${element.first_name} ${element.last_name}`);
                        })
                        return employeeArray;
                    } 
                }
            ]).then(function ({ firstName, lastName, role, manager } = answer) {
                return orm.insertIntoEmployee(firstName, lastName, role, manager);
            }).then(function (res) {
                if (res.affectedRows === 1) console.log("Success!");
                start();
            })
        })
    })
}

// allows user to select department to view employees
function viewDepartments() {
    connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;
        inquirer.prompt([
            {
                type: "list",
                name: "department",
                message: "Pick a department-",
                choices: () => res.map(element => element.name)
            }
        ]).then(function ({ department } = answer) {
            return orm.viewEmployeesWhere("d.name", department);
        }).then(function (res) {
            console.table("\n", res);
            start();
        })
    })
}

// allows user to select role to view employees
function viewRoles() {
    connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw err;
        inquirer.prompt([
            {
                type: "list",
                name: "role",
                message: "Pick a role-",
                choices: () => res.map(element => element.title)
            }
        ]).then(function ({ role } = answer) {
            return orm.viewEmployeesWhere("r.title", role);
        }).then(function (res) {
            console.table("\n", res);
            start();
        })
    })
}

// views all employees
function viewEmployees() {
    return orm.viewEmployees().then(function (res) {
        console.table("\n", res);
        start();
    })
}

// allows user to select employee to update role
function updateRoles() {
    connection.query("SELECT * FROM employee", function (employeeErr, employeeRes) {
        if (employeeErr) throw employeeRrr;
        connection.query("SELECT * FROM role", function (roleErr, roleRes) {
            if (roleErr) throw roleErr;
            inquirer.prompt([
                {
                    type: "list",
                    name: "employee",
                    message: "Choose an employee-",
                    choices: () => employeeRes.map(element => `${element.first_name} ${element.last_name}`)
                },
                {
                    type: "list",
                    name: "role",
                    message: "Choose a role-",
                    choices: () => roleRes.map(element => element.title)
                }
            ]).then(function ({ employee, role } = answer) {
                return orm.updateEmployeeRole(role, employee);
            }).then(function (res) {
                if (res.affectedRows === 1) console.log("Success!");
                start();
            })
        })
    })
}

// runs start on connection
connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    start();
});
