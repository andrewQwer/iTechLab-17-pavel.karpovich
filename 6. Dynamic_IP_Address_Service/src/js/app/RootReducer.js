import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import { UserReducer as user } from "../user";
import { IpReducer as ip } from "../ip";

const rootReducer = combineReducers({
	user,
	ip
});

export default rootReducer;
