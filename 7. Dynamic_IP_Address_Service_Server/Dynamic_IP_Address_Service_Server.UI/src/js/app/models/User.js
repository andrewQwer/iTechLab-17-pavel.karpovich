export default class User {
    constructor(login, email, firstName, lastName, pass) {
        this.login = login;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.pass = pass;
        this.isInBin = false;
    }
}