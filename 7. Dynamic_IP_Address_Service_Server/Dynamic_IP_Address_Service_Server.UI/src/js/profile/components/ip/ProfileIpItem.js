import React, { PureComponent } from "react";
import PropTypes from "prop-types";

class ProfileIpItem extends PureComponent {
    static PropTypes = {
        editClick: PropTypes.func.isRequired,
        domain: PropTypes.string.isRequired,
        ip: PropTypes.string.isRequired,
        uuid: PropTypes.string.isRequired,
        updateTime: PropTypes.string.isRequired
    };

    editButtonClick = () => {
        this.props.editClick(
            this.props.uuid,
            this.props.ip,
            this.props.domain,
            true, // isEditForm
            false // isHideForm
        );
    };

    deleteButtonClick = () => {
        this.props.deleteClick(this.props.uuid);
    };

    render() {
        return (
            <tr>
                <td>
                    {this.props.ip}
                </td>
                <td>
                    {this.props.domain}
                </td>
                <td>
                    <button className="btn btn-success" onClick={::this.editButtonClick}>
						Edit
					</button>
				</td>
            <td>
                <button
                    className="btn btn-success"
                    onClick={::this.deleteButtonClick}
					>
						Delete
					</button>
				</td >
            <td>
                {this.props.updateDate}
            </td>
			</tr >
		);
    }
}

export default ProfileIpItem;