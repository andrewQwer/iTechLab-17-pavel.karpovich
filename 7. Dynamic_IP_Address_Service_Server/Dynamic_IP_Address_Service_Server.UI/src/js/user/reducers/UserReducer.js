import { SimpleUser, PremiumUser, Admin, UserActionTypes } from "../index";
import { SaltedHash } from "../../app";
import Immutable from "immutable";

const initialState = Immutable.fromJS({
    uuid: null,
    login: null,
    email: null,
    firstName: null,
    lastName: null
});

export default function users(state = initialState, action) {
    switch (action.type) {
        case UserActionTypes.LOGIN_IN_USER:
            const { uuid, login, email, firstName, lastName, role } = action.payload;
            return Immutable.fromJS(state)
                .set("uuid", uuid)
                .set("login", login)
                .set("email", email)
                .set("firstName", firstName)
                .set("lastName", lastName)
                .set("role", role)
                .toJS();
        case UserActionTypes.LOG_OUT_USER:
            return Immutable.fromJS(state)
                .set("uuid", null)
                .set("login", null)
                .set("email", null)
                .set("firstName", null)
                .set("lastName", null)
                .set("type", role)
                .toJS();
        default:
            return state;
    }
}