import { ADD_IP_TO_USER, EDIT_USER_IP } from "../constants/ip";
import SaltedHash from "../helpers/Hashing/saltedHash";
import { GenUUID } from "../helpers/uuid";

const initialState = {
	ips: []
};

export default function users(state = initialState, action) {
	switch (action.type) {
		case ADD_IP_TO_USER:
			return {
				ips: [
					...state.ips,
					{
						uuid: GenUUID(),
						ownerUuid: action.ownerId,
						ip: action.ip,
						domain: action.domain
					}
				]
			};
		case EDIT_USER_IP:
			return {
				ips: state.ips.map(item => {
					if (item.uuid === action.uuid)
						return {
							...item,
							ip: action.ip,
							domain: action.domain
						};
					return item;
				})
			};
		default:
			return state;
	}
}
