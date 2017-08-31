import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import App from "./js";
import { ConfigureStore, initial } from "./js/app";

let store = ConfigureStore();

render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById("root")
);