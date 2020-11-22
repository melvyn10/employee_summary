const Employee = require("./employee");
const fs = require ("fs");

class Manager extends Employee {
    constructor(name, id, email, officeNumber) {
    super (name, id, email);
    if (typeof officeNumber != 'number'  || officeNumber <= 0) {
        throw new Error("'officeNumber' must be a valid positive number)");
    }
    this.officeNumber = officeNumber;
    }

    getOfficeNumber() {
        return this.officeNumber;
    }

    getRole() {
        return "Manager";
    }

    printInfo () {
        super.printInfo();
        console.log( `officeNumber number: ${this.officeNumber}`);

        let id = super.getId();
        let name = super.getName();
        let email = super.getEmail();
        let role = this.getRole();
        let officeNumber = this.getOfficeNumber();

        let html = fs.readFileSync('./templates/manager.html', 'utf8');
        return (eval('`'+html+'`'));
    }
}

module.exports = Manager;