import React, { PureComponent } from "react";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import {
	AdminActionCreators,
	AdminPaginationTable,
	AdminSelectItemPerPage
} from "../index";

class AdminRecycleBinContainer extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			toDelete: [],
			userPerPage: 3
		};
	}

	componentWillMount() {
		this.props.getAllUserInBin();
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
			this.props.deleteUserFromBin(this.toDeleteArray);
		}
	}

	restoreButtonClickHandler(event) {
		this.props.restoreUserFromBin(this.toDeleteArray);
	}

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
		let uuidValue = $(event.target.closest("td")).siblings("#uuid").get(0)
			.innerText;
		let original = this.toDeleteArray;
		original.includes(uuidValue)
			? original.splice(original.indexOf(uuidValue), 1)
			: original.push(uuidValue);
		this.toDeleteArray = [...original];
		event.stopPropagation();
	}

	render() {
		return (
			<div className="admin">
				<h4>RecycleBin</h4>
				<button
					className="btn btn-success"
					onClick={::this.deleteButtonClickHandler}
				>
					Delete users
				</button>
				<button
					className="btn btn-success navigation__item"
					onClick={::this.restoreButtonClickHandler}
				>
					Restore users
				</button>
				<AdminSelectItemPerPage setItemCount={::this.setItemCount} />
				<AdminPaginationTable
					items={this.props.admin.bin}
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
	admin: state.admin
});

const mapDispatchToProps = dispatch => ({
    getAllUserInBin: bindActionCreators(AdminActionCreators.getAllUserInBin, dispatch),
    restoreUserFromBin: bindActionCreators(AdminActionCreators.restoreUserFromBin, dispatch),
    deleteUserFromBin: bindActionCreators(AdminActionCreators.deleteUserFromBin, dispatch)
});

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(AdminRecycleBinContainer)
);
