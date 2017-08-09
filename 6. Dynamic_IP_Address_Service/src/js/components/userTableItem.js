import React, { Component } from "react";

class componentName extends Component {
	render() {
		const { uuid, login, email, firstName, lastName } = this.props.user;
		return (
			<tr onClick={::this.props.clickOnUserHandler}>
				<td>
					<input type="checkbox" onClick={::this.props.selectUserHandler} />
				</td>
				<td id="uuid" style={{ display: "none" }}>
					{uuid}
				</td>
				<td id="login"> 
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
