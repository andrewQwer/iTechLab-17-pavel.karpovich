import React, { Component } from "react";

class UINotification extends Component {
    componentWillUpdate = () => {
        // setTimeout(() => {
        // 	this.props.hideClick();
        // }, 5000);
    };

    render() {
        return (
            <div
                className={`alert alert-success ${!!this.props.text
                    ? "notification__block--show"
                    : "notification__block--hide"}`}
                onClick={::this.props.hideClick}
			>
    <strong>{this.props.title}</strong> & nbsp;
{ this.props.text }
			</div >
		);
	}
}

export default UINotification;