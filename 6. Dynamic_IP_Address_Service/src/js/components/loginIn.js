import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as UserActions from "../actions/userActions";

class Login extends Component {
	constructor(props) {
		super(props);
	}

	//TODO: delete default value from form
	render() {
		return (
			<div>
				<Link to="/register">Registration</Link>
				<input ref="login" defaultValue="taller" />
				<input type="password" ref="pass" defaultValue="123456789" />
				<button
					onClick={() => {
						this.props.userActions.loginInUser(
							this.refs.login.value,
							this.refs.pass.value
						);
					}}
				>
					Send
				</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
