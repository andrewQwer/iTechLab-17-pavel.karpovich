import {
	REGISTER_USER,
	LOGIN_IN_USER,
	LOG_OUT_USER,
	ADD_USER_TO_BASKET
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

export default function users(state = initialState, action) {
	switch (action.type) {
		case REGISTER_USER:
			//TODO: check for uniqueness and fields
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
		case LOGIN_IN_USER:
			let user = state.users.find(
				item =>
					item.login == action.login &&
					SaltedHash.Verify(action.pass, item.hash, item.salt)
			);
			return user
				? {
						uuid: user.uuid,
						isLogin: true,
						users: [...state.users]
					}
				: state;
		case LOG_OUT_USER:
			return {
				uuid: null,
				isLogin: false,
				users: [...state.users]
			};
		case ADD_USER_TO_BASKET:
			let addedUser = state.users.filter(item => action.uuids.includes(item.uuid))
			return {
				...state,
				users: state.users.filter(item => !action.uuids.includes(item.uuid)),
				basket: state.basket.concat(addedUser)
			};
		default:
			return state;
	}
}

export function GetUserById(state, id) {
	return state.users.find(item => item.uuid === id);
}
