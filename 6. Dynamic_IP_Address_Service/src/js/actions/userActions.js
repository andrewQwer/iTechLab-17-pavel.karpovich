import {
	REGISTER_USER,
	LOGIN_IN_USER,
	LOG_OUT_USER,
	ADD_IP_TO_USER,
	EDIT_USER_IP,
	ADD_USER_TO_BASKET,
	DELETE_USER_FROM_BIN,
	RESTORE_USER_FROM_BIN,
	GET_PREMIUM_ACCESS
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

export const addUserToBasket = (uuids) => ({
	type: ADD_USER_TO_BASKET,
	uuids
})

export const deleteUserFromBin = (uuids) => ({
	type: DELETE_USER_FROM_BIN,
	uuids
}) 

export const restoreUserFromBin = (uuids) => ({
	type: RESTORE_USER_FROM_BIN,
	uuids
})

export const getPremiumAccess = (uuids) => ({
	type: GET_PREMIUM_ACCESS,
	uuids
})