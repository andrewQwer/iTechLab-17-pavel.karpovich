import React, { PureComponent } from "react";

export default class LogOut extends PureComponent {
    logOutHandleClick = () => {
        this.props.actions.logOutUser()
    }

    render() {
        return (
            <button onClick={::this.logOutHandleClick}>
                Login out
			</button>
        );
    }
}