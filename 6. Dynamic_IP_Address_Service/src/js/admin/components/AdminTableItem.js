import React, { Component } from "react";

class AdminTableItem extends Component {
	render() {
		const { uuid, login, email, firstName, lastName, type } = this.props.user;
		let isInArray = this.props.deleteArray.includes(uuid);
		return (
			<tr onClick={::this.props.clickOnUserHandler}>
				<td>
					<input
						type="checkbox"
						onClick={::this.props.selectUserHandler}
						checked={isInArray}
					/>
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
					{type}
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

export default AdminTableItem;
