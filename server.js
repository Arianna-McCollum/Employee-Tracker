const validate = require('./utils/validate');
const connection = require('./db/connection');
const inquirer = require('inquirer');
const cTable = require('console.table');
const chalk = require('chalk');
const figlet = require('figlet');
const { response } = require('express');

connection.connect((error) => {
    if (error) throw error;
    console.log(chalk.magenta.dim(`====================================================================================`));
    console.log(``);
    console.log(chalk.magentaBright.bold(figlet.textSync('Employee Tracker')));
    console.log(``);
    console.log(`                                                          ` + chalk.magenta.dim('Created By: Arianna McCollum'));
    console.log(``);
    console.log(chalk.magenta.dim(`====================================================================================`));
    employeePrompt();
});

const employeePrompt = () => {
    inquirer.prompt([
        {
            name: 'action',
            type: 'list',
            message: ' What would you like to do?',
            choices: [
                'View All Departments',
                'View All Roles',
                'View All Employees',
                'View Employees By Department',
                'View Budget of A Department',
                'Add Department',
                'Add Role',
                'Add Employee',
                'Remove Department',
                'Remove Role',
                'Remove Employee',
                'Update Employee Role',
                'Update Employee Manager',
                'Exit'
            ],
        }
    ])
    .then((answers) => {
        const { action } = answers;

        if (action === 'View All Departments') {
            viewAllDepartments();
        }

        if (action === 'View All Roles') {
            viewAllRoles();
        }

        if (action === 'View All Employees') {
            viewAllEmployees();
        }

        if (action === 'View Employees By Department') {
            viewEmployeesByDepartment();
        }

        if (action === 'View Budget of A Department') {
            viewBudget();
        }

        if (action === 'Add Department') {
            addDepartment();
        }

        if (action === 'Add Role') {
            addRole();
        }

        if (action === 'Add Employee') {
            addEmployee();
        }

        if (action === 'Remove Department') {
            removeDepartment();
        }

        if (action === 'Remove Role') {
            removeRole();
        }

        if (action === 'Remove Employee') {
            removeEmployee();
        }

        if (action === 'Update Employee Role') {
            updateRole();
        }

        if (action === 'Update Employee Manager') {
            updateManager();
        }

        if (action === 'Exit') {
            connection.end();
        }

    });
};


//-----------------------For viewing options

// View All Departments

const viewAllDepartments = () => {
    const sql = `SELECT department.id AS id, department.department_name AS department FROM department`;
    connection.query(sql, (error, response) => {
        if (error) throw error;
        console.log(chalk.magenta.dim(`====================================================================================`));
        console.log(`                              ` + chalk.magenta.bold(`All Departments:`));
        console.log(chalk.magenta.dim(`====================================================================================`));
        console.table(response);
        console.log(chalk.magenta.dim(`====================================================================================`));
        employeePrompt();
    });
};

// View All Roles

const viewAllRoles = () => {
    console.log(chalk.magenta.dim(`====================================================================================`));
    console.log(`                              ` + chalk.magenta.bold(`All Roles:`));
    console.log(chalk.magenta.dim(`====================================================================================`));
    const sql =     `SELECT role.id, 
                        role.title, 
                        department.department_name AS department
                        FROM role
                        INNER JOIN department ON role.department_id = department.id`;
    connection.query(sql, (error, response) => {
      if (error) throw error;
        response.forEach((role) => {console.log(role.title);});
        console.log(chalk.magenta.dim(`====================================================================================`));
        employeePrompt();
    });
  };

  // View All Employees

  const viewAllEmployees = () => {
    const sql = `SELECT employee.id,
                    employee.first_name,
                    employee.last_name,
                    role.title,
                    department.department_name AS 'department',
                    role.salary
                    FROM employee, role, department
                    WHERE department.id = role.department_id
                    AND role.id = employee.role_id
                    Order BY employee.id ASC`;
    connection.query(sql, (error, response) => {
        if (error) throw error;
        console.log(chalk.magenta.dim(`====================================================================================`));
        console.log(`                              ` + chalk.magenta.bold(`All Employees:`));
        console.log(chalk.magenta.dim(`====================================================================================`));
        console.table(response);
        console.log(chalk.magenta.dim(`====================================================================================`));
        employeePrompt();
    });
};

