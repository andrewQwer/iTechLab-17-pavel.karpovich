import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {UserActionCreators, UserPaginationTable, UserSelectItemPerPage} from "../index"

class RecycleBinContainer extends Component {
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
		if (confirm("Do you really want to delete these users?")) {
			this.props.UserActionCreators.deleteUserFromBin(this.toDeleteArray);
			this.disableAllHighlights();
			this.uncheckedAllCheckBoxes();
		}
	}

	restoreButtonClickHandler(event) {
		this.props.UserActionCreators.restoreUserFromBin(this.toDeleteArray);
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
		return (
			<div className="admin">
				<h4>RecycleBin</h4>
				<button onClick={::this.deleteButtonClickHandler}>Delete users</button>
				<button onClick={::this.restoreButtonClickHandler}>
					Restore users
				</button>
				<UserSelectItemPerPage setItemCount={::this.setItemCount} />
				<UserPaginationTable
					items={this.props.bin}
					disableAllHighlights={::this.disableAllHighlights}
					uncheckedAllCheckBoxes={::this.uncheckedAllCheckBoxes}
					deleteUserArray={this.state.toDelete}
					navigate={::this.navigate}
					selectUser={::this.selectUserHandler}
					userPerPage={this.state.userPerPage}
				/>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	user: state.user,
	users: state.user.users,
	bin: state.user.basket,
	ips: state.ip.ips
});

const mapDispatchToProps = dispatch => ({
	UserActionCreators: bindActionCreators(UserActionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(
	RecycleBinContainer
);
