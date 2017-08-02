import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import App from "./js/containers/app";
import { configureStore } from "./js/store/configureStore";
import SaltedHash from "./js/Helpers/Hashing/saltedHash";

const store = configureStore();

render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById("root")
);
