import {
	REGISTER_USER,
	LOGIN_IN_USER,
	LOG_OUT_USER,
	ADD_USER_TO_BASKET,
	DELETE_USER_FROM_BIN,
	RESTORE_USER_FROM_BIN
} from "../constants/user";
import SimpleUser from "../models/userType/SimpleUser";
import SaltedHash from "../helpers/Hashing/saltedHash";
import { GenUUID } from "../helpers/uuid";

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
		case REGISTER_USER:
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
					]
				};
			} else {
				alert("This user already registered!");
				return state;
			}
		case LOGIN_IN_USER:
			let user = state.users.find(
				item =>
					item.login == action.login &&
					SaltedHash.Verify(action.pass, item.hash, item.salt)
			);
			console.log(user)
			if (!!!user) {
				alert("Incorrect login or password!");
				return state;
			}
			return {
				uuid: user.uuid,
				isLogin: true,
				users: [...state.users]
			};
		case LOG_OUT_USER:
			return {
				uuid: null,
				isLogin: false,
				users: [...state.users]
			};
		case ADD_USER_TO_BASKET:
			let addedUser = state.users.filter(item =>
				action.uuids.includes(item.uuid)
			);
			return {
				...state,
				users: state.users.filter(item => !action.uuids.includes(item.uuid)),
				basket: state.basket.concat(addedUser)
			};
		case DELETE_USER_FROM_BIN:
			return {
				...state,
				basket: state.basket.filter(item => !action.uuids.includes(item.uuid))
			};
		case RESTORE_USER_FROM_BIN:
			let restoredUsers = state.basket.filter(item =>
				action.uuids.includes(item.uuid)
			);
			return {
				...state,
				users: state.users.concat(restoredUsers),
				basket: state.basket.filter(item => !action.uuids.includes(item.uuid))
			};
		default:
			return state;
	}
}

export function GetUserById(state, id) {
	return state.users.find(item => item.uuid === id);
}
