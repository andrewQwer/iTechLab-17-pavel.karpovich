import { IpActionTypes } from "../index";

export const addIpToUser = (ownerId, ip, domain) => ({
	type: IpActionTypes.ADD_IP_TO_USER,
	ownerId,
	ip,
	domain
});

export const editUserIp = (uuid, ip, domain) => ({
	type: IpActionTypes.EDIT_USER_IP,
	uuid,
	ip,
	domain
});

export const deleteUserIp = uuid => ({
	type: IpActionTypes.DELETE_USER_IP,
	uuid
});
