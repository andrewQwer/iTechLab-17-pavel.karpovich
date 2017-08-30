import React, { PureComponent } from 'react';

class UILoading extends PureComponent {
    render() {
        return (
            <div className="progress loading">
                <div className="progress-bar-animated progress-bar-striped" style={{ width: "100%" }}>Loading...</div>
            </div>
        );
    }
}

export default UILoading;