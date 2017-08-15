import { ErrorActionTypes } from "../index";

let initialState = {
	errorCode: null,
	errors: []
};

export default function ErrorReducer(state = initialState, action) {
	switch (action.type) {
		case ErrorActionTypes.SHOW_ERROR: {
			return {
				errorCode: action.payload.errorCode,
				errors: [...state.errors]
			};
		}
		case ErrorActionTypes.HIDE_ERROR: {
			return {
				errorCode: null,
				errors: [...state.errors]
			};
		}
		default:
			return state;
	}
}
