import React, { Component } from "react";

export default class LogOut extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <button onClick={() => this.props.actions.logOutUser()}>
                Login out
			</button>
        );
    }
}