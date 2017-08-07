import React, { Component } from "react";
import { connect } from "react-redux";


class IpForm extends Component {
	constructor(props) {
		super(props);
	}

	

	addButtonClick() {
		this.props.hideForm(true);
		this.props.addIpToUser(
			this.props.user.uuid,
			this.refs.ip.value,
			this.refs.domain.value
		);
	}

	editButtonClick() {
		this.props.hideForm(true);
		this.props.editIpUser(
			this.props.uuid,
			this.refs.ip.value,
			this.refs.domain.value
		);
	}

	cancelButtonClick() {
		this.props.hideForm(true);
	}

	render() {
		return !this.props.isHideForm
			? <div className="ip__form">
					<p>Domain:</p>
					<input
						name="domain"
						ref="domain"
						value={this.props.domain}
						onChange={::this.props.handler}
					/>.taller.com
					<p>IP address:</p>
					<input
						name="ip"
						ref="ip"
						value={this.props.ip}
						onChange={::this.props.handler}
					/>
					<p>Remain {this.props.domainRemainingCount}</p>
					{this.props.isEdit
						? <button onClick={::this.editButtonClick}>Edit address</button>
						: <button onClick={::this.addButtonClick}>Add address</button>}
					<button onClick={::this.cancelButtonClick}>Cancel</button>
				</div>
			: null;
	}
}

const mapStateToProps = state => ({
	user: state.user,
	users: state.user.users,
	ips: state.ip.ips
});

export default connect(mapStateToProps)(IpForm);
