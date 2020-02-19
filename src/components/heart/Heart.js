import React from "react";
import "./style.css";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import axios from "axios";
import store from "../../store/store";
import { tokenConfig, logout } from "../../actions/authActions";
//import { returnErrors } from "../actions/errorActions";

class Heart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      likes: null,
      isChecked: false
    };
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    user: PropTypes.object,
    logout: PropTypes.func.isRequired
  };

  getLikes = async () => {
    try {
      const { data } = await axios.get(
        `https://gentle-beyond-48579.herokuapp.com/api/likes/${this.props.user._id}`,
        tokenConfig(store.getState)
      );
      this.setState(
        {
          likes: data
        },
        () => {
          if (this.state.likes !== undefined) {
            this.setState(
              {
                isChecked: this.state.likes.some(q =>
                  q.quoteId === this.props.quoteId ? q.active : false
                )
              },
              () => {
                this.heart.checked = this.state.isChecked;
              }
            );
          }
        }
      );
    } catch (err) {
      this.props.logout();
    }
  };

  componentDidMount() {
    if (this.props.isAuthenticated) {
      this.getLikes();
    }
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.isAuthenticated &&
      prevProps.quoteId !== this.props.quoteId
    ) {
      this.getLikes();
    }
  }

  handleCheckboxChange = async e => {
    const body = JSON.stringify({ active: e.target.checked });
    if (this.props.isAuthenticated) {
      try {
        await axios.put(
          `https://gentle-beyond-48579.herokuapp.com/api/likes/update/${this.props.user._id}/${this.props.quoteId}`,
          body,
          tokenConfig(store.getState)
        );
      } catch (err) {
        this.props.logout();
      }
    }
  };

  render() {
    if (!this.props.isAuthenticated) return null;
    return (
      <div id="main-content">
        <div>
          <input
            type="checkbox"
            id="checkbox"
            disabled={!this.props.isAuthenticated}
            onChange={this.handleCheckboxChange}
            ref={input => {
              this.heart = input;
            }}
          />
          <label htmlFor="checkbox">
            <svg
              id="heart-svg"
              viewBox="467 392 58 57"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g
                id="Group"
                fill="none"
                fillRule="evenodd"
                transform="translate(467 392)"
              >
                <path
                  d="M29.144 20.773c-.063-.13-4.227-8.67-11.44-2.59C7.63 28.795 28.94 43.256 29.143 43.394c.204-.138 21.513-14.6 11.44-25.213-7.214-6.08-11.377 2.46-11.44 2.59z"
                  id="heart"
                  fill="#AAB8C2"
                />
                <circle
                  id="main-circ"
                  fill="#E2264D"
                  opacity="0"
                  cx="29.5"
                  cy="29.5"
                  r="1.5"
                />
                <g id="grp7" opacity="0" transform="translate(7 6)">
                  <circle id="oval1" fill="#9CD8C3" cx="2" cy="6" r="2" />
                  <circle id="oval2" fill="#8CE8C3" cx="5" cy="2" r="2" />
                </g>
                <g id="grp6" opacity="0" transform="translate(0 28)">
                  <circle id="oval1" fill="#CC8EF5" cx="2" cy="7" r="2" />
                  <circle id="oval2" fill="#91D2FA" cx="3" cy="2" r="2" />
                </g>
                <g id="grp3" opacity="0" transform="translate(52 28)">
                  <circle id="oval2" fill="#9CD8C3" cx="2" cy="7" r="2" />
                  <circle id="oval1" fill="#8CE8C3" cx="4" cy="2" r="2" />
                </g>
                <g
                  id="grp2"
                  opacity="0"
                  transform="translate(44 6)"
                  fill="#CC8EF5"
                >
                  <circle
                    id="oval2"
                    transform="matrix(-1 0 0 1 10 0)"
                    cx="5"
                    cy="6"
                    r="2"
                  />
                  <circle
                    id="oval1"
                    transform="matrix(-1 0 0 1 4 0)"
                    cx="2"
                    cy="2"
                    r="2"
                  />
                </g>
                <g
                  id="grp5"
                  opacity="0"
                  transform="translate(14 50)"
                  fill="#91D2FA"
                >
                  <circle
                    id="oval1"
                    transform="matrix(-1 0 0 1 12 0)"
                    cx="6"
                    cy="5"
                    r="2"
                  />
                  <circle
                    id="oval2"
                    transform="matrix(-1 0 0 1 4 0)"
                    cx="2"
                    cy="2"
                    r="2"
                  />
                </g>
                <g
                  id="grp4"
                  opacity="0"
                  transform="translate(35 50)"
                  fill="#F48EA7"
                >
                  <circle
                    id="oval1"
                    transform="matrix(-1 0 0 1 12 0)"
                    cx="6"
                    cy="5"
                    r="2"
                  />
                  <circle
                    id="oval2"
                    transform="matrix(-1 0 0 1 4 0)"
                    cx="2"
                    cy="2"
                    r="2"
                  />
                </g>
                <g
                  id="grp1"
                  opacity="0"
                  transform="translate(24)"
                  fill="#9FC7FA"
                >
                  <circle id="oval1" cx="2.5" cy="3" r="2" />
                  <circle id="oval2" cx="7.5" cy="2" r="2" />
                </g>
              </g>
            </svg>
          </label>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
});

export default connect(mapStateToProps, { logout })(Heart);
