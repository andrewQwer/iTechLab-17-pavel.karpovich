import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PermissionRoute from "../components/permissionRoute";
import { Route, Switch } from "react-router-dom";
import Home from "../components/pages/home";
import Registration from "../components/pages/registration";
import Login from "../components/pages/login";
import Profile from "../components/pages/profile";
import NotFound from "../components/pages/notFound";
import IP from "../components/pages/ip";
import AdminPanel from "../components/pages/adminPanel";
import RecycleBin from "../components/pages/bin";

export default class Main extends Component {
	render() {
		return (
			<div className="main__main">
				<div className="container main__container">
					<Switch>
						<Route exact path="/" component={Home} />
						<PermissionRoute path="/registration" component={Registration} />
						<PermissionRoute path="/login" component={Login} />
						<PermissionRoute
							isAuth
							path="/profile/:login"
							component={Profile}
						/>
						<PermissionRoute isAuth path="/ip" component={IP} />
						<PermissionRoute isAdmin path="/admin" component={AdminPanel} />
						<PermissionRoute isAdmin path="/bin" component={RecycleBin} />
						<Route path="*" component={NotFound} />
					</Switch>
				</div>
			</div>
		);
	}
}
