import React, { Component } from "react";
import { bindActionCreators } from "redux";
import LoginOut from "../loginOut"
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as UserActions from "../../actions/userActions";

class Home extends Component {
	render() {
		return (!this.props.user.uuid) ? (
			<div>
				<Link to="/login">Login</Link> 
				<Link to="/register">Register</Link>
			</div>
		) : (
			<div>
				Login: {this.props.users.find((item)=>item.uuid === this.props.user.uuid).login}
				<LoginOut actions={this.props.userActions} />
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