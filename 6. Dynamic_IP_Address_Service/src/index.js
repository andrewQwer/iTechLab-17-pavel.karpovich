import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import App from "./js/containers/app";
import HomePage from "./js/components/pages/home";
import Login from "./js/components/loginIn";
import Registration from "./js/components/register";
import { configureStore } from "./js/store/configureStore";
import { BrowserRouter, Route, Switch } from "react-router-dom";

const store = configureStore();

render(
	<Provider store={store}>
		<BrowserRouter>
			<Switch>
				<Route exact path="/" component={HomePage} />
				<Route path="/register" component={Registration} />
				<Route path="/login" component={Login} />
			</Switch>
		</BrowserRouter>
	</Provider>,
	document.getElementById("root")
);
