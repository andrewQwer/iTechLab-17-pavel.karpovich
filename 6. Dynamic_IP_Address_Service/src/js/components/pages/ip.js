import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as IpActions from "../../actions/ipActions";
import IpForm from "../ip/ipForm";
import IpList from "../ip/ipList";
import { GetUserDomainCount } from "../../reducers/ip";
import { GetUserById } from "../../reducers/user";

class Ip extends Component {
	state = {
		uuid: null,
		isEditForm: false,
		isHideForm: true,
		domainRemainingCount: this.calculateDomainRemainingCount,
		ip: "192.168.100.1",
		domain: "belstu"
	};

	set uuid(value) {
		this.setState({ uuid: value });
	}

	get uuid() {
		return this.state.uuid;
	}

	setEditForm = value => {
		this.setState({ isEditForm: value });
	};

	get isEditForm() {
		return this.state.isEditForm;
	}

	setHideForm = value => {
		this.setState({ isHideForm: value });
	};

	get isHideForm() {
		return this.state.isHideForm;
	}

	set domainRemainingCount(value) {
		this.setState({ domainRemainingCount: value });
	}

	get domainRemainingCount() {
		return this.state.domainRemainingCount;
	}

	set ip(value) {
		this.setState({ ip: value });
	}

	get ip() {
		return this.state.ip;
	}

	set domain(value) {
		this.setState({ domain: value });
	}

	get domain() {
		return this.state.domain;
	}

	calculateDomainRemainingCount = () => {
		const { user, ips } = this.props;
		const currentUser = user.users.find(item => item.login === this.props.match.params.login)
		return (
			currentUser.type.GetDomainCount() -
			GetUserDomainCount(ips, currentUser.uuid)
		);
	};

	editClickHandler = (uuid, ip, domain, isEditForm, isHideForm) => {
		this.uuid = uuid;
		this.ip = ip;
		this.domain = domain;
		this.setEditForm(isEditForm);
		this.setHideForm(isHideForm);
		this.domainRemainingCount = this.calculateDomainRemainingCount();
	};

	deleteClickHandler = uuid => {
		this.setHideForm(true);
		this.props.ipActions.deleteUserIp(uuid);
	};

	inputChangeHandler = event => {
		const { value, name } = event.target;
		this.setState({
			[name]: value
		});
	};

	addClickHandler = () => {
		if (this.calculateDomainRemainingCount() !== 0) {
			this.ip = "";
			this.domain = "";
			this.setEditForm(false);
			this.setHideForm(false);
			this.domainRemainingCount = this.calculateDomainRemainingCount();
		} else {
			alert(`Exceeded domain count limit!`);
		}
	};

	render() {
		return (
			<div className="ip">
				<div className="ip__toolbar">
					<button className="ip__button" onClick={::this.addClickHandler}>
						+
					</button>
					<label>
						Remain {this.calculateDomainRemainingCount()} domain
					</label>
				</div>
				<div className="ip__main">
					<IpList
						editClick={::this.editClickHandler}
						deleteClick={::this.deleteClickHandler}
						login={this.props.match.params.login}
					/>
					<IpForm
						domainRemainingCount={this.state.domainRemainingCount}
						isHideForm={this.isHideForm}
						setHideForm={::this.setHideForm}
						isEdit={this.isEditForm}
						setEdit={::this.setEditForm}
						inputChange={::this.inputChangeHandler}
						addIpToUser={::this.props.ipActions.addIpToUser}
						editUserIp={::this.props.ipActions.editUserIp}
						uuid={this.state.uuid}
						ip={this.ip}
						domain={this.domain}
						login={this.props.match.params.login}
					/>
				</div>
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
