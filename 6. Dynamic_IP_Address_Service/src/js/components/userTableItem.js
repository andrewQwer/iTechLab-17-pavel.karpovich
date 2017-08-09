import React, { Component } from "react";

class componentName extends Component {
	render() {
		const { login, email, firstName, lastName } = this.props.user;
		return (
			<tr>
				<td>
					{login}
				</td>
				<td>
					{email}
				</td>
				<td>
					{firstName}
				</td>
				<td>
					{lastName}
				</td>
			</tr>
		);
	}
}

export default componentName;
