import React, { Component } from "react";

export default class Login extends Component {
	constructor(props) {
		super(props);
	}

	//TODO: delete default value from form
	render() {
		return (
			<div>
				<input ref="login" defaultValue="taller" />
				<input type="password" ref="pass" defaultValue="123456789" />
				<button
					onClick={() => {
						this.props.actions.loginInUser(this.refs.login.value, this.refs.pass.value);
					}}
				>
					Send
				</button>
			</div>
		);
	}
}
