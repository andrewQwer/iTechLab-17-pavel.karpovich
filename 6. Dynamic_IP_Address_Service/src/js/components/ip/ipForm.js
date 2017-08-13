import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class IpForm extends Component {
	static propTypes = {
		ip: PropTypes.string.isRequired,
		domain: PropTypes.string.isRequired,
		setHideForm: PropTypes.func.isRequired,
		isHideForm: PropTypes.bool.isRequired,
		setEdit: PropTypes.func.isRequired,
		isEdit: PropTypes.bool.isRequired,
		addIpToUser: PropTypes.func.isRequired,
		editUserIp: PropTypes.func.isRequired,
		inputChange: PropTypes.func.isRequired
	};

	addButtonClick = () => {
		this.props.setHideForm(true);
		this.props.addIpToUser(
			this.props.user.uuid,
			this.ipInput.value,
			this.domainInput.value
		);
	};

	editButtonClick = () => {
		this.props.setHideForm(true);
		this.props.editUserIp(
			this.props.uuid,
			this.ipInput.value,
			this.domainInput.value
		);
	};

	cancelButtonClick = () => {
		this.props.setHideForm(true);
	};

	renderForm = () => {
		const { isHideForm, isEdit, ip, domain, domainRemainingCount } = this.props;
		let result;
		if (!isHideForm) {
			result = (
				<div className="ip__form">
					<div className="form__row">
						<label className="form__label" htmlFor="">
							Domain:
						</label>
						<div className="input-group form__input">
							<input
								className="form-control"
								name="domain"
								ref={input => (this.domainInput = input)}
								value={domain}
								onChange={::this.props.inputChange}
							/>
							<span className="input-group-addon">.taller.com</span>
						</div>
					</div>
					<div className="form__row">
						<label htmlFor="" className="form__label">
							IP address:
						</label>
						<input
							className="form__input form-control"
							name="ip"
							ref={input => (this.ipInput = input)}
							value={ip}
							onChange={::this.props.inputChange}
						/>
					</div>
					<div className="form__buttons">
						{isEdit
							? <button
									className="btn btn-success"
									onClick={::this.editButtonClick}
								>
									Edit address
								</button>
							: <button
									className="btn btn-success"
									onClick={::this.addButtonClick}
								>
									Add address
								</button>}
						<button
							className="btn btn-success"
							onClick={::this.cancelButtonClick}
						>
							Cancel
						</button>
					</div>
				</div>
			);
		} else result = null;
		return result;
	};

	render() {
		return this.renderForm();
	}
}

const mapStateToProps = state => ({
	user: state.user,
	users: state.user.users,
	ips: state.ip.ips
});

export default connect(mapStateToProps)(IpForm);
