import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import LogOut from "./logOut";
import * as UserActions from "../actions/userActions";

class Navbar extends Component {
	render() {
		//TODO: move find user code to function
		const navigationButtons = !this.props.user.uuid
			? <div className="navigation__buttons">
					<div className="navigation_item">
						<Link to="/login">Login</Link>
					</div>
					<div className="navigation_item">
						<Link to="/registration">Registration</Link>
					</div>
				</div>
			: <div className="navigation__buttons">
					<div className="navigation_item">
						Welcome,
						{
							this.props.users.find(item => item.uuid === this.props.user.uuid)
								.login
						}!
					</div>
					<div className="navigation_item">
						<LogOut actions={this.props.userActions} />
					</div>
				</div>;

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
