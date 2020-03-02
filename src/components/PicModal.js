import React from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Input,
  Alert,
  Button
} from "reactstrap";
import { Link } from "react-router-dom";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { connect } from "react-redux";
import { tokenConfig, logout } from "../actions/authActions";
import store from "../store/store";
import PropTypes from "prop-types";
import axios from "axios";

import Comment from "./Comment";

class PicModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      msg: null,
      comments: []
    };
    this.textArea = React.createRef();
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    user: PropTypes.object,
    logout: PropTypes.func.isRequired
  };

  getComments = async () => {
    const { data } = await axios.get(
      `https://gentle-beyond-48579.herokuapp.com/api/comments/${this.props.id}`
    );
    this.setState(
      {
        comments: data
      },
      () => {
        if (this.state.comments.length === 0) {
          this.setState({
            msg: "No comments to show here!"
          });
        } else {
          this.setState({
            msg: null
          });
        }
      }
    );
  };

  postComment = async text => {
    const body = JSON.stringify({
      userName: this.props.user.name,
      quoteId: this.props.id,
      text
    });
    try {
      await axios.post(
        "https://gentle-beyond-48579.herokuapp.com/api/comments/add",
        body,
        tokenConfig(store.getState)
      );
      this.textArea.current.value = "";
      this.getComments();
    } catch (err) {
      this.props.logout();
    }
  };

  deleteComment = async commentId => {
    try {
      await axios.delete(
        `https://gentle-beyond-48579.herokuapp.com/api/comments/delete/${commentId}`,
        tokenConfig(store.getState)
      );
      this.getComments();
    } catch (err) {
      this.props.logout();
    }
  };

  componentDidMount() {
    this.getComments();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.id !== this.props.id) {
      this.getComments();
    }
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const { text } = this.state;

    this.postComment(text);
  };

  render() {
    let elements = [];
    for (let i = 0; i < this.state.comments.length; i++) {
      elements.push(
        <Comment
          commentId={this.state.comments[i]._id}
          userName={this.state.comments[i].userName}
          text={this.state.comments[i].text}
          date={this.state.comments[i].createdAt}
          deleteComment={this.deleteComment}
          key={i}
        />
      );
    }
    return (
      <div>
        <Link onClick={this.toggle} to="#">
          <ReactCSSTransitionGroup
            transitionName="fade"
            transitionEnterTimeout={300}
            transitionLeaveTimeout={300}
          >
            <img
              className="picture-size"
              key={this.props.picture}
              src={this.props.picture}
              alt="Imagine this is the person please!"
            />
          </ReactCSSTransitionGroup>
        </Link>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Comments</ModalHeader>
          <ModalBody>
            {this.state.msg ? (
              <Alert color="danger" style={{ fontSize: 24 }}>
                {this.state.msg}
              </Alert>
            ) : null}
            {elements}
            {this.props.isAuthenticated ? (
              <Form onSubmit={this.onSubmit}>
                <FormGroup>
                  <Input
                    type="textarea"
                    name="text"
                    id="comment"
                    placeholder={"Comment here please...\nBe nice!"}
                    className="mb-3"
                    onChange={this.onChange}
                    innerRef={this.textArea}
                  />
                  <Button
                    color="dark"
                    style={{ marginTop: 10, marginLeft: 200 }}
                  >
                    Comment
                  </Button>
                </FormGroup>
              </Form>
            ) : null}
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
});

export default connect(mapStateToProps, { logout })(PicModal);
