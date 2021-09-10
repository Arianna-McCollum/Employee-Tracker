const connection = require('./db/connection');
const validate = require('./utils/validate');
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
        const {choices} = answers;

        if (choices === 'View All Departments') {
            viewAllDepartments();
        }

        // if (choices === 'View All Roles') {
        //     viewAllRoles();
        // }

        // if (choices === 'View All Employees') {
        //     viewAllEmployees();
        // }

        // if (choices === 'View Employees By Manager') {
        //     viewEmployeesByManager();
        // }

        // if (choices === 'View Employees By Department') {
        //     viewEmployeesByDepartment();
        // }

        // if (choices === 'View Budget of A Department') {
        //     viewBudget();
        // }

        // if (choices === 'Add Department') {
        //     addDepartment();
        // }

        // if (choices === 'Add Role') {
        //     addRole();
        // }

        // if (choices === 'Add Employee') {
        //     addEmployee();
        // }

        // if (choices === 'Remove Department') {
        //     removeDepartment();
        // }

        // if (choices === 'Remove Role') {
        //     removeRole();
        // }

        // if (choices === 'Remove Employee') {
        //     removeEmployee();
        // }

        // if (choices === 'Update Employee Role') {
        //     updateRole();
        // }

        // if (choices === 'Update Employee Manager') {
        //     updateManager();
        // }

        if (choices === 'Exit') {
            connection.end();
        }

    });
};


//For viewing options

// View All Departments

const viewAllDepartments = () => {
    const sql = `SELECT department.id AS id, department.department_name AS department FROM department`;
    connection.promise().query(sql, (error, response) => {
        if (error) throw error;
        console.log(chalk.magenta.dim(`====================================================================================`));
        console.log(`                              ` + chalk.magenta.bold(`All Departments:`));
        console.log(chalk.magenta.dim(`====================================================================================`));
        console.table(response);
        console.log(chalk.magenta.dim(`====================================================================================`));
        employeePrompt();
    });
};


