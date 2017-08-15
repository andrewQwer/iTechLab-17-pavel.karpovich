import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ErrorActionCreators, ErrorPopup } from "../index";

class ErrorContainer extends Component {
	renderContainer = () => {
		const { errorCode } = this.props.error;
		return (
			<div
				onClick={::this.clickHideHandler}
				className={!!errorCode ? "error__popup--show" : "error__popup--hide"}
			>
				<ErrorPopup code={errorCode} hideClick={::this.clickHideHandler} />
			</div>
		);
	};

	clickHideHandler() {
		this.props.ErrorActionCreators.hideError();
	}

	render() {
		return this.renderContainer();
	}
}

const mapStateToProps = state => ({
	error: state.error
});

const mapDispatchToProps = dispatch => ({
	ErrorActionCreators: bindActionCreators(ErrorActionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ErrorContainer);
