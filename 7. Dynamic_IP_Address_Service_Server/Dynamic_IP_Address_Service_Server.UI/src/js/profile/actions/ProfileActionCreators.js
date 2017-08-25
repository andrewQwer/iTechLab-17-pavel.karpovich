import axios from "axios";
import { ProfileActionTypes } from "../index";
import { UIActionCreators, ErrorCodes } from "../../ui";
import { GenUUID } from "../../app";

function CheckIpAddress(ip) {
	let ext = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
	return ext.test(ip);
}

export const getUserByLogin = login => {
	return dispatch => {
		dispatch(UIActionCreators.showLoading());
		axios
			.get("http://localhost:20791/api/user/getUserInfoByLogin", {
				params: {
					login
				}
			})
			.then(result => {
				const {
					uuid,
					login,
					email,
					firstName,
					lastName,
					type
				} = result.data.user;
				dispatch({
					type: ProfileActionTypes.GET_USER_INFO_BY_LOGIN,
					payload: {
						user: {
							uuid,
							login,
							email,
							firstName,
							lastName,
							type
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
			.get("http://localhost:3000/getUserIpByLogin", {
				params: {
					login
				}
			})
			.then(result => {
				dispatch({
					type: ProfileActionTypes.GET_USER_IP_BY_LOGIN,
					payload:
						result.data.userIps.length !== 0
							? {
									userIps: result.data.userIps
								}
							: {
									userIps: []
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
			axios
				.post("http://localhost:3000/checkIpOnDuplicate", {
					params: {
						domain
					}
				})
				.then(
					result => {
						let uuid = GenUUID();
						let updateDate = new Date();
						axios
							.post("http://localhost:3000/addIp", {
								params: {
									ip: {
										uuid,
										ownerId,
										ip,
										domain,
										updateDate
									}
								}
							})
							.then(result => {
								dispatch({
									type: ProfileActionTypes.ADD_IP,
									payload: {
										ip: {
											uuid,
											ownerId,
											ip,
											domain,
											updateDate
										}
									}
								});
								dispatch(UIActionCreators.hideLoading());
							});
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
				.post("http://localhost:3000/editIp", {
					params: {
						uuid,
						domain,
						ip,
						updateDate: new Date()
					}
				})
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
			.post("http://localhost:3000/deleteIp", {
				params: {
					uuid
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
