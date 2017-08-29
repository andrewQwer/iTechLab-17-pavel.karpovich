import { UIActionTypes } from "../index";

export const showError = code => {
	return dispatch => {
		dispatch({
			type: UIActionTypes.SHOW_ERROR,
			payload: {
				errorCode: code
			}
		});
	};
};

export const getErrorFromServer = msg => {
	return dispatch => {
		dispatch(hideLoading());
		dispatch({
			type: UIActionTypes.GET_ERROR_FROM_SERVER,
			payload: {
				msg
			}
		});
	};
};

export const hideError = () => {
	return dispatch => {
		dispatch({
			type: UIActionTypes.HIDE_ERROR
		});
	};
};

export const showNotification = msg => {
	return dispatch => {
		dispatch({
			type: UIActionTypes.SHOW_NOTIFICATION,
			payload: {
				message: msg
			}
		});
	};
};

export const hideNotification = () => {
	return dispatch => {
		dispatch({
			type: UIActionTypes.HIDE_NOTIFICATION
		});
	};
};

export const showLoading = () => {
	return dispatch => {
		dispatch({
			type: UIActionTypes.SHOW_LOADING
		});
	};
};

export const hideLoading = () => {
	return dispatch => {
		dispatch({
			type: UIActionTypes.HIDE_LOADING
		});
	};
};
