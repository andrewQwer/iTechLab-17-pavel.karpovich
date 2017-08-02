import { REGISTER_USER } from "../constants/user";
import SaltedHash from "../Helpers/Hashing/saltedHash";

const initialState = {
	id: -1,
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
						id:
							state.users.reduce(
								(maxId, item) => Math.max(maxId, item.id),
								-1
							) + 1,
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
		default:
			return state;
	}
}
