import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Admin, GetUserById } from "../../user";

class PermissionRoute extends Component {
	static propTypes = {
		path: PropTypes.string.isRequired
	};

	static defaultProps = {
		isAuth: false,
		isAdmin: false
	};

	checkAuth = () => {
		return !!this.props.user.uuid;
	};

	checkAdmin = () => {
		const { user } = this.props;
		return (
			this.checkAuth() &&
			GetUserById(user, user.uuid).type.GetType() === new Admin().GetType()
		);
	};

	renderPermissionPage = () => {
		return this.checkAuth()
			? <div>
					<h4>This page available only for guest!</h4>
					<Link to="/profile">Profile</Link>
				</div>
			: <div>
					<h4>This page available only for users!</h4>
					<Link to="/login">Login</Link>
					<br />
					<Link to="/registration">Registration</Link>
				</div>;
	};

	renderAdminPermissionPage = () => {
		return (
			<div>
				<h4>This page available only for administrators!</h4>
				<Link to="/">Profile</Link>
			</div>
		);
	};

	render = () => {
		const { permissionPath, path, component, isAuth, isAdmin } = this.props;
		let renderPage;
		if (isAdmin) {
			renderPage =
				this.checkAdmin() === isAdmin
					? <Route path={path} component={component} />
					: this.renderAdminPermissionPage();
		} else {
			renderPage =
				isAuth === this.checkAuth()
					? <Route path={path} component={component} />
					: this.renderPermissionPage(permissionPath);
		}
		return renderPage;
	};
}

const mapStateToProps = state => ({
	user: state.user
});

export default connect(mapStateToProps)(PermissionRoute);
