import React from "react";
import "../App.css";
import axios from "axios";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import store from "../store/store";
import { tokenConfig } from "../actions/authActions";
import Heart from "./heart/Heart";
import TweetThis from "./TweetThis";
import { Table } from "reactstrap";

const TableItem = props => {
  return (
    <tr>
      <th scope="row">{props.index}</th>
      <td style={{ fontSize: 26 }}>{props.text}</td>
      <td style={{ fontSize: 24 }}>{props.author}</td>
      <td style={{ fontSize: 22 }}>{props.type}</td>
      <td>
        <TweetThis text={props.text} author={props.author} />
      </td>
      <td>
        <Heart quoteId={props.id} />
      </td>
    </tr>
  );
};

class Likes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      likes: [],
      quotesData: [],
      isLoading: true
    };
  }

  static propTypes = {
    user: PropTypes.object
  };

  async componentDidMount() {
    if (this.props.user !== null) {
      const lData = (
        await axios.get(
          `https://gentle-beyond-48579.herokuapp.com/api/likes/${this.props.user._id}`,
          tokenConfig(store.getState)
        )
      ).data;
      const body = JSON.stringify({
        likes: lData.reduce(
          (accu, curr) => (curr.active ? [...accu, curr.quoteId] : accu),
          []
        )
      });
      console.table(body);
      let qData = (
        await axios.post(
          "https://gentle-beyond-48579.herokuapp.com/api/quotes/liked",
          body,
          tokenConfig(store.getState)
        )
      ).data;
      qData = JSON.parse(body).likes.map(l => qData.find(q => l === q._id));
      console.log(JSON.parse(body).likes);
      console.log(qData);
      this.setState({
        likes: lData,
        quotesData: qData
      });
      if (this.state.quotesData !== []) this.setState({ isLoading: false });
    }
  }

  render() {
    let elements = [];
    for (let i = 0; i < this.state.quotesData.length; i++) {
      elements.push(
        <TableItem
          index={i + 1}
          id={this.state.quotesData[i]._id}
          text={this.state.quotesData[i].text}
          author={this.state.quotesData[i].author}
          type={this.state.quotesData[i].type}
          key={i}
        />
      );
    }
    return this.state.isLoading ? (
      <div className="lds-ripple">
        <div></div>
        <div></div>
      </div>
    ) : (
      <div>
        <Table dark striped>
          <thead>
            <tr>
              <th>#</th>
              <th>Quote</th>
              <th>Author</th>
              <th>Type</th>
              <th>Tweet</th>
              <th>Like</th>
            </tr>
          </thead>
          <tbody>{elements}</tbody>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps, null)(Likes);
