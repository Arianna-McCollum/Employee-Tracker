const validate = require('./utils/validate');
const connection = require('./db/connection');
const inquirer = require('inquirer');
const cTable = require('console.table');
const chalk = require('chalk');
const figlet = require('figlet');

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
                'View Employees By Manager',
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

        if (action === 'View Employees By Manager') {
            viewEmployeesByManager();
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


//For viewing options

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
    const sql =     `SELECT role.id, role.title, department.department_name AS department
                    FROM role
                    INNER JOIN department ON role.department_id = department.id`;
    connection.query(sql, (error, response) => {
      if (error) throw error;
        response.forEach((role) => {console.log(role.title);});
        console.log(chalk.magenta.dim(`====================================================================================`));
        employeePrompt();
    });
  };
