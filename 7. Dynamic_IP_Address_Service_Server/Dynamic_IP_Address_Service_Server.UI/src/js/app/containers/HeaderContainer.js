import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { UserActionCreators } from "../../user";
import { Navbar } from "../index";

class HeaderContainer extends Component {
    render() {
        return (
            <div className="main__header">
                <div className="container">
                    <Navbar />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    users: state.user.users,
    user: state.user
});

const mapDispatchToProps = dispatch => ({
    userActions: bindActionCreators(UserActionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);