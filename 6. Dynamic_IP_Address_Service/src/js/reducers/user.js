import {
	REGISTER_USER,
	LOGIN_IN_USER,
	LOGIN_OUT_USER
} from "../constants/user";
import SaltedHash from "../Helpers/Hashing/saltedHash";
import { GenUUID } from "../Helpers/uuid";

const initialState = {
	uuid: null,
	isLoginIn: false,
	users: []
};

export default function users(state = initialState, action) {
	switch (action.type) {
		case REGISTER_USER:
			//TODO: check for uniqueness, check fields
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
						isLoginIn: true,
						users: [...state.users]
					}
				: state;
		case LOGIN_OUT_USER:
			return {
				uuid: null,
				isLoginIn: false,
				users: [...state.users]
			};
		default:
			return state;
	}
}
