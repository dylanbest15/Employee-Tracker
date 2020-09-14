// requirements
const connection = require("./connection.js");

// helper function for query strings
function viewAllEmployeesQuery() {
  return `SELECT e.id, e.first_name, e.last_name, r.title, d.name as department, r.salary, 
  CONCAT(e.first_name, ' ', e.last_name) as manager FROM employee e 
  INNER JOIN role r ON e.role_id = r.id INNER JOIN department d ON r.department_id = d.id 
  LEFT JOIN employee m ON e.manager_id = m.id`;
}

// query object
const orm = {
  insertIntoDepartment: function (depName) {
    return new Promise((resolve, reject) => {
      const query = "INSERT INTO department SET name = ?"
      connection.query(query, [depName], function (err, res) {
        if (err) reject(err);
        return resolve(res);
      })
    })
  },
  insertIntoRole: function (roleTitle, roleSalary, roleDepartment) {
    return new Promise((resolve, reject) => {
      const query = "INSERT INTO role SET title = ?, salary = ?, department_id = (SELECT id FROM department WHERE name = ?)";
      connection.query(query, [roleTitle, roleSalary, roleDepartment], function (err, res) {
        if (err) reject(err);
        return resolve(res);
      })
    })
  },
  insertIntoEmployee: function (empFirstName, empLastName, empRole, empManager) {
    return new Promise((resolve, reject) => {
      const firstName = empManager.trim().split(" ")[0];
      const lastName = empManager.trim().split(" ")[1];
      let query = `INSERT INTO employee SET first_name = ?, last_name = ?, role_id = (SELECT id FROM role WHERE title = ?), 
      manager_id = (SELECT id FROM (SELECT * FROM employee) AS e WHERE first_name = ? AND last_name = ?)`;
      connection.query(query, [empFirstName, empLastName, empRole, firstName, lastName], function (err, res) {
        if (err) reject(err);
        return resolve(res);
      })
    })
  },
  viewEmployees: function () {
    return new Promise((resolve, reject) => {
      let query = viewAllEmployeesQuery();
      connection.query(query, function (err, res) {
        if (err) reject(err);
        return resolve(res);
      })
    })
  },
  viewEmployeesWhere: function (columnName, columnValue) {
    return new Promise((resolve, reject) => {
      let query = `${viewAllEmployeesQuery()} WHERE ?? = ?`
      connection.query(query, [columnName, columnValue], function (err, res) {
        if (err) reject(err);
        return resolve(res);
      })
    })
  },
  updateEmployeeRole: function (roleTitle, employeeName) {
    return new Promise((resolve, reject) => {
      const query = "UPDATE employee SET role_id = (SELECT id FROM role WHERE title = ?) WHERE CONCAT(first_name, ' ', last_name) = ?";
      connection.query(query, [roleTitle, employeeName], function (err, res) {
        if (err) reject(err);
        return resolve(res);
      })
    })
  }
}

// export orm
module.exports = orm;