import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import { Admin, GetUserById, UserActionCreators, UserLogOut } from "../../user";

class Navbar extends PureComponent {
    getUserNavButton() {
        return (
            <div className="navigation__buttons">
                <div className="navigation__item">
                    Welcome,{" "}
                    <Link to={`/profile/${this.props.user.login}`}>
                        {this.props.user.login}
                    </Link>!
				</div>
                <div className="navigation__item">
                    <UserLogOut actions={this.props.userActions} />
                </div>
            </div>
        );
    }

    getGuestNavButton() {
        return (
            <div className="navigation__buttons">
                <div className="navigation__item">
                    <Link to="/login">Login</Link>
                </div>
                <div className="navigation__item">
                    <Link to="/registration">Registration</Link>
                </div>
            </div>
        );
    }

    getAdminMenuButton() {
        const { user } = this.props;
        const role = user.uuid != null ? user.role : "";
        return role.Name === "Admin"
            ? <div className="navigation__admin">
                <div className="navigation__logo">
                    <Link to="/admin">Admin</Link>
                </div>
                <div className="navigation__logo">
                    <Link to="/bin">RecycleBin</Link>
                </div>
            </div>
            : "";
    }

    render() {
        const { user } = this.props;
        const navigationButtons = !user.uuid
            ? this.getGuestNavButton()
            : this.getUserNavButton();

        return (
            <div className="navigation">
                <div className="navigation__logo">
                    <Link to="/">Home</Link>
                </div>
                {this.getAdminMenuButton()}
                {navigationButtons}
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

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);