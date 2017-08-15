import { SimpleUser, PremiumUser, Admin, UserActionTypes } from "../index";
import { GenUUID, SaltedHash } from "../../app";

const initialState = {
	uuid: null,
	users: [],
	basket: []
};

export default function users(state = initialState, action) {
	switch (action.type) {
		case UserActionTypes.REGISTER_USER:
			return {
				...state,
				users: [
					...state.users,
					{
						uuid: action.payload.uuid,
						login: action.payload.login,
						hash: action.payload.hash,
						salt: action.payload.salt,
						type: new SimpleUser(),
						email: action.payload.email,
						firstName: action.payload.firstName,
						lastName: action.payload.lastName
					}
				],
				basket: [...state.basket]
			};
		case UserActionTypes.LOGIN_IN_USER:
			return {
				uuid: action.payload.uuid,
				users: [...state.users],
				basket: [...state.basket]
			};
		case UserActionTypes.LOG_OUT_USER:
			return {
				uuid: null,
				users: [...state.users],
				basket: [...state.basket]
			};
		case UserActionTypes.ADD_USER_TO_BASKET:
			let addedUser = state.users.filter(item =>
				action.payload.uuids.includes(item.uuid)
			);
			return {
				...state,
				users: state.users.filter(
					item => !action.payload.uuids.includes(item.uuid)
				),
				basket: state.basket.concat(addedUser)
			};
		case UserActionTypes.DELETE_USER_FROM_BIN:
			return {
				...state,
				basket: state.basket.filter(
					item => !action.payload.uuids.includes(item.uuid)
				)
			};
		case UserActionTypes.RESTORE_USER_FROM_BIN:
			let restoredUsers = state.basket.filter(item =>
				action.payload.uuids.includes(item.uuid)
			);
			return {
				...state,
				users: state.users.concat(restoredUsers),
				basket: state.basket.filter(
					item => !action.payload.uuids.includes(item.uuid)
				)
			};
		case UserActionTypes.GET_PREMIUM_ACCESS:
			return {
				...state,
				users: state.users.map(item => {
					if (action.payload.uuids.includes(item.uuid)) {
						item.type =
							item.type.GetType() === new SimpleUser().GetType()
								? new PremiumUser()
								: new SimpleUser();
						return item;
					} else {
						return item;
					}
					basket: [...state.basket];
				})
			};
		default:
			return state;
	}
}

export function GetUserById(state, id) {
	return state.users.find(item => item.uuid === id);
}
