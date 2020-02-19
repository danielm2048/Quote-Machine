import React from "react";
import "../App.css";
import axios from "axios";
import Heart from "./heart/Heart";
import Pic from "./Pic";
import NewQuoteButton from "./NewQuoteButton";
import TweetThis from "./TweetThis";
import MadeBy from "./MadeBy";

let rand = Math.floor(Math.random() * 10);

class Quotes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      quotes: [],
      checkedQuotes: [],
      order: rand,
      id: "",
      text: "",
      author: "",
      picture: ""
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleDropDownChange = this.handleDropDownChange.bind(this);
  }

  handleClick() {
    if (this.state.checkedQuotes.length === 0) {
      this.setState({
        id: "",
        text: "No quotes to show!!",
        author: "",
        picture: ""
      });
    } else {
      if (
        this.state.order === this.state.checkedQuotes.length - 1 ||
        this.state.checkedQuotes.length <= this.state.order
      ) {
        this.setState(
          {
            order: 0
          },
          () =>
            this.setState({
              id: this.state.checkedQuotes[this.state.order]._id,
              text: this.state.checkedQuotes[this.state.order].text,
              author: this.state.checkedQuotes[this.state.order].author,
              picture: this.state.checkedQuotes[this.state.order].picture
            })
        );
      } else {
        this.setState(
          {
            order: this.state.order + 1
          },
          () =>
            this.setState({
              id: this.state.checkedQuotes[this.state.order]._id,
              text: this.state.checkedQuotes[this.state.order].text,
              author: this.state.checkedQuotes[this.state.order].author,
              picture: this.state.checkedQuotes[this.state.order].picture
            })
        );
      }
    }
  }

  handleDropDownChange(type) {
    switch (type) {
      case "AllT":
        this.state.quotes.map(quote => (quote.isChecked = true));
        this.setState({ checkedQuotes: this.state.quotes });
        break;
      case "AllF":
        this.state.quotes.map(quote => (quote.isChecked = false));
        this.setState({ checkedQuotes: [] });
        break;
      default:
        let temp = this.state.quotes.reduce((filtered, quote) => {
          if (quote.type === type) {
            quote.isChecked = !quote.isChecked;
          }
          if (quote.isChecked) filtered.push(quote);
          return filtered;
        }, []);
        this.setState({ checkedQuotes: temp });
        break;
    }
  }

  async componentDidMount() {
    const { data } = await axios.get(
      "https://gentle-beyond-48579.herokuapp.com/api/quotes"
    );
    data.map(q => (q.isChecked = true));
    this.setState(
      {
        quotes: data,
        checkedQuotes: data
      },
      () =>
        this.setState({
          id: this.state.checkedQuotes[rand]._id,
          text: this.state.checkedQuotes[rand].text,
          author: this.state.checkedQuotes[rand].author,
          picture: this.state.checkedQuotes[rand].picture
        })
    );
    if (this.state.checkedQuotes !== []) this.setState({ loading: false });
    let arr = [...document.getElementsByClassName("check")];
    arr.map(ch => (ch.checked = true));
    const menu = document.getElementById("menu");
    if (menu) {
      menu.addEventListener(
        "click",
        e => {
          e.stopPropagation();
        },
        false
      );
      menu.addEventListener(
        "change",
        e => {
          if (e.target.checked && e.target.id === "all") {
            arr.map(ch => (ch.checked = true));
            this.handleDropDownChange("AllT");
          } else if (!e.target.checked && e.target.id === "all") {
            arr.map(ch => (ch.checked = false));
            this.handleDropDownChange("AllF");
          } else if (e.target.id !== "all") {
            if (
              arr.filter((ch, i) => i > 0 && ch.checked === true).length ===
              arr.length - 1
            ) {
              arr[0].checked = true;
            }
            if (!e.target.checked) arr[0].checked = false;
            this.handleDropDownChange(e.target.name);
          }
        },
        false
      );
    }
  }

  render() {
    return (
      <div className="row App-header">
        <h1 style={{ fontSize: 48 }}>Welcome to the Quote Machine!</h1>
        <br />
        <NewQuoteButton handleClick={this.handleClick} />
        <br />
        <div className="row">
          {this.state.loading ? (
            <div className="lds-ripple">
              <div></div>
              <div></div>
            </div>
          ) : (
            <Pic picture={this.state.picture} />
          )}
        </div>
        <br />
        <div className="textBox">
          <p id="text" className="">
            {this.state.text}
          </p>
          <div className="row">
            <div className="col-md-4">
              <h6 id="author">{this.state.author}</h6>
            </div>
            <TweetThis text={this.state.text} author={this.state.author} />
            <div className="col-md-4">
              {this.state.loading || this.state.id === "" ? null : (
                <Heart quoteId={this.state.id} />
              )}
            </div>
          </div>
        </div>
        <br />
        <MadeBy />
      </div>
    );
  }
}

export default Quotes;
