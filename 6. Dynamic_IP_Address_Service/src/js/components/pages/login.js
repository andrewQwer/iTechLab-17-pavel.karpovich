import React, { Component } from "react";
import {} from "react-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as UserActions from "../../actions/userActions";

class Login extends Component {
	submitClickHandler = () => {
		this.props.userActions.loginInUser(this.loginInput.value, this.passInput.value);
		this.props.history.push("/");
	};

	//TODO: delete default value from form
	renderLoginPage = () => {
		return (
			<div className="login__form">
				<div className="login__row">
					<label className="login__label">Login:</label>
					<input
						className="login__input"
						ref={input => (this.loginInput = input)}
						defaultValue="taller"
						placeholder="Please, input login..."
					/>
				</div>
				<div className="login__row">
					<div className="login__label">Password:</div>
					<input
						className="login__input"
						type="password"
						ref={input => (this.passInput = input)}
						defaultValue="123456789"
						placeholder="Please, input pass..."
					/>
				</div>
				<button
					className="label__submit btn btn-success"
					onClick={::this.submitClickHandler}
				>
					Send
				</button>
			</div>
		);
	};

	render = () => {
		return this.renderLoginPage();
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
