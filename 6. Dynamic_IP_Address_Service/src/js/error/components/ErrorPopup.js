import React, { Component } from "react";
import { Errors, Error } from "../index";

class ErrorPopup extends Component {
	renderPopup = () => {
		const { code } = this.props;
		let error = Errors.GetErrorByCode(code);
		return !!error
			? <div className="alert alert-danger">
					<h2 className="alert-heading">
						<strong>Error!</strong>
					</h2>
					<p>
						{error.Message}
					</p>
					<div className="error__buttons">
						<button className="btn btn-danger" onClick={::this.props.hideClick}>OK</button>
					</div>
				</div>
			: null;
	};

	render() {
		return this.renderPopup();
	}
}

export default ErrorPopup;
