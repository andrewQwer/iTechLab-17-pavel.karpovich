import { SimpleUser, PremiumUser, Admin, UserActionTypes } from "../index";
import { GenUUID, SaltedHash } from "../../app";

const initialState = {
	uuid: null,
	isLogin: false,
	users: [],
	basket: []
};

const checkUserForUniq = (users, login, email) => {
	return !!!users.find(item => item.login === login || item.email == email);
};

export default function users(state = initialState, action) {
	switch (action.type) {
		case UserActionTypes.REGISTER_USER:
			if (checkUserForUniq(state.users, action.login, action.email)) {
				let saltedHash = new SaltedHash(action.pass);
				return {
					...state,
					users: [
						...state.users,
						{
							uuid: GenUUID(),
							login: action.login,
							hash: saltedHash.GetHash(),
							salt: saltedHash.GetSalt(),
							type: new SimpleUser(),
							email: action.email,
							firstName: action.firstName,
							lastName: action.lastName,
							ip: []
						}
					],
					basket: [...state.basket]
				};
			} else {
				alert("This user already registered!");
				return state;
			}
		case UserActionTypes.LOGIN_IN_USER:
			let user = state.users.find(
				item =>
					item.login == action.login &&
					SaltedHash.Verify(action.pass, item.hash, item.salt)
			);
			if (!!!user) {
				alert("Incorrect login or password!");
				return state;
			}
			return {
				uuid: user.uuid,
				isLogin: true,
				users: [...state.users],
				basket: [...state.basket]
			};
		case UserActionTypes.LOG_OUT_USER:
			return {
				uuid: null,
				isLogin: false,
				users: [...state.users],
				basket: [...state.basket]
			};
		case UserActionTypes.ADD_USER_TO_BASKET:
			let addedUser = state.users.filter(item =>
				action.uuids.includes(item.uuid)
			);
			return {
				...state,
				users: state.users.filter(item => !action.uuids.includes(item.uuid)),
				basket: state.basket.concat(addedUser)
			};
		case UserActionTypes.DELETE_USER_FROM_BIN:
			return {
				...state,
				basket: state.basket.filter(item => !action.uuids.includes(item.uuid))
			};
		case UserActionTypes.RESTORE_USER_FROM_BIN:
			let restoredUsers = state.basket.filter(item =>
				action.uuids.includes(item.uuid)
			);
			return {
				...state,
				users: state.users.concat(restoredUsers),
				basket: state.basket.filter(item => !action.uuids.includes(item.uuid))
			};
		case UserActionTypes.GET_PREMIUM_ACCESS:
			return {
				...state,
				users: state.users.map(item => {
					if (action.uuids.includes(item.uuid)) {
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
