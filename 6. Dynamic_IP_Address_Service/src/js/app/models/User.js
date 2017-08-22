import {SaltedHash} from "../index"

export default class User {
	constructor(login, email, firstName, lastName, pass){
		let saltedHash = new SaltedHash(pass);
		this.login = login;
		this.email = email;
		this.firstName = firstName;
		this.lastName = lastName;
		this.hash = saltedHash.GetHash();
		this.salt = saltedHash.GetSalt();
		this.isInBin = false;
	}
}