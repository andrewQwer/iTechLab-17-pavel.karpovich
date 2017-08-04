import {
	REGISTER_USER,
	LOGIN_IN_USER,
	LOG_OUT_USER
} from "../constants/user";

export const registerUser = (login, pass, firstName, lastName, email) => ({
	type: REGISTER_USER,
	login: login,
	pass: pass,
	email: email,
	firstName: firstName,
	lastName: lastName
});

export const loginInUser = (login, pass) => ({
	type: LOGIN_IN_USER,
	login: login,
	pass: pass
});

export const logOutUser = () => ({
	type: LOG_OUT_USER
});
