var inquirer = require("inquirer");
var fs = require ("fs");
const Manager = require("./lib/manager");
const Engineer = require("./lib/engineer");
const Intern = require("./lib/intern");


function readFileAsync(path, encoding) {
    return new Promise(function(resolve, reject) {
      fs.readFile(path, encoding, function(err, data) {
        if (err) {
          return reject(err);
        } 
        resolve(data);
      });
    });
  }

function writeFileAsync(path,data) {
    return new Promise(function(resolve, reject) {
      fs.writeFile(path, data, function(err) {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    });
  }

async function buildTeam() {
    let teamSize = 0;
    let teamHtml = '';
    let mainHtml = '';

    await inquirer
    .prompt ([
        {
            type: "input",
            message: "How many employees on the team",
            name: "number"
        },
    ])
    .then((response) => {
        teamSize = response.number;
    });

    if (teamSize === 0) {
        console.log ("Team must have at least 1 employee");
    }
    else {
         
        let id = 0;
        let name = '';
        let role = '';
        let email = '';
        

        for (i=0; i<teamSize; i++) {
            await inquirer
            .prompt ([
                {
                    type: "input",
                    message: "Enter employee id",
                    name: "id"
                },

                {
                    type: "input",
                    message: "Enter employee name ",
                    name: "name"
                },
                
                {
                    type: "list",
                    message: "Enter employee role ",
                    choices: ["manager","engineer","intern"],
                    default: "intern",
                    name: "role"
                },

                {
                    type: "input",
                    message: "Enter email ",
                    name: "email"
                }

            ])

            .then(function (response) {
                id = parseInt(response.id);
                name = response.name;
                role = response.role;
                email = response.email;
            });

            if (role == 'manager') {    
                await inquirer
                .prompt ([
                    {
                        type: "input",
                        message: "Enter office number",
                        name: "office"
                    }
                ])
                .then (function (response) {
                    const manager = new Manager(name, id, email, parseInt(response.office));
                    teamHtml = teamHtml + manager.printInfo();
                });
            }
            else if (role == 'engineer') {
                await inquirer
                .prompt ([
                    {
                        type: "input",
                        message: "Enter github username",
                        name: "github"
                    }
                ])
                .then (function (response) {
                    const engineer = new Engineer(name, id, email, response.github);
                    teamHtml = teamHtml + engineer.printInfo();
                });
            }
            else if (role == 'intern') {
                await inquirer
                .prompt ([
                    {
                        type: "input",
                        message: "Enter school name",
                        name: "school"
                    }
                ])
                .then (function (response) {
                    const intern = new Intern(name, id, email, response.school);
                    teamHtml = teamHtml + intern.printInfo();
//                    console.log ('add intern template: ' + teamHtml);
                });
            } /* end of roles */

        } /* end teamSize for loop*/
    } /* end if teamSize */

    
    // read main.html and add team template to it
    await readFileAsync('./templates/main.html', 'utf8').then (function(mainTemplate) {
        mainHtml = (eval ('`'+ mainTemplate + '`'));
//        console.log ('template: ' + mainHtml);
        
    })
    .catch(function(err) {
        console.log(err);
    });

    await writeFileAsync('./output/team.html',mainHtml).then(function() {
        console.log("Success!");
    })
    .catch(function(err) {
        console.log(err);
    });
}

buildTeam();


