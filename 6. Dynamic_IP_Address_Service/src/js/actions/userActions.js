import {REGISTER_USER} from "../constants/user";

export const registerUser = (login, pass, firstName, lastName, email) => ({
	type: REGISTER_USER,
	login: login,
	pass: pass,
	email: email,
	firstName: firstName,
	lastName: lastName
});
