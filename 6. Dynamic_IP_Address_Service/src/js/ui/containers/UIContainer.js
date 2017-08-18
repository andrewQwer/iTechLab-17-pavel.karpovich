import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
	UIActionCreators,
	UIBlackout,
	UINotification,
	UILoading,
	UIErrorPopup
} from "../index";

class UIContainer extends Component {
	showUIElement = () => {
		let style = {
			display: "block"
		};
		if (
			this.props.ui.errorCode === null &&
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
			<div className="ui" style={this.showUIElement()}>
				<UIBlackout
					hideClick={::this.props.UIActionCreators.hideError}
					code={this.props.ui.errorCode}
				>
					<UIErrorPopup
						code={this.props.ui.errorCode}
						hideClick={::this.props.UIActionCreators.hideError}
					/>
				</UIBlackout>
				<UINotification
					title="Well done!"
					text={this.props.ui.notification}
					hideClick={::this.props.UIActionCreators.hideNotification}
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
	UIActionCreators: bindActionCreators(UIActionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(UIContainer);
