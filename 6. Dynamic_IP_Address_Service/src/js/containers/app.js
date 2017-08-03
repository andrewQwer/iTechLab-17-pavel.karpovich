import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Register from "../components/register";
import LoginIn from "../components/loginIn";
import LoginOut from "../components/loginOut";
import * as UserActions from "../actions/userActions";
import { BrowserRouter, Route, Switch } from "react-router-dom";

class App extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				{/* <Register actions={this.props.userActions} />
				<LoginIn actions={this.props.userActions} />
				<LoginOut actions={this.props.userActions} /> */}
				<BrowserRouter>
					<Switch>
						<Route exact path="/" component={LoginIn} />
						<Route path="/register" component={Register} />
					</Switch>
				</BrowserRouter>
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
