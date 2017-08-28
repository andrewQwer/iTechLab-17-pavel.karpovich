import axios from "axios";
import { ProfileActionTypes } from "../index";
import { UIActionCreators, ErrorCodes } from "../../ui";
import { GenUUID, AppConsts } from "../../app";
import { Role } from "../../user";

function CheckIpAddress(ip) {
	let ext = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
	return ext.test(ip);
}

const headers = {
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json",
		"Access-Control-Allow-Origin": "*"
	}
};

export const getUserByLogin = login => {
	return dispatch => {
		dispatch(UIActionCreators.showLoading());
		axios
			.get(`${AppConsts.SERVER_ADDRESS}/api/user/getUserInfo`, {
				params: {
					login
				}
			})
			.then(result => {
				const { id, login, email, firstName, lastName, role } = JSON.parse(
					result.data
				);
				dispatch({
					type: ProfileActionTypes.GET_USER_INFO_BY_LOGIN,
					payload: {
						user: {
							uuid: id,
							login,
							email,
							firstName,
							role: new Role(role.name, role.domainCount),
							lastName
						}
					}
				});
				dispatch(UIActionCreators.hideLoading());
			});
	};
};

export const clearUserInfo = () => {
	return dispatch => {
		dispatch({
			type: ProfileActionTypes.CLEAR_USER_INFO
		});
	};
};

export const getUserIpByLogin = login => {
	return dispatch => {
		dispatch(UIActionCreators.showLoading());
		axios
			.get(`${AppConsts.SERVER_ADDRESS}/api/user/GetUserDomains`, {
				params: {
					login
				}
			})
			.then(result => {
				let domains = result.data != "null" ? JSON.parse(result.data) : [];
				dispatch({
					type: ProfileActionTypes.GET_USER_IP_BY_LOGIN,
					payload: {
						userIps: domains
					}
				});
				dispatch(UIActionCreators.hideLoading());
			});
	};
};

export const addIp = (ip, domain) => {
	const { user, profile } = store.getState();
	let ownerId = user.uuid;
	let ips = profile.ips;
	return dispatch => {
		dispatch(UIActionCreators.showLoading());
		if (CheckIpAddress(ip)) {
			let domainDto = JSON.stringify({
				Ip: ip,
				Domain: domain,
				Login: user.login
			});
			axios
				.post(`${AppConsts.SERVER_ADDRESS}/api/domain/add/`, domainDto, headers)
				.then(
					result => {
						let obj = JSON.parse(result.data);
						const { domain, ip, updateDate, owner: owner } = obj;
						dispatch({
							type: ProfileActionTypes.ADD_IP,
							payload: {
								ip: {
									id: obj.id,
									ownerId: owner.id,
									ip,
									domain,
									updateDate
								}
							}
						});
						dispatch(UIActionCreators.hideLoading());
					},
					error => {
						dispatch(UIActionCreators.hideLoading());
						dispatch(UIActionCreators.showError(ErrorCodes.DOMAIN_UNAVAILABLE));
					}
				);
		} else {
			dispatch(UIActionCreators.hideLoading());
			dispatch(UIActionCreators.showError(ErrorCodes.INCORRECT_IP_ADDRESS));
		}
	};
};

export const editIp = (uuid, domain, ip) => {
	return dispatch => {
		dispatch(UIActionCreators.showLoading());
		if (CheckIpAddress(ip)) {
			axios
				.post(
					`${AppConsts.SERVER_ADDRESS}/api/domain/edit`,
					JSON.stringify({
						id: uuid,
						domain,
						ip
					}),
					headers
				)
				.then(result => {
					dispatch({
						type: ProfileActionTypes.EDIT_IP,
						payload: {
							uuid,
							domain,
							ip,
							updateDate: new Date()
						}
					});
					dispatch(UIActionCreators.hideLoading());
				});
		} else {
			dispatch(UIActionCreators.hideLoading());
			dispatch(UIActionCreators.showError(ErrorCodes.INCORRECT_IP_ADDRESS));
		}
	};
};

export const deleteIp = uuid => {
	return dispatch => {
		dispatch(UIActionCreators.showLoading());
		axios
			.delete(`${AppConsts.SERVER_ADDRESS}/api/domain/delete`, {
				params: {
					id: uuid
				}
			})
			.then(result => {
				dispatch({
					type: ProfileActionTypes.DELETE_IP,
					payload: {
						uuid
					}
				});
				dispatch(UIActionCreators.hideLoading());
			});
	};
};
