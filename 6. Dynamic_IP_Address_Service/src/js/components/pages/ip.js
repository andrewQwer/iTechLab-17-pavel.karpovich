import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as IpActions from "../../actions/ipActions";
import IpForm from "../ip/ipForm";
import IpList from "../ip/ipList";

class Ip extends Component {
	constructor(props) {
		super(props);
		this.state = {
			uuid: null,
			isEditForm: false,
			isHideForm: true,
			ip: "192.168.100.1",
			domain: "belstu"
		};
	}

	editButtonClick(uuid, ip, domain, isEditForm, isHideForm) {
		this.setState({
			uuid: uuid,
			ip: ip,
			domain: domain,
			isEditForm: isEditForm,
			isHideForm: isHideForm
		});
	}

	handlerInputChange(event) {
		const value = event.target.value;
		const name = event.target.name;
		this.setState({
			[name]: value
		});
	}

	addButtonClick() {
		this.setState({
			ip: "",
			domain: "",
			isEditForm: false,
			isHideForm: false
		});
	}

	hideForm(state) {
		this.setState({
			isHideForm: state
		});
	}

	render() {
		return (
			<div className="ip">
				<button onClick={::this.addButtonClick}>+</button>
				<IpList editButtonClick={::this.editButtonClick} />
				<IpForm
					hideForm={::this.hideForm}
					isHideForm={this.state.isHideForm}
					isEdit={this.state.isEditForm}
					addIpToUser={::this.props.ipActions.addIpToUser}
					editIpUser={::this.props.ipActions.editUserIp}
					uuid={this.state.uuid}
					ip={this.state.ip}
					domain={this.state.domain}
					handler={::this.handlerInputChange}
				/>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	user: state.user,
	ips: state.ips
});

const mapDispatchToProps = dispatch => ({
	ipActions: bindActionCreators(IpActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Ip);