// View Employees By Department

const viewEmployeesByDepartment = () => {
    const sql =     `SELECT employee.first_name, 
    employee.last_name, 
    department.department_name AS department
    FROM employee 
    LEFT JOIN role ON employee.role_id = role.id 
    LEFT JOIN department ON role.department_id = department.id`;
    connection.query(sql, (error, response) => {
        if (error) throw error;
        console.log(chalk.magenta.dim(`====================================================================================`));
        console.log(`                              ` + chalk.magenta.bold(`Employees By Department:`));
        console.log(chalk.magenta.dim(`====================================================================================`));
        console.table(response);
        console.log(chalk.magenta.dim(`====================================================================================`));
        employeePrompt();
    });
};


// View By Department Budget

const viewBudget = () => {
  console.log(chalk.magenta.dim(`====================================================================================`));
  console.log(`                              ` + chalk.magenta.bold(`Budget of Departments:`));
  console.log(chalk.magenta.dim(`====================================================================================`));
  const sql =     `SELECT department_id AS id, 
                  department.department_name AS department,
                  SUM(salary) AS budget
                  FROM  role  
                  INNER JOIN department ON role.department_id = department.id GROUP BY  role.department_id`;
  connection.query(sql, (error, response) => {
    if (error) throw error;
      console.table(response);
      console.log(chalk.magenta.dim(`====================================================================================`));
      employeePrompt();
  });
};

//------------------For Adding options

// Add a department

const addDepartment = () => {
    inquirer.prompt([
        {
            name: 'newDepartment',
            type: 'input',
            message: 'What is the name of the Department?',
            validate: validate.validateString
        }
    ])
    .then((answer) =>{
        const sql = `INSERT INTO department (department_name) VALUES (?)`;
        connection.query(sql, answer.newDepartment, (error, response) => {
            if (error) throw error;
            console.log(``);
            console.log(chalk.magenta.dim(answer.newDepartment + ` Department successfully created.`));
            console.log(``);
            viewAllDepartments();
        })
    })
}

// Add a Role

const addRole = () => {
    const sql = `SELECT * FROM department`
    connection.query(sql, (error, response) => {
        if (error) throw error;
        let deptNamesArray = [];
        response.forEach((department) => {deptNamesArray.push(department.department_name);});
        deptNamesArray.push('Create Department');
        
        inquirer.prompt([
            {
                name: 'departmentName',
                type: 'list',
                message: 'Which department is this role in?',
                choices: deptNamesArray
            }
        ])
        .then((answer) => {
            if (answer.departmentName === 'Create Department') {
                this. addDepartment();
            }else{
                addRoleResume(answer);
            }
        });
        const addRoleResume = (departmentData) => {
            inquirer.prompt([
                {
                    name: 'newRole',
                    type: 'input',
                    message:'What is the name of the role?',
                    validate: validate.validateString
                },
                {
                    name: 'salary',
                    type: 'input',
                    message: 'What is the salary of this role?',
                    validate: validate.validateSalary
                }
            ])
            .then((answer) => {
                let createdRole = answer.newRole;
                let departmentId;

                response.forEach((department) =>{
                    if (departmentData.departmentName === department.department_name) {departmentId = department.id}
                });

                let sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
                let crit = [createdRole, answer.salary, departmentId];

                connection.query(sql, crit, (error) =>{
                    if (error) throw error;
                    console.log(chalk.magenta.dim(`====================================================================================`));
                    console.log(chalk.magenta(`Role successfully created.`));
                    console.log(chalk.magenta.dim(`====================================================================================`));
                    viewAllRoles();
                });
            });
        };

    });
};

