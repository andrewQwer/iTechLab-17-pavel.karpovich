import axios from "axios";
import { push } from "react-router-redux";
import { UserActionTypes } from "../index";
import { SaltedHash, GenUUID, User, AppConsts } from "../../app";
import { Role } from "../../user";
import { UIActionCreators, ErrorCodes, NotificationConst } from "../../ui";

const checkUserForUniq = (users, login, email) => {
	return !!!users.find(item => item.login === login || item.email == email);
};

const headers = {
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json",
		"Access-Control-Allow-Origin": "*"
	}
};

export const registerUser = (
	login,
	pass,
	firstName,
	lastName,
	email,
	history
) => {
	let users = store.getState().user.users;
	let user = {
		login: "taller",
		pass: "123456789"
	};
	return dispatch => {
		dispatch(UIActionCreators.showLoading());
		let saltHash = new SaltedHash(pass);
		let newUser = new User(login, email, firstName, lastName, pass);
		let dataFrom = JSON.stringify(user);
		axios
			.post(
				`${AppConsts.SERVER_ADDRESS}/api/user/Registration/`,
				JSON.stringify(newUser),
				headers
			)
			.then(
				result => {
					dispatch(UIActionCreators.hideLoading());
					dispatch(
						UIActionCreators.showNotification(
							NotificationConst.SUCCESS_REGISTRATION
						)
					);
					history.push("/");
				},
				error => {
					dispatch(UIActionCreators.hideLoading());
					dispatch(
						UIActionCreators.showError(
							ErrorCodes.REGISTER_LOGIN_OR_EMAIL_UNAVAILABLE
						)
					);
				}
			);
	};
};

export const loginInUser = (login, pass, history) => {
	return dispatch => {
		dispatch(UIActionCreators.showLoading());
		let authParam = JSON.stringify({
			login,
			pass
		});
		axios.post(`${AppConsts.SERVER_ADDRESS}/api/user/Login/`, authParam, headers).then(
			result => {
				const {
					id,
					login,
					email,
					firstName,
					lastName,
					role
				} = JSON.parse(result.data);
				dispatch(UIActionCreators.hideLoading());
				dispatch({
					type: UserActionTypes.LOGIN_IN_USER,
					payload: {
						uuid: id,
						login,
						email,
						firstName,
						role: new Role(role.name, role.domainCount),
						lastName
					}
				});
				history.push("/");
			},
			error => {
				dispatch(UIActionCreators.hideLoading());
				dispatch(
					UIActionCreators.showError(ErrorCodes.INCORRECT_LOGIN_OR_PASSWORD)
				);
			}
		);
	};
};

export const logOutUser = () => {
	return dispatch => {
		dispatch(UIActionCreators.showLoading());
		axios.post(`${AppConsts.SERVER_ADDRESS}/api/user/logOut`).then(result => {
			dispatch(UIActionCreators.hideLoading());
			dispatch({
				type: UserActionTypes.LOG_OUT_USER
			});
		});
	};
};
