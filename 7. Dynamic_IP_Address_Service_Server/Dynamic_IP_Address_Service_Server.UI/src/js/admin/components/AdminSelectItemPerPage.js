import React, { Component } from "react";

class AdminSelectItemPerPage extends Component {
    renderItems() {
        return (
            <ul className="pagination">
                <li>
                    <a className="page-link" onClick={::this.props.setItemCount}>
						20
					</a>
				</li>
            <li>
                <a className="page-link" onClick={::this.props.setItemCount}>
						50
					</a>
				</li >
            <li>
                <a className="page-link" onClick={::this.props.setItemCount}>
						100
					</a>
				</li >
            <li>
                <a className="page-link" onClick={::this.props.setItemCount}>
						ALL
					</a>
				</li >
			</ul >
		);
    }

    render() {
        return this.renderItems();
    }
}

export default AdminSelectItemPerPage;