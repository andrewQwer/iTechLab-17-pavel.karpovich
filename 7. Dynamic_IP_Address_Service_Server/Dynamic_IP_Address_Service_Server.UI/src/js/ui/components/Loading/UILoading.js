import React, { PureComponent } from "react";

const UILoading = () =>
	<div className="progress loading">
		<div
			className="progress-bar-animated progress-bar-striped"
			style={{ width: "100%" }}
		>
			Loading...
		</div>
	</div>;

export default UILoading;
