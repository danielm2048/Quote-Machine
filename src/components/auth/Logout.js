import React from "react";
import { connect } from "react-redux";
import { logout } from "../../actions/authActions";
import { NavLink } from "reactstrap";
import PropTypes from "prop-types";

class Logout extends React.Component {
  static propTypes = {
    logout: PropTypes.func.isRequired
  };
  render() {
    return (
      <React.Fragment>
        <NavLink onClick={this.props.logout} href="/Quote-Machine/">
          Logout
        </NavLink>
      </React.Fragment>
    );
  }
}

export default connect(null, { logout })(Logout);
