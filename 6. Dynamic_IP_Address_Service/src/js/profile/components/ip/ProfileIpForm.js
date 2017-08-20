import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class ProfileIpForm extends Component {
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
			this.ipInput.value,
			this.domainInput.value
		);
	};

	editButtonClick = () => {
		this.props.setHideForm(true);
		this.props.editUserIp(
			this.props.uuid,
			this.domainInput.value,
			this.ipInput.value,
		);
	};

	cancelButtonClick = () => {
		this.props.setHideForm(true);
	};

	renderForm = () => {
		const { isHideForm, isEdit, ip, domain } = this.props;
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
					<div className="form__row">
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

export default ProfileIpForm;
