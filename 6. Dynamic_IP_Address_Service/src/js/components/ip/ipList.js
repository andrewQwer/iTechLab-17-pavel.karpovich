import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import IpItem from "./ipItem";

class IpTable extends Component {
	constructor(props) {
		super(props);
	}

	findUserItems() {
		return this.props.ips.filter(
			item => item.ownerUuid === this.props.user.uuid
		);
	}

	createComponentList(items) {
		return items.length !== 0
			? items.map(item =>
					<IpItem
						editButtonClick={::this.props.editButtonClick}
						domain={item.domain}
						ip={item.ip}
						uuid={item.uuid}
					/>
				)
			: null;
	}

	render() {
		return (
			<table className="ip__table">
				<tr>
					<td>IP</td>
					<td>Domain</td>
					<td>Button</td>
				</tr>
				{this.createComponentList(this.findUserItems())}
			</table>
		);
	}
}

const mapStateToProps = state => ({
	user: state.user,
	ips: state.ip.ips
});

export default connect(mapStateToProps)(IpTable);
