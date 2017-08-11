import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducers";
import { createLogger } from "redux-logger";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const configureStore = initialStore =>
	createStore(
		rootReducer,
		initialStore,
		composeEnhancers(applyMiddleware(createLogger()))
	);
