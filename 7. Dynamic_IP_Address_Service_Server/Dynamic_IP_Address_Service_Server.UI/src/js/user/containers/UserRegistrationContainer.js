import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { bindActionCreators } from "redux";
import { UserActionCreators } from "../index";

class RegistrationContainer extends PureComponent {
	registerClickHandler = () => {
		if (
			this.checkStringFiled(this.loginInput.value) &&
			this.checkStringFiled(this.passInput.value) &&
			this.checkStringFiled(this.firstNameInput.value) &&
			this.checkStringFiled(this.lastNameInput.value) &&
			this.checkEmailField(this.emailInput.value)
		) {
			this.props.registerUser(
				this.loginInput.value,
				this.passInput.value,
				this.firstNameInput.value,
				this.lastNameInput.value,
				this.emailInput.value,
				this.props.history
			);
		}
	};

	checkStringFiled = str => {
		let check = false;
		let ext = /^[A-z]|\d{3,}$/;
		if (!ext.test(str)) {
			alert("Incorrect filed!");
		} else {
			check = true;
		}
		return check;
	};

	checkEmailField = email => {
		let check = false;
		let ext = /^\w+@\w+\.\w{2,3}$/;
		if (!ext.test(email)) {
			alert("Incorrect email!");
		} else {
			check = true;
		}
		return check;
	};

	renderRegisterPage = () => {
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
					<label className="login__label">Password:</label>
					<input
						className="login__input"
						type="password"
						ref={input => (this.passInput = input)}
						placeholder="Please, input pass..."
					/>
				</div>
				<div className="login__row">
					<label className="login__label">Email</label>
					<input
						className="login__input"
						type="email"
						ref={input => (this.emailInput = input)}
						placeholder="Please, input email..."
					/>
				</div>
				<div className="login__row">
					<label className="login__label">First name:</label>
					<input
						className="login__input"
						ref={input => (this.firstNameInput = input)}
						placeholder="Please, input first name"
					/>
				</div>
				<div className="login__row">
					<label className="login__label">Last name</label>
					<input
						className="login__input"
						ref={input => (this.lastNameInput = input)}
						placeholder="Please, input last name"
					/>
				</div>

				<button
					className="login__button btn btn-success"
					onClick={::this.registerClickHandler}
				>
					Register
				</button>
			</div>
		);
	};

	render() {
		return this.renderRegisterPage();
	}
}

const mapStateToProps = state => ({
	users: state.user.users,
	user: state.user
});

const mapDispatchToProps = dispatch => ({
	registerUser: bindActionCreators(UserActionCreators.registerUser, dispatch)
});

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(RegistrationContainer)
);
