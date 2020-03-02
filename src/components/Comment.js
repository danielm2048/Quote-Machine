import React from "react";
import { Media } from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class Comment extends React.Component {
  static propTypes = {
    user: PropTypes.object
  };

  render() {
    return (
      <div className="commentBox" style={{ margin: 5 }}>
        <Media>
          <Media left href="#" style={{ marginRight: 10, marginLeft: 5 }}>
            <i className="fa fa-user fa-xs"></i>
          </Media>
          <Media body style={{ fontSize: 18 }}>
            <Media heading style={{ fontSize: 14 }}>
              {this.props.userName}
            </Media>
            {this.props.text}
            <Media bottom style={{ fontSize: 12, marginTop: 5 }}>
              {new Date(this.props.date).toLocaleDateString()}
            </Media>
          </Media>
          <Media
            right
            href="#"
            hidden={
              !(this.props.user === null
                ? false
                : this.props.user.name === this.props.userName)
            }
            style={{ marginRight: 10, marginLeft: 5, fontSize: "1rem" }}
            onClick={() => this.props.deleteComment(this.props.commentId)}
          >
            <span style={{ color: "Tomato" }}>
              <i className="fa fa-times fa-xs"></i>
            </span>
          </Media>
        </Media>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps, null)(Comment);
