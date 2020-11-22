const Employee = require("./employee");
const fs = require ("fs");

class Engineer extends Employee {
    constructor(name, id, email, github) {
    super (name, id, email);
    if (typeof github != 'string') {
        throw new Error("'github' must be a valid string");
    }
    this.github = github;
    }

    printInfo () {
        super.printInfo();
        console.log( `github name: ${this.github}`);

        let id = super.getId();
        let name = super.getName();
        let email = super.getEmail();
        let role = this.getRole();
        let github = this.getGithub();

        let html = fs.readFileSync('./templates/engineer.html', 'utf8');
        return (eval('`'+html+'`'));
    }

    getGithub() {
        return this.github;
    }

    getRole() {
        return "Engineer";
    }
    
}

module.exports = Engineer;