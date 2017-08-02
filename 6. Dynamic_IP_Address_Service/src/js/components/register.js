import React, { Component } from "react";

export default class register extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<input ref="login" placeholder="Please, input login..." />
				<input type="password" ref="pass" placeholder="Please, input pass..." />
				<input type="email" ref="email" placeholder="Please, input email..." />
				<input ref="firstName" placeholder="Please, input first name" />
				<input ref="lastName" placeholder="Please, input last name" />
				<button
					onClick={() =>
						this.props.actions.registerUser(
							this.refs.login.value,
							this.refs.pass.value,
							this.refs.firstName.value,
							this.refs.lastName.value,
							this.refs.email.value
						)}
				>
					Register
				</button>
			</div>
		);
	}
}
