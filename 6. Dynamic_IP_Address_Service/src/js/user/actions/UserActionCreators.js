import { UserActionTypes } from "../index";

export const registerUser = (login, pass, firstName, lastName, email) => ({
	type: UserActionTypes.REGISTER_USER,
	login,
	pass,
	email,
	firstName,
	lastName
});

export const loginInUser = (login, pass) => ({
	type: UserActionTypes.LOGIN_IN_USER,
	login,
	pass
});

export const logOutUser = () => ({
	type: UserActionTypes.LOG_OUT_USER
});

export const addUserToBasket = uuids => ({
	type: UserActionTypes.ADD_USER_TO_BASKET,
	uuids
});

export const deleteUserFromBin = uuids => ({
	type: UserActionTypes.DELETE_USER_FROM_BIN,
	uuids
});

export const restoreUserFromBin = uuids => ({
	type: UserActionTypes.RESTORE_USER_FROM_BIN,
	uuids
});

export const getPremiumAccess = uuids => ({
	type: UserActionTypes.GET_PREMIUM_ACCESS,
	uuids
});
