import {
	REGISTER_USER,
	LOGIN_IN_USER,
	LOG_OUT_USER
} from "../constants/user";
import SaltedHash from "../helpers/Hashing/saltedHash";
import { GenUUID } from "../helpers/uuid";
import { browserHistory } from "react-router"

const initialState = {
	uuid: null,
	isLogin: true,
	users: []
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
						type: "user", //TODO: change to class
						email: action.email,
						firstName: action.firstName,
						lastName: action.lastName
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
		default:
			return state;
	}
}
