import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import { UserReducer as user } from "../user";
import { IpReducer as ip } from "../ip";
import { ErrorReducer as error } from "../error";

const RootReducer = combineReducers({
	user,
	ip,
	error
});

export default RootReducer;
