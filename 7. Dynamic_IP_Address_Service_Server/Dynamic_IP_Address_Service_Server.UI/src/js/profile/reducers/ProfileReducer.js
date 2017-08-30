import Immutable from "immutable";
import { ProfileActionTypes } from "../index";

const initialState = {
    showProfile: null,
    ips: []
};

export default function ProfileReducer(state = initialState, action) {
    switch (action.type) {
        case ProfileActionTypes.GET_USER_INFO_BY_LOGIN:
            return Immutable.fromJS(state)
                .set("showProfile", action.payload.user)
                .toJS();
        case ProfileActionTypes.CLEAR_USER_INFO:
            return Immutable.fromJS(state)
                .set("showProfile", null)
                .set("ips", [])
                .toJS();
        case ProfileActionTypes.GET_USER_IP_BY_LOGIN:
            return Immutable.fromJS(state).set("ips", action.payload.userIps).toJS();
        case ProfileActionTypes.ADD_IP:
            return Immutable.fromJS(state)
                .updateIn(["ips"], arr => arr.push(Immutable.Map(action.payload.ip)))
                .toJS();
        case ProfileActionTypes.EDIT_IP:
            return Immutable.fromJS(state)
                .set(
                "ips",
                state.ips.map(item => {
                    if (item.id === action.payload.uuid)
                        return {
                            ...item,
                            ip: action.payload.ip,
                            domain: action.payload.domain,
                            updateDate: action.payload.updateDate
                        };
                    return item;
                })
                )
                .toJS();
        case ProfileActionTypes.DELETE_IP:
            return Immutable.fromJS(state)
                .set("ips", state.ips.filter(item => item.id !== action.payload.uuid))
                .toJS();
        default:
            return state;
    }
}