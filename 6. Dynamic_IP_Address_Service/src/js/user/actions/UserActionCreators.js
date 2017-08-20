import axios from "axios";
import { push } from "react-router-redux";
import { UserActionTypes } from "../index";
import { SaltedHash, GenUUID } from "../../app";
import { SimpleUser, Admin } from "../../user";
import { UIActionCreators, ErrorCodes, NotificationConst } from "../../ui";

const checkUserForUniq = (users, login, email) => {
	return !!!users.find(item => item.login === login || item.email == email);
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
	return dispatch => {
		dispatch(UIActionCreators.showLoading());
		axios
			.post("http://localhost:3000/checkUserForUniq", {
				params: {
					email,
					login
				}
			})
			.then(
				result => {
					let saltHash = new SaltedHash(pass);
					axios
						.post("http://localhost:3000/register", {
							params: {
								user: {
									uuid: GenUUID(),
									login,
									hash: saltHash.GetHash(),
									salt: saltHash.GetSalt(),
									email,
									type: new Admin().GetType(),
									firstName,
									lastName
								}
							}
						})
						.then(result => {
							dispatch(UIActionCreators.hideLoading());
							dispatch(
								UIActionCreators.showNotification(
									NotificationConst.SUCCESS_REGISTRATION
								)
							);
							history.push("/");
						});
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
		axios
			.post("http://localhost:3000/login", {
				params: {
					login,
					pass
				}
			})
			.then(
				result => {
					const {
						uuid,
						login,
						email,
						firstName,
						lastName,
						type
					} = result.data.user;
					dispatch(UIActionCreators.hideLoading());
					dispatch({
						type: UserActionTypes.LOGIN_IN_USER,
						payload: {
							uuid,
							login,
							email,
							firstName,
							type,
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
		axios.post("http://localhost:3000/logOut").then(result => {
			dispatch(UIActionCreators.hideLoading());
			dispatch({
				type: UserActionTypes.LOG_OUT_USER
			});
		});
	};
};
