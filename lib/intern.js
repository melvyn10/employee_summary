const Employee = require("./employee");
const fs = require ("fs");

class Intern extends Employee {
    constructor(name, id, email, school) {
    super (name, id, email);
    if (typeof school != 'string') {
        throw new Error("'school' must be a valid string");
    }
    this.school = school;
    }
    
    getSchool() {
        return this.school;
    }

    getRole() {
        return "Intern";
    }

    printInfo () {
        super.printInfo();
        console.log( `school name: ${this.school}`);
        
        let id = super.getId();
        let name = super.getName();
        let email = super.getEmail();
        let role = this.getRole();
        let school = this.getSchool();

        let html = fs.readFileSync('./templates/intern.html', 'utf8');
        return (eval('`'+html+'`'));
    }

    
}

module.exports = Intern;