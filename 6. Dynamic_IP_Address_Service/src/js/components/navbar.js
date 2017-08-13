import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import LogOut from "./logOut";
import * as UserActions from "../actions/userActions";
import { GetUserById } from "../reducers/user";
import Admin from "../models/userType/Admin";

class Navbar extends Component {
	getUserNavButton() {
		let user = this.props.users.find(
			item => item.uuid === this.props.user.uuid
		);
		return (
			<div className="navigation__buttons">
				<div className="navigation_item">
					Welcome, <Link to={`/profile/${user.login}`}>{user.login}</Link>!
				</div>
				<div className="navigation_item">
					<LogOut actions={this.props.userActions} />
				</div>
			</div>
		);
	}

	getGuestNavButton() {
		return (
			<div className="navigation__buttons">
				<div className="navigation_item">
					<Link to="/login">Login</Link>
				</div>
				<div className="navigation_item">
					<Link to="/registration">Registration</Link>
				</div>
			</div>
		);
	}

	getAdminMenuButton() {
		const { user } = this.props;
		const type =
			user.uuid != null ? GetUserById(user, user.uuid).type.GetType() : "";
		return type === new Admin().GetType()
			? <div className="navigation__admin">
					<div className="navigation__logo">
						<Link to="/admin">Admin</Link>
					</div>
					<div className="navigation__logo">
						<Link to="/bin">RecycleBin</Link>
					</div>
				</div>
			: "";
	}

	render() {
		const { user } = this.props;
		const navigationButtons = !user.uuid
			? this.getGuestNavButton()
			: this.getUserNavButton();

		return (
			<div className="navigation">
				<div className="navigation__logo">
					<Link to="/">Home</Link>
				</div>
				{this.getAdminMenuButton()}
				{navigationButtons}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	users: state.user.users,
	user: state.user
});

const mapDispatchToProps = dispatch => ({
	userActions: bindActionCreators(UserActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
