import {ADD_IP_TO_USER, EDIT_USER_IP, DELETE_USER_IP} from "../constants/ip"

export const addIpToUser = (ownerId ,ip, domain) => ({
	type: ADD_IP_TO_USER,
	ownerId,
	ip,
	domain
});

export const editUserIp = (uuid, ip, domain) => ({
	type: EDIT_USER_IP,
	uuid,
	ip,
	domain
});

export const deleteUserIp = (uuid) => ({
	type: DELETE_USER_IP,
	uuid
})
