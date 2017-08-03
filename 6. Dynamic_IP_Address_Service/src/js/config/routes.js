import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { configureStore } from "../store/configureStore";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Register from "../components/register";
import Login from "../components/loginIn";

let store = configureStore();

const routes = (
	<Provider store={store}>
		<BrowserRouter>
			<Switch>
				<Route exact path="/" component={Login} />
				<Route path="/register" component={Register} />
			</Switch>
		</BrowserRouter>
	</Provider>
);

export default routes;