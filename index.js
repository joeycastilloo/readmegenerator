const fs = require('fs');
const inquirer = require('inquirer');
const util = require('util');
const writeFileAsync = util.promisify(fs.writeFile)
function questionsUser() {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: "What is your name?",
            validate: function (userInput) {
                return userInput.length < 1 ? console.log('Please enter a valid name.') : true;
            }
        },
        {
            type: 'input',
            name: 'location',
            message: "Where are you from?",
            validate: function (userInput) {
                return userInput.length < 1 ? console.log('Please enter a valid location.') : true;
            }
        },
        {
            type: 'input',
            name: 'hobby',
            message: "What is your favorite hobby?",
            validate: function (userInput) {
                return userInput.length < 1 ? console.log('Please enter your hobby.') : true;
            }
        },
        {
            type: 'input',
            name: 'food',
            message: "What is your favorite food?",
            validate: function (userInput) {
                return userInput.length < 1 ? console.log('Please enter your favorite food.') : true;
            }
        },
        {
            type: 'input',
            name: 'username',
            message: "Enter your GitHub username:",
            validate: function (userInput) {
                return userInput.length < 1 ? console.log('Please enter your GitHub username.') : true;
            }
        },
        {
            type: 'input',
            name: 'linkURL',
            message: "Enter your LinkedIn URL:",
        },
    ])
};
async function init() {
    try {
        const answers = await questionsUser();
        const generateHTML = generateIndex(answers);
        await writeFileAsync('index.html', generateHTML);
        console.log('Completed!');
    } catch (err) {
        console.log(err);
    }
}
init();
function generateIndex(answers) {
    return ` 
    <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css" integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l" crossorigin="anonymous">
      <title>Node Mini</title>
  </head>
  <body>
  <div class="jumbotron">
  <h1 class="display-4">Hello, world!</h1>
  <p class="lead">My name is ${answers.name} </p>
  <hr class="my-4">
  <p>I was born in ${answers.location}, my favorite hobby is ${answers.hobby} and I love ${answers.food} </p>
  <p>If you would like to contact me on GitHub, my user name is ${answers.username} and my LinkedIn URL is ${answers.linkURL} </p>
  <p>Thanks for stopping by!</p>
</div>
  </body>
  </html>
  `;
}
module.exports = generateIndex;