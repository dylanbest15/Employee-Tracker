// requirements
const connection = require("./connection.js");
const cTable = require("console.table");

// query object
const orm = {
  insertIntoDepartment: function (depName) {
    const query = "INSERT INTO department SET name = ?"
    connection.query(query, [depName], function (err, res) {
      if (err) throw err;
      res.status(200).end();
    })
  },
  insertIntoRole: function (roleTitle, roleSalary, roleDepartment) {
    const query = "INSERT INTO role SET title = ?, salary = ?, department_id = (SELECT id FROM department WHERE name = ?)";
    connection.query(query, [roleTitle, roleSalary, roleDepartment], function (err, res) {
      if (err) throw err;
      res.status(200).end();
    })
  },
  insertIntoEmployee: function (empFirstName, empLastName, empRole, empManager) {
    const firstName = empManager.trim().split(" ")[0];
    const lastName = empManager.trim().split(" ")[1];
    let query = "INSERT INTO employee SET first_name = ?, last_name = ?, role_id = (SELECT id FROM role WHERE title = ?), "
    query += "manager_id = (SELECT id FROM employee WHERE first_name = ? AND last_name = ?)";
    connection.query(query, [empFirstName, empLastName, empRole, firstName, lastName], function (err, res) {
      if (err) throw err;
      res.status(200).end();
    })
  },
  viewEmployees: function () {
    let query = "SELECT e.id, e.first_name, e.last_name, r.title, d.name as department, r.salary, "
    query += "CONCAT('e.first_name', ' ', 'e.last_name') as manager FROM employee e ";
    query += "INNER JOIN role r ON e.role_id = r.id INNER JOIN department d ON r.department_id = d.id ";
    query += "LEFT JOIN employee m ON e.manager_id = m.id";
    connection.query(query, function (err, res) {
      if (err) throw err;
      console.table(res);
    })
  },
  viewEmployeesWhere: function (columnName, columnValue) {
    let query = "SELECT e.id, e.first_name, e.last_name, r.title, d.name as department, r.salary, "
    query += "CONCAT('e.first_name', ' ', 'e.last_name') as manager FROM employee e ";
    query += "INNER JOIN role r ON e.role_id = r.id INNER JOIN department d ON r.department_id = d.id ";
    query += "LEFT JOIN employee m ON e.manager_id = m.id WHERE ?? = ?"
    connection.query(query, [columnName, columnValue], function (err, res) {
      if (err) throw err;
      console.table(res);
    })
  },
  updateEmployeeRole: function (roleTitle, employeeName) {
    const query = "UPDATE employee SET role_id = (SELECT id FROM role WHERE title = ?) WHERE CONCAT('first_name', ' ', 'last_name') = ?";
    connection.query(query, [roleTitle, employeeName], function (err, res) {
      if (err) throw err;
      res.status(200).end();
    })
  }
}

// export orm
module.eports = orm;