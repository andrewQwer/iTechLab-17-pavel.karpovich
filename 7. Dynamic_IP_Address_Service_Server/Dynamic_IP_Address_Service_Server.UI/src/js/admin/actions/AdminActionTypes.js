import keyMirror from "keymirror";

export const AdminActionTypes = keyMirror({
	GET_ALL_USERS: null,
	GET_ALL_USERS_IN_BIN: null,
	GET_PREMIUM_ACCESS: null,
	MOVE_TO_BIN: null,
	DELETE_USER_FROM_BIN: null,
	RESTORE_USER_FROM_BIN: null
});