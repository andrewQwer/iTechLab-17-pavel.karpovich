import React, { Component } from "react";
import { bindActionCreators } from "redux";
import LogOut from "../logOut"
import { connect } from "react-redux";
import * as UserActions from "../../actions/userActions";
import Navbar from "../navbar";

class Home extends Component {
	render() {
		return (
			<div className="container">
				<div className="row">
					<h1>Home page</h1>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	users: state.user.users,
	user: state.user
});

const mapDispatchToProps = dispatch => ({
	userActions: bindActionCreators(UserActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);