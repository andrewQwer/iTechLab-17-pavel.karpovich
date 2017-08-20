import Immutable from "immutable";
import { AdminActionTypes } from "../index";
import { Admin, SimpleUser, PremiumUser } from "../../user";

const initialState = {
	users: [],
	bin: []
};

export default function AdminReducer(state = initialState, action) {
	switch (action.type) {
		case AdminActionTypes.GET_ALL_USERS:
			return Immutable.fromJS(state).set("users", action.payload.users).toJS();
		case AdminActionTypes.GET_PREMIUM_ACCESS:
			return Immutable.fromJS(state)
				.set(
					"users",
					state.users.map(item => {
						if (action.payload.uuids.includes(item.uuid)) {
							item.type =
								item.type === new SimpleUser().GetType()
									? new PremiumUser().GetType()
									: new SimpleUser().GetType();
							return item;
						} else {
							return item;
						}
					})
				)
				.toJS();
		case AdminActionTypes.MOVE_TO_BIN:
			let addedUser = state.users.filter(item =>
				action.payload.uuids.includes(item.uuid)
			);
			return Immutable.fromJS(state)
				.set(
					"users",
					state.users.filter(item => !action.payload.uuids.includes(item.uuid))
				)
				.set("bin", state.bin.concat(addedUser))
				.toJS();
		case AdminActionTypes.DELETE_USER_FROM_BIN:
			return Immutable.fromJS(state)
				.set(
					"bin",
					state.bin.filter(item => !action.payload.uuids.includes(item.uuid))
				)
				.toJS();
		case AdminActionTypes.GET_ALL_USERS_IN_BIN:
			return Immutable.fromJS(state).set("bin", action.payload.users).toJS();
		case AdminActionTypes.RESTORE_USER_FROM_BIN:
			let restoredUsers = state.bin.filter(item =>
				action.payload.uuids.includes(item.uuid)
			);
			return Immutable.fromJS(state)
				.set("users", state.users.concat(restoredUsers))
				.set(
					"bin",
					state.bin.filter(item => !action.payload.uuids.includes(item.uuid))
				)
				.toJS();
		default:
			return state;
	}
}
