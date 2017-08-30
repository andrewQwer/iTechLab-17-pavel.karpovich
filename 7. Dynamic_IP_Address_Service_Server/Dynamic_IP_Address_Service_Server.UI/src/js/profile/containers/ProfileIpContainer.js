import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { bindActionCreators } from "redux";
import { ProfileIpForm, ProfileIpList, ProfileActionCreators } from "../index";
import { GetUserById, Role } from "../../user";
import { UIActionCreators, ErrorCodes } from "../../ui";

class ProfileIpContainer extends PureComponent {
	state = {
		uuid: null,
		isEditForm: false,
		isHideForm: true,
		domainRemainingCount: this.calculateDomainRemainingCount,
		ip: "192.168.100.1",
		domain: "belstu"
	};

	componentWillMount() {
		this.props.ProfileActionCreators.getUserIpByLogin(
			this.props.match.params.login
		);
	}

	componentWillUnmount() {
		this.props.ProfileActionCreators.clearUserInfo();
	}

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
		let typeCount = this.props.user.role.DomainCount;
		return typeCount - this.props.ips.length;
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
		this.props.ProfileActionCreators.deleteIp(uuid);
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
			this.props.UIActionCreators.showError(
				ErrorCodes.EXCEEDED_DOMAIN_COUNT_LIMIT
			);
		}
	};

	render() {
		return (
			<div className="ip">
				<div className="ip__toolbar">
					<button
						className="ip__button btn btn-success"
						onClick={::this.addClickHandler}
					>
						+
					</button>
					<label>
						Remain {this.calculateDomainRemainingCount()} domain
					</label>
				</div>
				<div className="ip__main">
					<ProfileIpList
						editClick={::this.editClickHandler}
						deleteClick={::this.deleteClickHandler}
						login={this.props.match.params.login}
						ips={this.props.ips}
					/>
					<ProfileIpForm
						isHideForm={this.isHideForm}
						setHideForm={::this.setHideForm}
						isEdit={this.isEditForm}
						setEdit={::this.setEditForm}
						inputChange={::this.inputChangeHandler}
						addIpToUser={::this.props.ProfileActionCreators.addIp}
						editUserIp={::this.props.ProfileActionCreators.editIp}
						uuid={this.uuid}
						ip={this.ip}
						domain={this.domain}
					/>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	ips: state.profile.ips,
	user: state.user
});

const mapDispatchToProps = dispatch => ({
	ProfileActionCreators: bindActionCreators(ProfileActionCreators, dispatch),
	UIActionCreators: bindActionCreators(UIActionCreators, dispatch)
});

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(ProfileIpContainer)
);
