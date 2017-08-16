import Immutable from "immutable";
import { ErrorActionTypes } from "../index";

let initialState = {
	errorCode: null
};

export default function ErrorReducer(state = initialState, action) {
	switch (action.type) {
		case ErrorActionTypes.SHOW_ERROR: {
			return Immutable.fromJS(state)
				.set("errorCode", action.payload.errorCode)
				.toJS();
		}
		case ErrorActionTypes.HIDE_ERROR: {
			return Immutable.fromJS(state).set("errorCode", null).toJS();
		}
		default:
			return state;
	}
}
