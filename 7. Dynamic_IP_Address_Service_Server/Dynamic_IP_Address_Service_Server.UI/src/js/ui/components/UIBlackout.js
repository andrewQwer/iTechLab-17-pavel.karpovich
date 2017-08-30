import React, { Component } from "react";
import PropTypes from "prop-types";

class UIBlackout extends Component {
    render() {
        return !!this.props.hideClick
            ? <div
                onClick={::this.props.hideClick}
    className = {
						!!this.props.code || !!this.props.message
    ? "error__popup--show"
    : "error__popup--hide"
					}
				>
    { this.props.children }
				</div >
			: <div
    className={
        !!this.props.code || !!this.props.message
            ? "error__popup--show"
            : "error__popup--hide"
    }
>
    {this.props.children}
</div>;
	}
}

export default UIBlackout;