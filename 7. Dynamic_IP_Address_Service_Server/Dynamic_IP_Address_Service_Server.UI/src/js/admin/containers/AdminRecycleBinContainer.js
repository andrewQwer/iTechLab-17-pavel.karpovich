import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
    AdminActionCreators,
    AdminPaginationTable,
    AdminSelectItemPerPage
} from "../index";

class AdminRecycleBinContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            toDelete: [],
            userPerPage: 3
        };
    }

    componentWillMount() {
        this.props.AdminActionCreators.getAllUserInBin();
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
            this.props.AdminActionCreators.deleteUserFromBin(this.toDeleteArray);
            this.disableAllHighlights();
            this.uncheckedAllCheckBoxes();
        }
    }

    restoreButtonClickHandler(event) {
        this.props.AdminActionCreators.restoreUserFromBin(this.toDeleteArray);
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
        this.toDeleteArray = original;
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
				</button >
    <AdminSelectItemPerPage setItemCount={::this.setItemCount} />
    <AdminPaginationTable
        items={this.props.admin.bin}
        disableAllHighlights={::this.disableAllHighlights}
        uncheckedAllCheckBoxes={::this.uncheckedAllCheckBoxes}
        deleteUserArray={this.state.toDelete}
        navigate={::this.navigate}
        selectUser={::this.selectUserHandler}
        userPerPage={this.state.userPerPage}
    />
			</div >
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
    AdminRecycleBinContainer
);