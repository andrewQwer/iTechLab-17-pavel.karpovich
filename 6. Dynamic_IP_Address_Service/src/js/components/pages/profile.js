import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import * as UserActions from "../../actions/userActions";
import PropTypes from "prop-types";
import { GetUserById } from "../../reducers/user";
import Admin from "../../models/userType/Admin"

class Profile extends Component {
	permissionCheck() {
		const { uuid } = this.props.user;
		let user = GetUserById(this.props.user, uuid);
		return (
			this.props.match.params.login === user.login ||
			user.type.GetType() === new Admin().GetType()
		);
	}

	getProfilePage() {
		const { uuid, users } = this.props.user;
		let login = this.props.match.params.login;
		let currentUser = users.find(item => item.login === login);
		return (
			<div className="login__form">
				<div className="login__row">
					<label htmlFor="" className="login__label">
						Login:
					</label>
					<p className="login__input">
						{currentUser.login}
					</p>
				</div>
				<div className="login__row">
					<label htmlFor="" className="login__label">
						Email:
					</label>
					<p className="login__input">
						{currentUser.email}
					</p>
				</div>
				<div className="login__row">
					<label htmlFor="" className="login__label">
						First name:
					</label>
					<p className="login__input">
						{currentUser.firstName}
					</p>
				</div>
				<div className="login__row">
					<label htmlFor="" className="login__label">
						Last name
					</label>
					<p className="login__input">
						{currentUser.lastName}
					</p>
				</div>
				<div className="login__row">
					<label htmlFor="" className="login__label">
						Type:
					</label>
					<p className="login__input">{currentUser.type.GetType()}</p>
				</div>
				<div className="login__row">
					<label htmlFor="" className="login__label">
						<Link to={`/ip/${currentUser.login}`}>Ip control</Link>
					</label>
				</div>
			</div>
		);
	}

	getPermissionError() {
		return (
			<div className="container">
				<h4>This page available only for administrators</h4>
			</div>
		);
	}

	render() {
		const profilePage = this.permissionCheck()
			? this.getProfilePage()
			: this.getPermissionError();
		return profilePage;
	}
}

Profile.propTypes = {};

const mapStateToProps = state => ({
	users: state.user.users,
	user: state.user
});

const mapDispatchToProps = dispatch => ({
	userActions: bindActionCreators(UserActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
