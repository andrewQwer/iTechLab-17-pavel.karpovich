import React, { Component } from "react";

class IpItem extends Component {
	constructor(props) {
		super(props);
	}
	//TODO: make this function simple
	editButtonClick() {
		this.props.editButtonClick(
			this.props.uuid,
			this.props.ip,
			this.props.domain,
			true,	// isEditForm
			false	// isHideForm
		);
	}

	render() {
		return (
			<tr key={this.props.uuid}>
				<td>
					{this.props.ip}
				</td>
				<td>
					{this.props.domain}
				</td>
				<td>
					<button onClick={::this.editButtonClick}>Edit</button>
				</td>
			</tr>
		);
	}
}

export default IpItem;
