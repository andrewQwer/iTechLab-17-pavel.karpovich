import { createStore, applyMiddleware, compose } from "redux";
import { routerMiddleware } from "react-router-redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import { RootReducer } from "./index";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const ConfigureStore = initialStore =>
    createStore(
        RootReducer,
        initialStore,
        composeEnhancers(applyMiddleware(thunk, createLogger()))
    );