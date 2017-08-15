import { IpActionTypes } from "../index";
import { GenUUID, SaltedHash } from "../../app";

const initialState = {
	ips: []
};

export default function ipReducer(state = initialState, action) {
	switch (action.type) {
		case IpActionTypes.ADD_IP_TO_USER:
			return {
				ips: [
					...state.ips,
					{
						uuid: action.payload.uuid,
						ownerUuid: action.payload.ownerId,
						ip: action.payload.ip,
						domain: action.payload.domain,
						updateDate: action.payload.updateDate
					}
				]
			};
		case IpActionTypes.EDIT_USER_IP:
			return {
				ips: state.ips.map(item => {
					if (item.uuid === action.payload.uuid)
						return {
							...item,
							ip: action.payload.ip,
							domain: action.payload.domain,
							updateDate: action.payload.updateDate
						};
					return item;
				})
			};
		case IpActionTypes.DELETE_USER_IP:
			return {
				ips: state.ips.filter(item => item.uuid !== action.payload.uuid)
			};
		default:
			return state;
	}
}

export function GetUserDomainCount(state, uuid) {
	return state.reduce((count, current) => {
		return current.ownerUuid == uuid ? ++count : count;
	}, 0);
}
