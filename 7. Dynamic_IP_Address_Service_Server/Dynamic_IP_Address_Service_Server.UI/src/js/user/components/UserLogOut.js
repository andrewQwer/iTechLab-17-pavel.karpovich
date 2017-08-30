import React, { PureComponent } from "react";

export default class LogOut extends PureComponent {
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