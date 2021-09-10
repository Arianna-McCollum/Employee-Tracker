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

function employeePrompt() {
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
                'View Total Budget of A Department',
                'Add A Department',
                'Add A Role',
                'Add An Employee',
                'Remove A Department',
                'Remove A Role',
                'Remove An Employee',
                'Update An Employee Role',
                'Update An Employee Manager',
                'Exit'
            ],
            message: ' What would you like to do?'
        }
    ])
}




