// requirements
const orm = require("./config/orm.js");
const inquirer = require("inquirer");

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
        } else if (answer.start === "update employee roles") {
            updateRoles();
        } else {
            connection.end();
        }
        start();
    })
}

function addDepartment() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Enter the department's name-"
        }
    ]).then(function ({ name } = answer) {
        insertIntoDepartment(name);
    })
}

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
        ]).then(function ({ title, salary, department } = answer) {
            insertIntoRole(title, salary, department);
        })
    })
}

// ???????????????????????????????? EMPLOYEE NOT BEING ADDED
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
            ]).then(function ({ firstName, lastName, role, manager } = answer) {
                insertIntoEmployee(firstName, lastName, role, manager);
            })
        })
    })
}

// ?????????????????????????????????????????? MANAGER COLUMN NOT JOINING
function viewRoles() {
    connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw err;
        inquirer.prompt([
            {
                type: "list",
                name: "role",
                message: "Pick a role-",
                choices: function () {
                    var roleArray = [];
                    res.forEach(element => {
                        roleArray.push(element.title);
                    })
                    return roleArray;
                }
            }
        ]).then(function ({ role } = answer) {
            viewEmployees("r.title", role);
        })
    })
}

// ?????????????????????????????????????????? MANAGER COLUMN NOT JOINING
function viewDepartments() {
    connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;
        inquirer.prompt([
            {
                type: "list",
                name: "department",
                message: "Pick a department-",
                choices: function () {
                    var departmentArray = [];
                    res.forEach(element => {
                        departmentArray.push(element.name);
                    })
                    return departmentArray;
                }
            }
        ]).then(function ({ department } = answer) {
            viewEmployees("d.name", department);
        })
    })
}

// ?????????????????????? SAYS WORKING BUT NOT UPDATING EMPLOYEE ROLE
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
                    choices: function () {
                        var employeeArray = [];
                        employeeRes.forEach(element => {
                            employeeArray.push(`${element.first_name} ${element.last_name}`);
                        })
                        return employeeArray;
                    }
                },
                {
                    type: "list",
                    name: "role",
                    message: "Choose a role-",
                    choices: function () {
                        var roleArray = [];
                        roleRes.forEach(element => {
                            roleArray.push(element.title);
                        })
                        return roleArray;
                    }
                }
            ]).then(function ({ employee, role } = answer) {
                updateEmployeeRole(role, employee);
            })
        })
    })
}

start();