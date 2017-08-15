import React, { Component } from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import { MainContainer, HeaderContainer, FooterContainer } from "./app";
import { ErrorContainer } from "./error";

export default class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<div className="main">
					<HeaderContainer />
					<MainContainer />
					<FooterContainer />
					<ErrorContainer />
				</div>
			</BrowserRouter>
		);
	}
}
