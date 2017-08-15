import { ErrorActionTypes } from "../index";

export const showError = code => ({
	type: ErrorActionTypes.SHOW_ERROR,
	payload: {
		errorCode: code
	}
});

export const hideError = () => ({
	type: ErrorActionTypes.HIDE_ERROR
})