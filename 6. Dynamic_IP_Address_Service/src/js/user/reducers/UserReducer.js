import { SimpleUser, PremiumUser, Admin, UserActionTypes } from "../index";
import { GenUUID, SaltedHash } from "../../app";
import Immutable from "immutable";

const initialState = Immutable.fromJS({
	uuid: null,
	login: null,
	email: null,
	firstName: null,
	lastName: null
});

export default function users(state = initialState, action) {
	switch (action.type) {
		case UserActionTypes.LOGIN_IN_USER:
			const { uuid, login, email, firstName, lastName, type } = action.payload;
			return Immutable.fromJS(state)
				.set("uuid", uuid)
				.set("login", login)
				.set("email", email)
				.set("firstName", firstName)
				.set("lastName", lastName)
				.set("type", type)
				.toJS();
		case UserActionTypes.LOG_OUT_USER:
			return Immutable.fromJS(state)
				.set("uuid", null)
				.set("login", null)
				.set("email", null)
				.set("firstName", null)
				.set("lastName", null)
				.set("type", null)
				.toJS();
		default:
			return state;
	}
}

export function GetUserById(state, id) {
	return state.users.find(item => item.uuid === id);
}
