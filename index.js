const inquirer = require("inquirer");

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