
const { JSDOM } = require('jsdom');
const inquirer = require('inquirer');
const { create } = require('svg-captcha');
const fs = require('fs');

const { window } = new JSDOM();
const document = window.document;


/*const logoDiv = document.createElement('div');

const html = `
<!DOCTYPE html>
<html>
<head>
  <title>Logo</title>
  <style>
    svg {
      display: block;
      max-width: 100%;
      height: auto;
    }
  </style>
</head>
<body>
  <div id="logo"></div>
  <script src="index.js"></script>
</body>
</html>
`;

logoDiv.innerHTML = html;

const logoContainer = logoDiv.querySelector('#logo');*/

function createLogo(answers) {
    let svgLogo = '';

    // Create logo shape
    switch (answers.shape) {
        case 'circle':
            svgLogo += `<circle cx="50" cy="50" r="40" fill="${answers.shapeColor}"/>`;
            break;
        case 'triangle':
            svgLogo += `<polygon points="50,10 10,90 90,90" fill="${answers.shapeColor}"/>`;
            break;
        case 'square':
            svgLogo += `<rect x="10" y="10" width="80" height="80" fill="${answers.shapeColor}"/>`;
            break;
        default:
            break;
    }

    // Create logo text
    svgLogo += `<text x="50%" y="50%" fill="${answers.textColor}" font-size="50" text-anchor="middle" dominant-baseline="middle">${answers.title}</text>`;

    // Add finishing touches
    svgLogo = `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">${svgLogo}</svg>`;

    return svgLogo;
}


inquirer.prompt([
    {
        type: 'input',
        name: 'title',
        message: 'What text would you like for your logo? (up to 3 characters)',
    },
    {
        type: 'input',
        name: 'textColor',
        message: 'Please enter the color for the text (keyword or hexadecimal number):',
    },
    {
        type: 'input',
        name: 'shape',
        message: 'Select a shape for your logo:',
        choices: ['circle', 'triangle', 'square']

    },
    {
        type: 'input',
        name: 'shapeColor',
        message: 'Enter the color for the shape (keyword or hexadecimal number):'
    }
]).then(answers => {
    const captcha = create({
        size: { width: 300, height: 200 },
        ignoreChars: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
        noise: 3,
        color: true,
        background: '#fff',
        fontSize: 80,
        charPreset: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    });

    captcha.text = answers.text;
    captcha.textStyle = `fill:${answers.textColor}`;
    captcha.data = captcha.data.replace(/#000/g, answers.shapeColor);

    fs.writeFile('logo.svg', captcha.data, function (err) {
        if (err) throw err;
        console.log('Generated logo.svg');

        const svgLogo = createLogo(answers);

        
        const html = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Logo</title>
            <style>
                svg {
                    display: block;
                    max-width: 100%;
                    height: auto;
                }
            </style>
        </head>
        <body>
            <div>
                <img src="data:image/svg+xml;base64,${Buffer.from(svgLogo).toString('base64')}" />
            </div>
        </body>
        </html>
        `;

        fs.writeFile('index.html', html, function (err) {
            if (err) throw err;
            console.log('Generated index.html');


    });
});
});


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