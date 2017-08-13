import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import IpItem from "./ipItem";
import PropTypes from "prop-types";

class IpTable extends Component {
	static propTypes = {
		editClick: PropTypes.func.isRequired
	};

	findUserItems = () => {
		const { ips, user } = this.props;
		const currentUser = user.users.find(item => item.login === this.props.login)
		return ips.filter(item => item.ownerUuid === currentUser.uuid);
	};

	createComponentList = items => {
		return items.length !== 0
			? items.map((item, index) =>
					<IpItem
						key={index}
						editClick={::this.props.editClick}
						deleteClick={::this.props.deleteClick}
						domain={item.domain}
						ip={item.ip}
						uuid={item.uuid}
						updateDate={item.updateDate.format("dd.MM.yyyy")}
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
					{this.createComponentList(this.findUserItems())}
				</tbody>
			</table>
		);
	}
}

const mapStateToProps = state => ({
	user: state.user,
	ips: state.ip.ips
});

export default connect(mapStateToProps)(IpTable);
