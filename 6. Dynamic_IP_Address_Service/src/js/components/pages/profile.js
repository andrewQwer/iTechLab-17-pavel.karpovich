import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import * as UserActions from "../../actions/userActions";
import PropTypes from "prop-types";

class Profile extends Component {
	constructor(props) {
		super(props);
	}

	permissionCheck() {
		let user = this.props.users.find(
			item => item.uuid === this.props.user.uuid
		);
		return (
			this.props.user.uuid ||
			this.props.match.params.login === user.login ||
			user.type === "admin"
		);
	}

	getProfilePage() {
		let currentUser = this.props.users.find(
			item => item.login === this.props.match.params.login
		);
		return (
			<div className="container">
				<p>
					Login: {currentUser.login}
				</p>
				<p>
					Email: {currentUser.email}
				</p>
				<p>
					First name: {currentUser.firstName}
				</p>
				<p>
					Last name: {currentUser.lastName}
				</p>
				<p>
					Type: {currentUser.type}
				</p>
				<p>
					<Link to="/ip">Ip control</Link>
				</p>
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
