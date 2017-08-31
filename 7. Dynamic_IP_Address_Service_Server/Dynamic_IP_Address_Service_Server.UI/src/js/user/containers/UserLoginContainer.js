import React, { PureComponent } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { UserActionCreators } from "../index";

class LoginContainer extends PureComponent {
	submitClickHandler = () => {
		this.props.loginInUser(
			this.loginInput.value,
			this.passInput.value,
			this.props.history
		);
	};

	renderLoginPage = () => {
		return (
			<div className="login__form">
				<div className="login__row">
					<label className="login__label">Login:</label>
					<input
						className="login__input"
						ref={input => (this.loginInput = input)}
						placeholder="Please, input login..."
					/>
				</div>
				<div className="login__row">
					<div className="login__label">Password:</div>
					<input
						className="login__input"
						type="password"
						ref={input => (this.passInput = input)}
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
	};
}

const mapStateToProps = state => ({
	users: state.user.users,
	user: state.user
});

const mapDispatchToProps = dispatch => ({
	loginInUser: bindActionCreators(UserActionCreators.loginInUser, dispatch)
});

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(LoginContainer)
);
