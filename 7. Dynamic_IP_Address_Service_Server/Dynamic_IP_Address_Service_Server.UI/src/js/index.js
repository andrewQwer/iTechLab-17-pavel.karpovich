import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Main, Header, Footer } from "./app";
import { UIContainer } from "./ui";
import { UserActionCreators } from "./user";

class App extends Component {
    componentWillMount() {
        this.props.UserActionCreators.checkAuth()
    }

    render() {
        return (
            <BrowserRouter>
                <div className="main">
                    <Header />
                    <Main />
                    <Footer />
                    <UIContainer />
                </div>
            </BrowserRouter>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user
});

const mapDispatchToProps = dispatch => ({
    UserActionCreators: bindActionCreators(UserActionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);