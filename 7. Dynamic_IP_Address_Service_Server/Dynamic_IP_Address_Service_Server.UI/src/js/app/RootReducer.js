import { combineReducers } from "redux";
import { UserReducer as user } from "../user";
import { UIReducer as ui } from "../ui";
import { ProfileReducer as profile } from "../profile";
import { AdminReducer as admin } from "../admin";

const RootReducer = combineReducers({
    user,
    ui,
    profile,
    admin
});

export default RootReducer;