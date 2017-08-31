import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { bindActionCreators } from "redux";
import {
	UIActionCreators,
	UIBlackout,
	UINotification,
	UILoading,
	UIErrorPopup
} from "../index";
import { UserActionCreators } from "../../user";

class UIContainer extends PureComponent {
	showUIElement = () => {
		let style = {
			display: "block"
		};
		if (
			this.props.ui.errorCode === null &&
			this.props.ui.message === null &&
			this.props.ui.notification === null &&
			this.props.ui.loading === false
		) {
			style = {
				display: "none"
			};
		}
		return style;
	};

	renderContainer = () => {
		return (
			<div className="ui">
				<UIBlackout
					hideClick={::this.props.hideError}
					code={this.props.ui.errorCode}
					message={this.props.ui.message}
				>
					<UIErrorPopup
						code={this.props.ui.errorCode}
						message={this.props.ui.message}
						hideClick={::this.props.hideError}
					/>
				</UIBlackout>
				<UINotification
					title="Well done!"
					text={this.props.ui.notification}
					hideClick={::this.props.hideNotification}
				/>
				<UIBlackout code={this.props.ui.loading} hideClick={null}>
					<UILoading />
				</UIBlackout>
			</div>
		);
	};

	render() {
		return this.renderContainer();
	}
}

const mapStateToProps = state => ({
	ui: state.ui
});

const mapDispatchToProps = dispatch => ({
	hideError: bindActionCreators(UIActionCreators.hideError, dispatch),
	hideNotification: bindActionCreators(UIActionCreators.hideNotification, dispatch)
});

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(UIContainer)
);
