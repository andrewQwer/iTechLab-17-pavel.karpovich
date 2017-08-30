import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

class UIBlackout extends Component {
	render() {
		const { code, message, children } = this.props;
		let popupShowCondition = !!code || !!message;
		return !!this.props.hideClick
			? <div
					onClick={::this.props.hideClick}
					className={classNames(
						{ "error__popup--show": popupShowCondition },
						{ "error__popup--hide": !popupShowCondition }
					)}
				>
					{children}
				</div>
			: <div
					className={classNames(
						{ "error__popup--show": popupShowCondition },
						{ "error__popup--hide": !popupShowCondition }
					)}
				>
					{children}
				</div>;
	}
}

export default UIBlackout;
