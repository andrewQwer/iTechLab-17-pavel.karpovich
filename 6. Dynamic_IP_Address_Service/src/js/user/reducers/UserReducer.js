import { SimpleUser, PremiumUser, Admin, UserActionTypes } from "../index";
import { GenUUID, SaltedHash } from "../../app";
import Immutable from "immutable";

const initialState = Immutable.fromJS({
	uuid: null,
	users: [],
	basket: []
});

export default function users(state = initialState, action) {
	switch (action.type) {
		case UserActionTypes.REGISTER_USER:
			return Immutable.fromJS(state)
				.updateIn(["users"], arr =>
					arr.push(
						Immutable.Map({
							uuid: action.payload.uuid,
							login: action.payload.login,
							hash: action.payload.hash,
							salt: action.payload.salt,
							type: new SimpleUser(),
							email: action.payload.email,
							firstName: action.payload.firstName,
							lastName: action.payload.lastName
						})
					)
				)
				.toJS();
		case UserActionTypes.LOGIN_IN_USER:
			return Immutable.fromJS(state).set("uuid", action.payload.uuid).toJS();
		case UserActionTypes.LOG_OUT_USER:
			return Immutable.fromJS(state).set("uuid", null).toJS();
		case UserActionTypes.ADD_USER_TO_BASKET:
			let addedUser = state.users.filter(item =>
				action.payload.uuids.includes(item.uuid)
			);
			return Immutable.fromJS(state)
				.set(
					"users",
					state.users.filter(item => !action.payload.uuids.includes(item.uuid))
				)
				.set("basket", state.basket.concat(addedUser))
				.toJS();
		case UserActionTypes.DELETE_USER_FROM_BIN:
			return Immutable.fromJS(state)
				.set(
					"basket",
					state.basket.filter(item => !action.payload.uuids.includes(item.uuid))
				)
				.toJS();
		case UserActionTypes.RESTORE_USER_FROM_BIN:
			let restoredUsers = state.basket.filter(item =>
				action.payload.uuids.includes(item.uuid)
			);
			return Immutable.fromJS(state)
				.set("users", state.users.concat(restoredUsers))
				.set(
					"basket",
					state.basket.filter(item => !action.payload.uuids.includes(item.uuid))
				)
				.toJS();
		case UserActionTypes.GET_PREMIUM_ACCESS:
			return Immutable.fromJS(state)
				.set(
					"users",
					state.users.map(item => {
						if (action.payload.uuids.includes(item.uuid)) {
							item.type =
								item.type.GetType() === new SimpleUser().GetType()
									? new PremiumUser()
									: new SimpleUser();
							return item;
						} else {
							return item;
						}
					})
				)
				.toJS();
		default:
			return state;
	}
}

export function GetUserById(state, id) {
	return state.users.find(item => item.uuid === id);
}
