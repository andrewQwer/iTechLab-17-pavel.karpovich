import React, { Component } from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import { MainContainer, HeaderContainer, FooterContainer } from "./app";
import { UIContainer } from "./ui";

export default class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<div className="main">
					<HeaderContainer />
					<MainContainer />
					<FooterContainer />
					<UIContainer />
				</div>
			</BrowserRouter>
		);
	}
}
