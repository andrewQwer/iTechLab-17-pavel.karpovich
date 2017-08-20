import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
	AdminPaginationTable,
	AdminSelectItemPerPage,
	AdminActionCreators
} from "../index";

class AdminPanelContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			toDelete: [],
			userPerPage: 20
		};
	}

	componentWillMount() {
		this.props.AdminActionCreators.getAllUsers();
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
		this.props.AdminActionCreators.moveToBin(this.toDeleteArray);
		this.disableAllHighlights();
		this.uncheckedAllCheckBoxes();
	}

	getPremiumClickHandler(event) {
		this.props.AdminActionCreators.getPremiumAccess(this.toDeleteArray);
		this.disableAllHighlights();
		this.uncheckedAllCheckBoxes();
	}

	disableAllHighlights() {
		let trs = document.querySelectorAll("tr");
		for (let item of trs) {
			if ($(item).hasClass("table-danger")) {
				$(item).removeClass("table-danger");
			}
		}
	}

	uncheckedAllCheckBoxes() {
		let checkBoxes = document.querySelectorAll("input[type=checkbox]");
		for (let item of checkBoxes) {
			if ($(item).get(0).checked) {
				$(item).prop("checked", false);
			}
		}
	}

	setItemCount(event) {
		let value =
			event.target.textContent == "ALL"
				? this.props.users.length
				: parseInt(event.target.textContent);
		this.setState({ userPerPage: value });
	}

	navigate(to) {
		this.props.history.push(to);
	}

	selectUserHandler(event) {
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
		return (
			<div className="admin">
				<AdminSelectItemPerPage setItemCount={::this.setItemCount} />
				<h1>Admin Panel</h1>
				<button
					className="btn btn-success navigation__item"
					onClick={::this.deleteButtonClickHandler}
				>
					Delete
				</button>
				<button
					className="btn btn-success navigation__item"
					onClick={::this.getPremiumClickHandler}
				>
					Change account type
				</button>
				<AdminPaginationTable
					disableAllHighlights={::this.disableAllHighlights}
					uncheckedAllCheckBoxes={::this.uncheckedAllCheckBoxes}
					deleteUserArray={this.state.toDelete}
					items={this.props.admin.users}
					navigate={::this.navigate}
					selectUser={::this.selectUserHandler}
					userPerPage={this.state.userPerPage}
				/>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	admin: state.admin
});

const mapDispatchToProps = dispatch => ({
	AdminActionCreators: bindActionCreators(AdminActionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(
	AdminPanelContainer
);
