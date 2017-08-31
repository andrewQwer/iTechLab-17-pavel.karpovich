import React, { PureComponent } from "react";
import { withRouter } from "react-router";
import { Route, Switch } from "react-router-dom";
import { PermissionRoute, Home, NotFound } from "../index";
import {
	UserRegistrationContainer,
	UserLoginContainer,
	UserActionCreators
} from "../../user";
import { ProfileContainer, ProfileIpContainer } from "../../profile";
import { AdminRecycleBinContainer, AdminPanelContainer } from "../../admin";

class Main extends PureComponent {
	render() {
		return (
			<div className="main__main">
				<div className="container main__container">
					<Switch>
						<Route exact path="/" component={Home} />
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
						<PermissionRoute
							isAuth
							path="/ip/:login"
							component={ProfileIpContainer}
						/>
						<PermissionRoute
							isAdmin
							path="/admin"
							component={AdminPanelContainer}
						/>
						<PermissionRoute
							isAdmin
							path="/bin"
							component={AdminRecycleBinContainer}
						/>
						<Route path="*" component={NotFound} />
					</Switch>
				</div>
			</div>
		);
	}
}

export default withRouter(Main);
