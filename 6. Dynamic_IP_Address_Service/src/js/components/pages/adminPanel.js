import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as UserActions from "../../actions/userActions";
import UserPaginationTable from "../userPaginationTable";

class AdminPanel extends Component {
	constructor(props) {
		super(props);

		this.state = {
			users: this.props.users,
			userPerPage: 3
		};
	}

	handlerClick(event) {
		this.setState({ currentPage: event.target.textContent });
	}

	// TODO: change output count
	setItemCount(event) {
		let value =
			event.target.textContent == "all"
				? this.props.users.length
				: parseInt(event.target.textContent);
		this.setState({ userPerPage: value });
	}

	render() {

		return (
			<div>
				<ul className="pagination">
					<li>
						<a className="page-link" onClick={::this.setItemCount}>
							1
						</a>
					</li>
					<li>
						<a className="page-link" onClick={::this.setItemCount}>
							2
						</a>
					</li>
					<li>
						<a className="page-link" onClick={::this.setItemCount}>
							3
						</a>
					</li>
					<li>
						<a className="page-link" onClick={::this.setItemCount}>
							all
						</a>
					</li>
				</ul>
				<h1>Admin Panel</h1>
				<UserPaginationTable userPerPage={this.state.userPerPage} />
			</div>
		);
	}
}

const mapStateToProps = state => ({
	user: state.user,
	users: state.user.users,
	ips: state.ip.ips
});

const mapDispatchToProps = dispatch => ({
	userActions: bindActionCreators(UserActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminPanel);
