import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import LogOut from "./logOut";
import * as UserActions from "../actions/userActions";

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

	render() {
		const navigationButtons = !this.props.user.uuid
			? this.getGuestNavButton()
			: this.getUserNavButton();

		return (
			<div className="navigation">
				<div className="navigation__logo">
					<Link to="/">Home</Link>
				</div>
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
