import Immutable from "immutable";
import { UIActionTypes } from "../index";

let initialState = {
	errorCode: null,
	notification: null,
	loading: false
};

export default function UIReducer(state = initialState, action) {
	switch (action.type) {
		case UIActionTypes.SHOW_ERROR: {
			return Immutable.fromJS(state)
				.set("errorCode", action.payload.errorCode)
				.toJS();
		}
		case UIActionTypes.HIDE_ERROR: {
			return Immutable.fromJS(state).set("errorCode", null).toJS();
		}
		case UIActionTypes.SHOW_NOTIFICATION: {
			return Immutable.fromJS(state)
				.set("notification", action.payload.message)
				.toJS();
		}
		case UIActionTypes.HIDE_NOTIFICATION: {
			return Immutable.fromJS(state).set("notification", null).toJS();
		}
		case UIActionTypes.SHOW_LOADING: {
			return Immutable.fromJS(state).set("loading", true).toJS();
		}
		case UIActionTypes.HIDE_LOADING: {
			return Immutable.fromJS(state).set("loading", false).toJS();
		}
		default:
			return state;
	}
}
