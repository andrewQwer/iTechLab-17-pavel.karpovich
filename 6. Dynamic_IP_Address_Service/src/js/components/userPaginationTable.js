import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as UserActions from "../actions/userActions";
import PaginationItem from "./paginationItem";
import UserTableItem from "./userTableItem";

class UserPaginationTable extends Component {
	constructor(props) {
		super(props);
		this.state = { currentPage: 1 };
	}

	set currentPage(pageNumber) {
		this.setState({ currentPage: pageNumber });
	}

	get currentPage() {
		return this.state.currentPage;
	}

	calculatePaginationProps() {
		const { currentPage } = this.state;
		let indexOfLastUser = currentPage * this.props.userPerPage;
		let indexOfFirstUser = indexOfLastUser - this.props.userPerPage;
		this.currentUsers = this.props.users.slice(
			indexOfFirstUser,
			indexOfLastUser
		);
	}

	changePageHandler(event) {
		let pageNumber = event.target.textContent;
		if (pageNumber === "First") pageNumber = 1;
		else if (pageNumber === "Previous") pageNumber = --this.currentPage;
		else if (pageNumber === "Next") pageNumber = ++this.currentPage;
		else if (pageNumber === "Last") pageNumber = this.pageCount;
		this.currentPage = pageNumber;
	}

	clickOnUserHandler(event) {
		this.props.userActions.addUserToBasket(item.uuid);
	}

	//BUG: pageNumber > pageCount
	renderPageNumbers() {
		const { currentPage } = this.state;
		this.pageCount = Math.ceil(
			this.props.users.length / this.props.userPerPage
		);
		let pageNumbers = [...new Array(this.pageCount).keys()].map(item => ++item);
		const renderPageNumbers = pageNumbers.map((item, index) =>
			<PaginationItem
				label={item}
				currentPage={this.currentPage}
				limitation={item}
				changePageHandler={::this.changePageHandler}
				style="active"
			/>
		);
		return ![0, 1].includes(this.pageCount)
			? <ul className="pagination">
					<PaginationItem
						label="First"
						currentPage={this.currentPage}
						limitation={1}
						changePageHandler={::this.changePageHandler}
						style="disabled"
					/>
					<PaginationItem
						label="Previous"
						currentPage={this.currentPage}
						limitation={1}
						changePageHandler={::this.changePageHandler}
						style="disabled"
					/>
					{renderPageNumbers}
					<PaginationItem
						label="Next"
						currentPage={this.currentPage}
						limitation={this.pageCount}
						changePageHandler={::this.changePageHandler}
						style="disabled"
					/>
					<PaginationItem
						label="Last"
						currentPage={this.currentPage}
						limitation={this.pageCount}
						changePageHandler={::this.changePageHandler}
						style="disabled"
					/>
				</ul>
			: null;
	}

	renderUsersTable() {
		const renderUsers = (
			<table className="table table-hover">
				<tbody>
					<tr className="thead">
						<td>Login</td>
						<td>Email</td>
						<td>First name</td>
						<td>Last name</td>
					</tr>
					{this.currentUsers.map((item, index) =>
						<UserTableItem key={index} user={item} />
					)}
				</tbody>
			</table>
		);
		return renderUsers;
	}

	render() {
		this.calculatePaginationProps();
		return (
			<div>
				{this.renderUsersTable()}
				{this.renderPageNumbers()}
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

export default connect(mapStateToProps, mapDispatchToProps)(
	UserPaginationTable
);
