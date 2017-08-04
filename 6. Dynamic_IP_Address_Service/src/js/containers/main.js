import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import Home from "../components/pages/home";
import Registration from "../components/pages/registration";
import Login from "../components/pages/login";
import Profile from "../components/pages/profile"
import NotFound from "../components/pages/notFound";

export default class Main extends Component {
	render() {
		return (
			<div className="row main__main">
				<Switch>
					<Route exact path="/" component={Home} />
					<Route path="/registration" component={Registration} />
					<Route path="/login" component={Login} />
					<Route path="/profile/:login" component={Profile} />
					<Route path="*" component={NotFound} />
				</Switch>
			</div>
		);
	}
}
