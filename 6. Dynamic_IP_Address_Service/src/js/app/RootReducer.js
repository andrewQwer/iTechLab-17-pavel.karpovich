import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import { UserReducer as user } from "../user";
import { UIReducer as ui } from "../ui";
import { ProfileReducer as profile } from "../profile";

const RootReducer = combineReducers({
	user,
	ui,
	profile
});

export default RootReducer;
