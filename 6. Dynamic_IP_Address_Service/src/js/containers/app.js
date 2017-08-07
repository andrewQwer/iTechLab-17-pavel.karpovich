import React, { Component } from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import Main from "./main";
import Header from "./header";
import Footer from "./footer";

export default class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<div className="container main">
					<Header />
					<Main />
					<Footer />
				</div>
			</BrowserRouter>
		);
	}
}
