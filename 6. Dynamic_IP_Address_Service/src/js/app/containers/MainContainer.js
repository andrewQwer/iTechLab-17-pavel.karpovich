import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { PermissionRoute, HomeContainer, NotFoundContainer } from "../index";
import {
	UserRegistrationContainer,
	UserLoginContainer,
	UserAdminPanelContainer,
	UserRecycleBinContainer
} from "../../user";
import { ProfileContainer, ProfileIpContainer } from "../../profile";

export default class MainContainer extends Component {
	render() {
		return (
			<div className="main__main">
				<div className="container main__container">
					<Switch>
						<Route exact path="/" component={HomeContainer} />
						<PermissionRoute
							path="/registration"
							component={UserRegistrationContainer}
						/>
						<PermissionRoute path="/login" component={UserLoginContainer} />
						<PermissionRoute
							isAuth
							path="/profile/:login"
							component={ProfileContainer}
						/>
						<PermissionRoute isAuth path="/ip/:login" component={ProfileIpContainer} />
						<PermissionRoute
							isAdmin
							path="/admin"
							component={UserAdminPanelContainer}
						/>
						<PermissionRoute
							isAdmin
							path="/bin"
							component={UserRecycleBinContainer}
						/>
						<Route path="*" component={NotFoundContainer} />
					</Switch>
				</div>
			</div>
		);
	}
}
