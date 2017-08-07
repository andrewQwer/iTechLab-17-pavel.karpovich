import {
	REGISTER_USER,
	LOGIN_IN_USER,
	LOG_OUT_USER,
	ADD_IP_TO_USER,
	EDIT_USER_IP
} from "../constants/user";

export const registerUser = (login, pass, firstName, lastName, email) => ({
	type: REGISTER_USER,
	login,
	pass,
	email,
	firstName,
	lastName
});

export const loginInUser = (login, pass) => ({
	type: LOGIN_IN_USER,
	login,
	pass
});

export const logOutUser = () => ({
	type: LOG_OUT_USER
});

