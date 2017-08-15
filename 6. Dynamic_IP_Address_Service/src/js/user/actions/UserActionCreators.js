import { UserActionTypes } from "../index";
import { SaltedHash, GenUUID } from "../../app";
import { ErrorActionCreators, ErrorCodes } from "../../error";

const checkUserForUniq = (users, login, email) => {
	return !!!users.find(item => item.login === login || item.email == email);
};

export const registerUser = (login, pass, firstName, lastName, email) => {
	let users = store.getState().user.users;
	return dispatch => {
		if (checkUserForUniq(users, login, email)) {
			let saltHash = new SaltedHash(pass);
			dispatch({
				type: UserActionTypes.REGISTER_USER,
				payload: {
					uuid: GenUUID(),
					login,
					hash: saltHash.GetHash(),
					salt: saltHash.GetSalt(),
					email,
					firstName,
					lastName
				}
			});
		} else {
			dispatch(
				ErrorActionCreators.showError(
					ErrorCodes.REGISTER_LOGIN_OR_EMAIL_UNAVAILABLE
				)
			);
		}
	};
};

export const loginInUser = (login, pass) => {
	let user = store
		.getState()
		.user.users.find(
			item =>
				item.login === login && SaltedHash.Verify(pass, item.hash, item.salt)
		);
	return dispatch => {
		if (!!user) {
			dispatch({
				type: UserActionTypes.LOGIN_IN_USER,
				payload: {
					uuid: user.uuid
				}
			});
		} else {
			dispatch(
				ErrorActionCreators.showError(ErrorCodes.INCORRECT_LOGIN_OR_PASSWORD)
			);
		}
	};
};

export const logOutUser = () => {
	return dispatch => {
		dispatch({
			type: UserActionTypes.LOG_OUT_USER
		});
	};
};

export const addUserToBasket = uuids => {
	return dispatch => {
		dispatch({
			type: UserActionTypes.ADD_USER_TO_BASKET,
			payload: {
				uuids
			}
		});
	};
};

export const deleteUserFromBin = uuids => {
	return dispatch => {
		dispatch({
			type: UserActionTypes.DELETE_USER_FROM_BIN,
			payload: {
				uuids
			}
		});
	};
};

export const restoreUserFromBin = uuids => {
	return dispatch => {
		dispatch({
			type: UserActionTypes.RESTORE_USER_FROM_BIN,
			payload: {
				uuids
			}
		});
	};
};

export const getPremiumAccess = uuids => {
	return dispatch => {
		dispatch({
			type: UserActionTypes.GET_PREMIUM_ACCESS,
			payload: {
				uuids
			}
		});
	};
};
