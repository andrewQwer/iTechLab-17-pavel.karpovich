import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as UserActions from "../actions/userActions";

class register extends Component {
	constructor(props) {
		super(props);
	}

	//TODO: delete default value from form
	render() {
		return (
			<div>
				<input
					ref="login"
					defaultValue="taller"
					placeholder="Please, input login..."
				/>
				<input
					type="password"
					defaultValue="123456789"
					ref="pass"
					placeholder="Please, input pass..."
				/>
				<input
					type="email"
					defaultValue="tallerstk97@gmail.com"
					ref="email"
					placeholder="Please, input email..."
				/>
				<input
					ref="firstName"
					defaultValue="Pavel"
					placeholder="Please, input first name"
				/>
				<input
					ref="lastName"
					defaultValue="Karpovich"
					placeholder="Please, input last name"
				/>
				<button
					onClick={() => {
						this.props.userActions.registerUser(
							this.refs.login.value,
							this.refs.pass.value,
							this.refs.firstName.value,
							this.refs.lastName.value,
							this.refs.email.value
						);
						this.props.history.push("/");
					}}
				>
					Register
				</button>
				<Link to="/">login</Link>
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

export default connect(mapStateToProps, mapDispatchToProps)(register);
