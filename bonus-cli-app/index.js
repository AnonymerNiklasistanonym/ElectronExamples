#!/usr/bin/env node

/*
 * Example script for a cross platform CLI application
 */

// https://github.com/SBoudrias/Inquirer.js/ A collection of common interactive CLI UIs
// Cool examples: https://github.com/SBoudrias/Inquirer.js/tree/master/packages/inquirer/examples
const inquirer = require("inquirer")
// https://github.com/chalk/chalk - Terminal string styling
const chalk = require("chalk")
// https://github.com/shelljs/shelljs Portable Unix shell commands for Node.js
const shelljs = require("shelljs")
// get file system separator
const path = require('path')

/*
 * Print colored text
 */
console.log('\nPrint colored text:\n-------------------------------------')
console.log(chalk.rgb(255, 0, 0)('Example >> Colored text: Red [rgb(255, 0, 0)]'))
console.log(chalk.hex('#4bcc35')('Example >> Colored text: Green [hex(#4bcc35)]'))
console.log(chalk.keyword('orange')('Example >> Colored text: orange [keyword(orange)]'))
/*
 * Print colored background
 */
console.log('\nPrint colored background:\n-------------------------------------')
console.log(chalk.bgRgb(255, 0, 0)('Example >> Colored background: Red [rgb(255, 0, 0)]'))
console.log(chalk.bgHex('#4bcc35')('Example >> Colored background: Green [hex(#4bcc35)]'))
console.log(chalk.bgKeyword('orange')('Example >> Colored background: orange [keyword(orange)]'))
/*
 * Print bold/underlined text
 */
console.log('\nPrint bold/italic/underlined text:\n-------------------------------------')
console.log(chalk.underline('Example >> Underlined text'))
console.log(chalk.bold('Example >> Bold text'))
/*
 * Inline formatting
 */
console.log('\nInline formatting:\n-------------------------------------')
console.log(chalk `
Example >> Inline formatting: Normal text: {bold bold text}.
Variables can also be used: 44 * 66 = {bold ${44 * 66}}, colors too: {green.bold.underline GREEN}.`);


const askQuestions = () => {
    console.log('\nAsk questions:\n-------------------------------------')
    const requireLetterAndNumber = value => {
        if (/\w/.test(value) && /\d/.test(value)) {
            return true;
        }
        return 'Password need to have at least a letter and a number';
    };
    const questions = [{
            name: "FILENAME",
            type: "input",
            message: "Create a file with the following name:"
        },
        {
            type: "list",
            name: "EXTENSION",
            message: "What is the file extension?",
            choices: [".rb", ".js", ".php", ".css"],
            filter: function (val) {
                return val.split(".")[1]
            }
        },
        {
            type: "rawlist",
            name: "SIZE",
            message: "How much lorem ipsum should the file contain? (enter index)",
            choices: ["Jumbo", "Large", "Medium", "Small", "Micro"],
            filter: function (val) {
                return val
            }
        },
        {
            type: 'password',
            message: 'Enter a password (letter + number)',
            name: 'password1',
            validate: requireLetterAndNumber
        },
        {
            type: 'password',
            message: 'Enter a masked password (letter + number)',
            name: 'password2',
            mask: '*',
            validate: requireLetterAndNumber
        },
        {
            type: 'expand',
            name: 'toppings',
            message: 'What about the toppings?',
            choices: [
              {
                key: 'p',
                name: 'Pepperoni and cheese',
                value: 'PepperoniCheese'
              },
              {
                key: 'a',
                name: 'All dressed',
                value: 'alldressed'
              },
              {
                key: 'w',
                name: 'Hawaiian',
                value: 'hawaiian'
              }
            ]
          },
          {
            type: 'confirm',
            name: 'toBeDelivered',
            message: 'You OK with this?',
            default: false
          },
          {
            type: 'checkbox',
            message: 'Select toppings (enter space bar to select)',
            name: 'toppings',
            choices: [
              new inquirer.Separator(' = The Meats = '),
              {
                name: 'Pepperoni'
              },
              {
                name: 'Ham'
              },
              {
                name: 'Ground Meat'
              },
              {
                name: 'Bacon'
              },
              new inquirer.Separator(' = The Cheeses = '),
              {
                name: 'Mozzarella',
                checked: true
              },
              {
                name: 'Cheddar'
              },
              {
                name: 'Parmesan'
              },
              new inquirer.Separator(' = The usual ='),
              {
                name: 'Mushroom'
              },
              {
                name: 'Tomato'
              },
              new inquirer.Separator(' = The extras = '),
              {
                name: 'Pineapple'
              },
              {
                name: 'Olives',
                disabled: 'out of stock'
              },
              {
                name: 'Extra cheese'
              }
            ],
            validate: function(answer) {
              if (answer.length < 1) {
                return 'You must choose at least one topping.';
              }
              return true;
            }
          }
    ]
    return inquirer.prompt(questions)
}

const createFile = (filename, extension) => {
    console.log('\nUse UNIX commands cross platform:\n-------------------------------------')
    const filePath = `${process.cwd()}${path.sep}${filename}.${extension}`
    shelljs.touch(filePath)
    return filePath
}

const run = async () => {

    // ask questions
    const answers = await askQuestions()
    const {
        FILENAME,
        EXTENSION
    } = answers

    // create the file
    const filePath = createFile(FILENAME, EXTENSION)

    // show success message
    console.log(chalk.white.bgGreen.bold(`Done! File created at ${filePath}`))
}

run()
