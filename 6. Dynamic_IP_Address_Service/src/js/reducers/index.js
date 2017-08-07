import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import user from "./user"
import ip from "./ip"

const rootReducer = combineReducers({
	user,
	ip
});

export default rootReducer;