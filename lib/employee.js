class Employee {
    constructor (name='', id=1, email='') {
        if (typeof id !== 'number'  || id <= 0) {
            throw new Error("'id' must be a valid employee ID (positive number)");
        }
        if (typeof name !== 'string') {
            throw new Error("'name' must be a valid string");
        }

        if (typeof email !== 'string') {
            throw new Error("'email' must be a valid string");
        }
                
        this.id = id;
        this.name = name;
        this.email = email;

    }

    printInfo () {
        console.log( `id: ${this.id}`);
        console.log( `name: ${this.name}`);
        console.log( `email: ${this.email}`);
    }

    getName() {
        return this.name;
    }

    getId() {
        return this.id;
    }

    getEmail() {
        return this.email;
    }

    getRole() {
        return "Employee";
    }
}

module.exports = Employee;