import React, { PureComponent } from "react";
import classNames from "classnames";

class AdminPaginationItem extends PureComponent {
	render() {
		const { currentPage, limitation, label } = this.props;
		return (
			<li
				className={classNames("page-item", {
					disabled: currentPage == limitation
				})}
			>
				<a className="page-link" onClick={::this.props.changePageHandler}>
					{label}
				</a>
			</li>
		);
	}
}

export default AdminPaginationItem;
