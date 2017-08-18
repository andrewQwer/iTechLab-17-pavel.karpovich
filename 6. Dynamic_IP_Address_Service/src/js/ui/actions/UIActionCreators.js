import { UIActionTypes } from "../index";

export const showError = code => ({
	type: UIActionTypes.SHOW_ERROR,
	payload: {
		errorCode: code
	}
});

export const hideError = () => ({
	type: UIActionTypes.HIDE_ERROR
});

export const showNotification = msg => ({
	type: UIActionTypes.SHOW_NOTIFICATION,
	payload: {
		message: msg
	}
});

export const hideNotification = () => ({
	type: UIActionTypes.HIDE_NOTIFICATION
});

export const showLoading = () => ({
	type: UIActionTypes.SHOW_LOADING
});

export const hideLoading = () => ({
	type: UIActionTypes.HIDE_LOADING
});
