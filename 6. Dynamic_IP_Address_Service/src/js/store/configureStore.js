import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducers";
import { createLogger } from "redux-logger";

export const configureStore = initialStore =>
	createStore(rootReducer, initialStore, applyMiddleware(createLogger()));