// Add an Employee

const addEmployee = () => {
    inquirer.prompt([
        {
            name:'firstName',
            type: 'input',
            message: "What is the employee's first name?",
            validate: addFirstName => {
                if (addFirstName) {
                    return true;
                }else{
                    console.log('Please enter a first name');
                    return false;
                }
            }
        },
        {
            name:'lastName',
            type: 'input',
            message: "What is the employee's last name?",
            validate: addLastName => {
                if (addLastName) {
                    return true;
                }else{
                    console.log('Please enter a last name');
                    return false;
                }
            }
        }
    ])
    .then(answer => {
        const crit = [answer.firstName, answer.lastName]
        const roleSql = `SELECT role.id, role.title FROM role`;
        connection.query(roleSql, (error, data) => {
            if (error) throw error;
            const roles = data.map(({ id, title }) => ({ name: title, value: id}));
            inquirer.prompt([
                {
                    name: 'role',
                    type: 'list',
                    message: "What is the employee's role?",
                    choices: roles
                }
            ])
            . then(roleChoice => {
                const role = roleChoice.role;
                crit.push(role);
                const managerSql = `SELECT * FROM employee`;
                connection.query(managerSql, (error, data) => {
                    if (error) throw error;
                    const managers = data.map(({ id, first_name, last_name }) => ({ name: first_name + " " + last_name, value: id}));
                    inquirer.prompt([
                        {
                            name: 'manager',
                            type: 'list',
                            message: "Who is the employee's manager?",
                            choices: managers  
                        }
                    ])
                    .then(managerChoice => {
                        const manager = managerChoice.manager;
                        crit.push(manager);
                        const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                                    VALUES (?, ?, ?, ?)`;
                        connection.query(sql, crit, (error) => {
                            if (error) throw error;
                            console.log("Employee Added.")
                            viewAllEmployees();
                        });
                    });
                });
            });
        });
    });
};

//-------------------------Update Options

// Update Employee Role

const updateRole = () => {
    let sql = `SELECT employee.id, employee.first_name, employee.last_name, role.id AS "role_id"
            FROM employee, role, department
            WHERE department.id = role.department_id AND role.id = employee.role_id`;
    connection.query(sql, (error, response) => {
        if (error) throw error;
        let employeeNamesArray = [];
        response.forEach((employee) => {employeeNamesArray.push(`${employee.first_name} ${employee.last_name}`);});

        let sql = `SELECT role.id, role.title FROM role`;
        connection.query(sql, (error, response) => {
            if (error) throw error;
            let rolesArray = [];
            response.forEach((role) => {rolesArray.push(role.title);});

            inquirer.prompt([
                {
                    name: 'chosenEmployee',
                    type: 'list',
                    message: 'Which employee has a new role?',
                    choices: employeeNamesArray
                },
                {
                    name: 'chosenRole',
                    type: 'list',
                    message: 'What is their role?',
                    choices: rolesArray
                }
            ])
            .then((answer) => {
                let newTitleId, employeeId;

                response.forEach((role) => {
                    if (answer.chosenRole === role.title) {
                        newTitleId = role.id;
                    }
                });

                response.forEach((employee) => {
                    if (answer.chosenEmployee === `${employee.first_name} ${employee.last_name}`) {
                        employeeId = employee.id;
                    }
                });

                let sqls = `UPDATE employee SET employee.role_id =? WHERE employee.id = ?`;
                connection.query(sqls, [newTitleId, employeeId], (error) =>{
                    if (error) throw error;
                    console.log(chalk.magenta.dim(`====================================================================================`));
                    console.log(chalk.magenta(`Employee Role Updated`));
                    console.log(chalk.magenta.dim(`====================================================================================`));
                    employeePrompt();
                }
                );
            });
        });
    });
};

