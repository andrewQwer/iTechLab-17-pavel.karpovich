import { IpActionTypes } from "../index";
import { ErrorActionCreators, ErrorCodes } from "../../error";
import { GenUUID } from "../../app";

function CheckIpAddress(ip) {
	let ext = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
	return ext.test(ip);
}

//BUG: save edit item without changing
function CheckOnDuplicate(array, domain) {
	return array.find(item => item.domain === domain) !== undefined;
}

export const addIpToUser = (ownerId, ip, domain) => {
	let ips = store.getState().ip.ips;
	return dispatch => {
		if (CheckOnDuplicate(ips, domain)) {
			dispatch(ErrorActionCreators.showError(ErrorCodes.DOMAIN_UNAVAILABLE));
		} else if (!CheckIpAddress(ip)) {
			dispatch(ErrorActionCreators.showError(ErrorCodes.INCORRECT_IP_ADDRESS));
		} else {
			dispatch({
				type: IpActionTypes.ADD_IP_TO_USER,
				payload: {
					uuid: GenUUID(),
					ownerId,
					ip,
					domain,
					updateDate: new Date()
				}
			});
		}
	};
};

export const editUserIp = (uuid, ip, domain) => {
	return dispatch => {
		if (!CheckIpAddress(ip)) {
			dispatch(ErrorActionCreators(ErrorCodes.INCORRECT_IP_ADDRESS));
		} else {
			dispatch({
				type: IpActionTypes.EDIT_USER_IP,
				payload: {
					uuid,
					ip,
					domain,
					updateDate: new Date()
				}
			});
		}
	};
};

export const deleteUserIp = uuid => {
	return dispatch => {
		dispatch({
			type: IpActionTypes.DELETE_USER_IP,
			payload: {
				uuid
			}
		});
	};
};
