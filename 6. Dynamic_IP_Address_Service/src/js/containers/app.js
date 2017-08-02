import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Register from "../components/register";
import * as UserActions from "../actions/userActions";

class App extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<Register actions={this.props.userActions} />
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
