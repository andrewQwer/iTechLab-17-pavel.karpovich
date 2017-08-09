import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as UserActions from "../actions/userActions";
import PaginationItem from "./paginationItem";
import UserTableItem from "./userTableItem";

class UserPaginationTable extends Component {
	constructor(props) {
		super(props);
		this.state = { currentPage: 1, sortType: "Login", isReverse: false };
	}

	set currentPage(pageNumber) {
		this.setState({ currentPage: pageNumber });
	}

	get currentPage() {
		return this.state.currentPage;
	}

	set sortType(type) {
		this.setState({sortType: type})
	}

	get sortType() {
		return this.state.sortType;
	}

	set isReverse(reverse) {
		this.setState({isReverse: reverse})
	}

	get isReverse() {
		return this.state.isReverse;
	}

	calculatePaginationProps() {
		const { currentPage } = this.state;
		let indexOfLastUser = currentPage * this.props.userPerPage;
		let indexOfFirstUser = indexOfLastUser - this.props.userPerPage;
		this.currentUsers = this.props.items.slice(
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

	clickOnSortHandler(event) {
		let type = event.target.textContent;
		this.isReverse = (this.sortType == type) ? !this.isReverse : false;
		this.sortType = type;
	}

	sortUser() {
		let sortType = this.state.sortType;
		let outputArray = this.currentUsers.slice() || [];
		if (sortType === "Login") {
			outputArray = outputArray.sort((a, b) => a.login.localeCompare(b.login));
		} else if (sortType === "Email") {
			outputArray = outputArray.sort((a, b) => a.email.localeCompare(b.email));
		} else if (sortType === "First Name") {
			outputArray = outputArray.sort((a, b) => a.firstName.localeCompare(b.firstName));
		} else if (sortType === "Last Name") {
			outputArray.sort((a, b) => a.lastName.localeCompare(b.lastName));
		}
		return (this.isReverse) ? outputArray.reverse() : outputArray;
	}

	clickOnUserHandler(event) {
		let loginValue = $(event.target.closest("td")).siblings("#login").get(0)
			.innerText;
		this.props.navigate(`/profile/${loginValue}`);
	}

	//BUG: pageNumber > pageCount
	renderPageNumbers() {
		const { currentPage } = this.state;
		this.pageCount = Math.ceil(
			this.props.items.length / this.props.userPerPage
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

	//BUG: highlighting selected item after page changed in all mode
	renderUsersTable() {
		this.props.disableAllHighlights();
		this.props.uncheckedAllCheckBoxes();
		const renderUsers = (
			<table className="table table-hover">
				<tbody>
					<tr className="thead">
						<td />
						<td onClick={::this.clickOnSortHandler}>Login</td>
						<td onClick={::this.clickOnSortHandler}>Email</td>
						<td onClick={::this.clickOnSortHandler}>First name</td>
						<td onClick={::this.clickOnSortHandler}>Last name</td>
					</tr>
					{this.sortUser().map((item, index) =>
						<UserTableItem
							key={index}
							user={item}
							deleteArray={this.props.deleteUserArray}
							clickOnUserHandler={::this.clickOnUserHandler}
							selectUserHandler={::this.props.selectUser}
						/>
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
	ips: state.ip.ips
});

const mapDispatchToProps = dispatch => ({
	userActions: bindActionCreators(UserActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(
	UserPaginationTable
);
