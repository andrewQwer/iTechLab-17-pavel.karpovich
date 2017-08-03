import React, { Component } from "react";

export default class LoginOut extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<button onClick={() => this.props.actions.loginOutUser()}>
				Login out
			</button>
		);
	}
}
