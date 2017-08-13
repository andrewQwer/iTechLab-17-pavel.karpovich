import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as UserActions from "../actions/userActions";
import Navbar from "../components/navbar";

class Home extends Component {
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
	userActions: bindActionCreators(UserActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
