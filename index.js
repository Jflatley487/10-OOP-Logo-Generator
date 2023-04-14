
const inquirer = require('inquirer');
const fs = require('fs');

/*GIVEN a command-line application that accepts user input
WHEN I am prompted for text
THEN I can enter up to three characters
WHEN I am prompted for the text color
THEN I can enter a color keyword (OR a hexadecimal number)
WHEN I am prompted for a shape
THEN I am presented with a list of shapes to choose from: circle, triangle, and square
WHEN I am prompted for the shape's color
THEN I can enter a color keyword (OR a hexadecimal number)
WHEN I have entered input for all the prompts
THEN an SVG file is created named `logo.svg`
AND the output text "Generated logo.svg" is printed in the command line
WHEN I open the `logo.svg` file in a browser
THEN I am shown a 300x200 pixel image that matches the criteria I entered */

const questions = [
    {
        type: 'input',
        name: 'title',
        message: 'What text would you like for your logo? (up to 3 characters)',
    },
    {
        type: 'input',
        name: 'text color',
        message: 'Please enter text color keyword or hexadecimal number:',
    },
    {
        type: 'input',
        name: 'shape',
        message: 'What shape would you like the logo to be?',
    
    },
    {
        type: 'input',
        name: 'shape color',
        message: 'What color would you like the shape to be?'
    }
];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, (err) =>
        err ? console.error(err) : console.log('README.md file generated!')
    );
}

// TODO: Create a function to initialize app
function init() {
    inquirer.prompt(questions).then((answers) => {
        const readme = `
        # ${answers.title}
        ## Description
        ${answers.description}
        ## Installation
        ${answers.installation}
        ## Screenshot
        ${answers.screenshot}
        `;
            writeToFile('README.md', readme);
    });
}

// Function call to initialize app
init();