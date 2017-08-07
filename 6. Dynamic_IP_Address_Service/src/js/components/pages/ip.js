import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as IpActions from "../../actions/ipActions";
import IpForm from "../ip/ipForm";
import IpList from "../ip/ipList";
import { GetUserDomainCount } from "../../reducers/ip";
import { GetUserById } from "../../reducers/user";

class Ip extends Component {
	constructor(props) {
		super(props);
		this.state = {
			uuid: null,
			isEditForm: false,
			isHideForm: true,
			domainRemainingCount: this.getDomainRemainingCount(),
			ip: "192.168.100.1",
			domain: "belstu"
		};
	}

	getDomainRemainingCount() {
		return (
			GetUserById(this.props.user, this.props.user.uuid).type.GetDomainCount() -
			GetUserDomainCount(this.props.ips, this.props.user.uuid)
		);
	}

	editButtonClick(uuid, ip, domain, isEditForm, isHideForm) {
		this.setState({
			uuid: uuid,
			ip: ip,
			domain: domain,
			isEditForm: isEditForm,
			isHideForm: isHideForm,
			domainRemainingCount: this.getDomainRemainingCount()
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
		if (this.getDomainRemainingCount() !== 0) {
			this.setState({
				ip: "",
				domain: "",
				isEditForm: false,
				isHideForm: false,
				domainRemainingCount: this.getDomainRemainingCount()
			});
		} else {
			alert(`Exceeded domain count limit!`);
		}
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
					domainRemainingCount={this.state.domainRemainingCount}
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
	users: state.user.users,
	ips: state.ip.ips
});

const mapDispatchToProps = dispatch => ({
	ipActions: bindActionCreators(IpActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Ip);
