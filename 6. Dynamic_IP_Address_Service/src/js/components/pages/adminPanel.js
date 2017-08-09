import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as UserActions from "../../actions/userActions";
import UserPaginationTable from "../userPaginationTable";

class AdminPanel extends Component {
	constructor(props) {
		super(props);

		this.state = {
			toDelete: [],
			userPerPage: 3
		};
	}

	
	set toDeleteArray(array) {
		this.setState({ toDelete: array });
	}

	get toDeleteArray() {
		return this.state.toDelete;
	}

	handlerClick(event) {
		this.setState({ currentPage: event.target.textContent });
	}

	deleteButtonClickHandler(event) {
		this.props.userActions.addUserToBasket(this.toDeleteArray)
	}

	// TODO: change output count
	setItemCount(event) {
		let value =
			event.target.textContent == "all"
				? this.props.users.length
				: parseInt(event.target.textContent);
		this.setState({ userPerPage: value });
	}

	navigate(to) {
		this.props.history.push(to);
	}

	selectUserHandler(event) {
		let $tr = $(event.target.closest("tr"));
		let styleName = "table-danger";
		$tr.hasClass(styleName)
			? $tr.removeClass(styleName)
			: $tr.addClass(styleName);
		let uuidValue = $(event.target.closest("td")).siblings("#uuid").get(0)
			.innerText;
		let original = this.toDeleteArray;
		original.includes(uuidValue)
			? original.splice(original.indexOf(uuidValue), 1)
			: original.push(uuidValue);
		this.toDeleteArray = original;
		event.stopPropagation();
	}

	render() {
		//BUG: highlight item count
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
				<button onClick={::this.deleteButtonClickHandler}>Delete</button>
				<UserPaginationTable navigate={::this.navigate} selectUser={::this.selectUserHandler} userPerPage={this.state.userPerPage} />
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
