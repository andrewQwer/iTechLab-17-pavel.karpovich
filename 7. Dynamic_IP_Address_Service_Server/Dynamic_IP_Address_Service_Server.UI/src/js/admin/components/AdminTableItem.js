import React, { PureComponent } from "react";

class AdminTableItem extends PureComponent {
    render() {
        const { id, login, email, firstName, lastName, role } = this.props.user;
        let isInArray = this.props.deleteArray.includes(id);
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
                    {id}
                </td>
                <td id="login">
                    {login}
                </td>
                <td>
                    {email}
                </td>
                <td>
                    {role.name}
                </td>
                <td>
                    {firstName}
                </td>
                <td>
                    {lastName}
                </td>
			</tr >
		);
	}
}

export default AdminTableItem;