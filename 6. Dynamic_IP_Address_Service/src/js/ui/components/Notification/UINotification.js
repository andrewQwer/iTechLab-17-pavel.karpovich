import React, { Component } from "react";

class UINotification extends Component {
	componentWillUpdate = () => {
		this.hideTimeout = setTimeout(() => {
			this.hideNotification();
		}, 5000);
	};

	hideNotification = () => {
		this.props.hideClick();
		if (!!this.hideTimeout) clearTimeout(this.hideTimeout);
	};

	render() {
		return (
			<div
				className={`alert alert-success ${!!this.props.text
					? "notification__block--show"
					: "notification__block--hide"}`}
				onClick={::this.hideNotification}
			>
				<strong>{this.props.title}</strong>&nbsp;
				{this.props.text}
			</div>
		);
	}
}

export default UINotification;
