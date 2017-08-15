import { IpActionTypes } from "../index";
import { GenUUID, SaltedHash } from "../../app";

const initialState = {
	ips: []
};

//BUG: save edit item without changing
//TODO: move to action creator
function CheckOnDuplicate(array, domain) {
	let isDuplicate = array.find(item => item.domain === domain) !== undefined;
	if (isDuplicate) alert("This domain is not available!");
	return isDuplicate;
}

//TODO: move to action creator
function CheckIpAddress(ip) {
	let ext = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
	let isValidIp = ext.test(ip);
	if (!isValidIp) alert("Invalid ip address!");
	return isValidIp;
}

export default function ipReducer(state = initialState, action) {
	switch (action.type) {
		case IpActionTypes.ADD_IP_TO_USER:
			if (
				!CheckOnDuplicate(state.ips, action.domain) &&
				CheckIpAddress(action.ip)
			) {
				return {
					ips: [
						...state.ips,
						{
							uuid: GenUUID(),
							ownerUuid: action.ownerId,
							ip: action.ip,
							domain: action.domain,
							updateDate: new Date()
						}
					]
				};
			}
			break;
		case IpActionTypes.EDIT_USER_IP:
			if (CheckIpAddress(action.ip)) {
				return {
					ips: state.ips.map(item => {
						if (item.uuid === action.uuid)
							return {
								...item,
								ip: action.ip,
								domain: action.domain,
								updateDate: new Date()
							};
						return item;
					})
				};
			}
		case IpActionTypes.DELETE_USER_IP:
			return {
				ips: state.ips.filter(item => item.uuid !== action.uuid)
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
