import React, { Component } from "react";

class paginationItem extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<li
				className={`page-item ${this.props.currentPage == this.props.limitation ? this.props.style : ""}`}
			>
				<a className="page-link" onClick={::this.props.changePageHandler}>
					{this.props.label}
				</a>
			</li>
		);
	}
}

export default paginationItem;
