import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import { ProfileActionCreators } from "../index";
import { Admin } from "../../user";

class ProfileContainer extends Component {
	componentWillMount() {
		this.props.AdminActionCreators.getUserByLogin(
			this.props.match.params.login
		);
	}

	componentWillUnmount() {
		this.props.AdminActionCreators.clearUserInfo();
	}

	getProfilePage() {
		// const { uuid, users } = this.props.user;
		// let login = this.props.match.params.login;
		// let currentUser = users.find(item => item.login === login);
		const { profile } = this.props;
		return !!profile
			? <div className="login__form">
					<div className="login__row">
						<label htmlFor="" className="login__label">
							Login:
						</label>
						<p className="login__input">
							{profile.login}
						</p>
					</div>
					<div className="login__row">
						<label htmlFor="" className="login__label">
							Email:
						</label>
						<p className="login__input">
							{profile.email}
						</p>
					</div>
					<div className="login__row">
						<label htmlFor="" className="login__label">
							First name:
						</label>
						<p className="login__input">
							{profile.firstName}
						</p>
					</div>
					<div className="login__row">
						<label htmlFor="" className="login__label">
							Last name
						</label>
						<p className="login__input">
							{profile.lastName}
						</p>
					</div>
					<div className="login__row">
						<label htmlFor="" className="login__label">
							Type:
						</label>
						<p className="login__input">
							{profile.type}
						</p>
					</div>
					<div className="login__row">
						<label htmlFor="" className="login__label">
							<Link to={`/ip/${profile.login}`}>Ip control</Link>
						</label>
					</div>
				</div>
			: null;
	}

	render() {
		return this.getProfilePage();
	}
}

const mapStateToProps = state => ({
	profile: state.profile.showProfile
});

const mapDispatchToProps = dispatch => ({
	AdminActionCreators: bindActionCreators(ProfileActionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(
	ProfileContainer
);
