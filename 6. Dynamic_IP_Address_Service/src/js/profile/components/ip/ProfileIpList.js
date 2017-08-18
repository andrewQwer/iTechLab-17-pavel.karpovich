import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import { ProfileIpItem } from "../../index";

export default class ProfileIpList extends Component {
	static propTypes = {
		editClick: PropTypes.func.isRequired
	};

	createComponentList = items => {
		return items.length !== 0
			? items.map((item, index) =>
					<ProfileIpItem
						key={index}
						editClick={::this.props.editClick}
						deleteClick={::this.props.deleteClick}
						domain={item.domain}
						ip={item.ip}
						uuid={item.uuid}
						updateDate={new Date(item.updateDate).format("dd.MM.yyyy")}
					/>
				)
			: null;
	};

	render() {
		return (
			<table className="ip__table table">
				<thead className="thead-inverse">
					<tr>
						<td>IP</td>
						<td>Domain</td>
						<td>Button edit</td>
						<td>Button delete</td>
						<td>Last update</td>
					</tr>
				</thead>
				<tbody>
					{this.createComponentList(this.props.ips || [])}
				</tbody>
			</table>
		);
	}
}