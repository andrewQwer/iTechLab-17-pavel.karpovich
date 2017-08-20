import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { UserActionCreators, UserLogOut } from "../../user";

class HomeContainer extends Component {
	render() {
		return (
			<div className="container">
				<div className="row">
					<h1>Home page</h1>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
