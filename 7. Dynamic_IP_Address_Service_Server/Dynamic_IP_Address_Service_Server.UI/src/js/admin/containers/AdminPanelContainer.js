import React, { PureComponent } from "react";
import { withRouter } from "react-router";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
	AdminPaginationTable,
	AdminSelectItemPerPage,
	AdminActionCreators
} from "../index";

class AdminPanelContainer extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			toDelete: [],
			userPerPage: 20
		};
	}

	componentWillMount() {
		this.props.getAllUsers();
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
		this.props.moveToBin(this.toDeleteArray);
	}

	getPremiumClickHandler(event) {
		this.props.getPremiumAccess(this.toDeleteArray);
		this.toDeleteArray = [];
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
		this.toDeleteArray = [...original];
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
    getAllUsers: bindActionCreators(AdminActionCreators.getAllUsers, dispatch),
    moveToBin: bindActionCreators(AdminActionCreators.moveToBin, dispatch),
    getPremiumAccess: bindActionCreators(AdminActionCreators.getPremiumAccess, dispatch)
});

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(AdminPanelContainer)
);
