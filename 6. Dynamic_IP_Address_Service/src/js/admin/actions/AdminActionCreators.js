import axios from "axios";
import { AdminActionTypes } from "../index";
import { UIActionCreators } from "../../ui";

export const getAllUsers = () => {
	return dispatch => {
		axios.get("http://localhost:3000/getAllUsers").then(result => {
			dispatch({
				type: AdminActionTypes.GET_ALL_USERS,
				payload: {
					users: result.data.users
				}
			});
		});
	};
};

export const getPremiumAccess = uuids => {
	return dispatch => {
		dispatch(UIActionCreators.showLoading());
		axios
			.post("http://localhost:3000/getPremiumAccess", {
				params: {
					uuids
				}
			})
			.then(result => {
				dispatch({
					type: AdminActionTypes.GET_PREMIUM_ACCESS,
					payload: {
						uuids
					}
				});
				dispatch(UIActionCreators.hideLoading());
			});
	};
};

export const moveToBin = uuids => {
	return dispatch => {
		dispatch(UIActionCreators.showLoading());
		axios
			.post("http://localhost:3000/moveToBin", {
				params: {
					uuids
				}
			})
			.then(result => {
				dispatch({
					type: AdminActionTypes.MOVE_TO_BIN,
					payload: {
						uuids
					}
				});
				dispatch(UIActionCreators.hideLoading());
			});
	};
};

export const deleteUserFromBin = uuids => {
	return dispatch => {
		dispatch(UIActionCreators.showLoading());
		axios
			.post("http://localhost:3000/deleteUserFromBin", {
				params: {
					uuids
				}
			})
			.then(result => {
				dispatch({
					type: AdminActionTypes.DELETE_USER_FROM_BIN,
					payload: {
						uuids
					}
				});
				dispatch(UIActionCreators.hideLoading());
			});
	};
};

export const getAllUserInBin = () => {
	return dispatch => {
		dispatch(UIActionCreators.showLoading());
		axios.get("http://localhost:3000/getAllUserInBin").then(result => {
			dispatch({
				type: AdminActionTypes.GET_ALL_USERS_IN_BIN,
				payload: {
					users: result.data.users
				}
			});
			dispatch(UIActionCreators.hideLoading());
		});
	};
};

export const restoreUserFromBin = uuids => {
	return dispatch => {
		dispatch(UIActionCreators.showLoading());
		axios
			.post("http://localhost:3000/restoreUserFromBin", {
				params: {
					uuids
				}
			})
			.then(result => {
				dispatch({
					type: AdminActionTypes.RESTORE_USER_FROM_BIN,
					payload: {
						uuids
					}
				});
				dispatch(UIActionCreators.hideLoading());
			});
	};
};
