import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import './App.css';
import axios from 'axios';

/*const quotes = [
  { text: "It does not matter how slowly you go as long as you do not stop.", author: "- Confucius", picture: "https://bit.ly/2MZBMFX", type: "Motivation" },
  { text: "A person who never made a mistake never tried anything new.", author: "- Albert Einstein", picture: "https://bit.ly/34gD1q6", type: "Life" },
  { text: "Winning isn’t everything, but wanting to win is.", author: "- Vince Lombardi", picture: "https://bit.ly/34enlDv", type: "Motivation" },
  { text: "Go confidently in the direction of your dreams. Live the life you have imagined.", author: "- Henry David Thoreau", picture: "https://bit.ly/2BUWZKH", type: "Life" },
  { text: "The most common way people give up their power is by thinking they don’t have any.", author: "- Alice Walker", picture: "https://bit.ly/34a15uy", type: "Life" },
  { text: "Nothing is impossible, the word itself says, “I’m possible!”", author: "– Audrey Hepburn", picture: "https://bit.ly/2NuAtxN", type: "Motivation" },
  { text: "What’s money? A man is a success if he gets up in the morning and goes to bed at night and in between does what he wants to do.", author: "- Bob Dylan", picture: "https://bit.ly/331PIoj", type: "Life" },
  { text: "When everything seems to be going against you, remember that the airplane takes off against the wind, not with it.", author: "- Henry Ford", picture: "https://bit.ly/2JCBYsF", type: "Motivation" },
  { text: "Believe you can and you’re halfway there.", author: "- Theodore Roosevelt", picture: "https://bit.ly/2C9aV49", type: "Motivation" },
  { text: "That person who helps others simply because it should or must be done, and because it is the right thing to do, is indeed without a doubt, a real superhero.", author: "- Stan Lee", picture: "https://bit.ly/2NpWeie", type: "Friends" }
];*/

let rand = Math.floor(Math.random() * 10);

const Pic = (props) => {
  return (
    <ReactCSSTransitionGroup
      transitionName="fade"
      transitionEnterTimeout={300}
      transitionLeaveTimeout={300}>
      <img className="picture-size" key={props.picture} src={props.picture} alt="Imagine this is the person please!" />
    </ReactCSSTransitionGroup>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      quotes: [],
      checkedQuotes: [],
      order: rand,
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
        text: "No quotes to show!!",
        author: "",
        picture: ""
      });
    }
    else {
      if (this.state.order === this.state.checkedQuotes.length - 1 || this.state.checkedQuotes.length === 1) {
        this.setState({
          order: 0
        }, () => this.setState({
          text: this.state.checkedQuotes[this.state.order].text,
          author: this.state.checkedQuotes[this.state.order].author,
          picture: this.state.checkedQuotes[this.state.order].picture
        }));
      }
      else {
        this.setState({
          order: this.state.order + 1
        }, () => this.setState({
          text: this.state.checkedQuotes[this.state.order].text,
          author: this.state.checkedQuotes[this.state.order].author,
          picture: this.state.checkedQuotes[this.state.order].picture
        }));
      }
    }
  }
  handleDropDownChange(type) {
    switch (type) {
      case "AllT":
        this.state.quotes.map(quote => quote.isChecked = true);
        this.setState({ checkedQuotes: this.state.quotes });
        break;
      case "AllF":
        this.state.quotes.map(quote => quote.isChecked = false);
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
    const { data } = await axios.get('http://localhost:5000/quotes/api');
    data.map(q => q.isChecked = true);
    this.setState({
      quotes: data,
      checkedQuotes: data
    }, () => this.setState({
      text: this.state.checkedQuotes[rand].text,
      author: this.state.checkedQuotes[rand].author,
      picture: this.state.checkedQuotes[rand].picture
    }));
    if (this.state.checkedQuotes !== []) this.setState({ loading: false });
    let arr = [...document.getElementsByClassName("check")];
    arr.map(ch => ch.checked = true);
    document.getElementById("menu").addEventListener("click", (e) => {
      e.stopPropagation();
    }, false);
    document.getElementById("menu").addEventListener("change", (e) => {
      if (e.target.checked && e.target.id === "all") {
        arr.map(ch => ch.checked = true);
        this.handleDropDownChange("AllT");
      }
      else if (!e.target.checked && e.target.id === "all") {
        arr.map(ch => ch.checked = false);
        this.handleDropDownChange("AllF");
      }
      else if (e.target.id !== "all") {
        if (arr.filter((ch, i) => (i > 0 && ch.checked === true)).length === arr.length - 1) {
          arr[0].checked = true;
        }
        if (!e.target.checked) arr[0].checked = false;
        this.handleDropDownChange(e.target.name);
      }
    }, false);
  }
  render() {
    return (
      <div id="quote-box" className="container-fluid App">
        <div className="row App-header">
          <h1>Welcome to the Quote Machine!</h1>
          <br />
          <div className="row">
            <div className="btn-group cont">
              <button type="button" id="newQuote" className="btn btn-danger" onClick={this.handleClick}>Get A New Quote!</button>
              <button type="button" className="btn btn-danger dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" data-flip="false" aria-haspopup="true" aria-expanded="false">
                <span className="sr-only">Toggle Dropdown</span>
              </button>
              <div id="menu" className="dropdown-menu">
                <label htmlFor="all" className="dropdown-item"><input id="all" type="checkbox" className="check" name="All" /> All </label>
                <label htmlFor="romance" className="dropdown-item"><input id="romance" type="checkbox" className="check" name="Romance" /> Romance </label>
                <label htmlFor="motivation" className="dropdown-item"><input id="motivation" type="checkbox" className="check" name="Motivation" /> Motivation </label>
                <label htmlFor="friends" className="dropdown-item"><input id="friends" type="checkbox" className="check" name="Friends" /> Friends </label>
                <label htmlFor="life" className="dropdown-item"><input id="life" type="checkbox" className="check" name="Life" /> Life </label>
              </div>
            </div>
          </div>
          <br />
          <div className="row">
            {
              this.state.loading ? <div className="lds-ripple"><div></div><div></div></div> : <Pic picture={this.state.picture} />
            }
          </div>
          <br />
          <div className="textBox">
            <p id="text" className="">{this.state.text}</p>
            <h6 id="author">{this.state.author}</h6>
          </div>
          <br />
          <div className="row">
            <a id="tweet-quote" data-toggle="tooltip" title="Tweet this quote!" target="_blank" rel="noopener noreferrer" href={"https://twitter.com/intent/tweet?text=" + this.state.text + " " + this.state.author}><i className="fa fa-twitter" style={{ fontSize: 24 }}></i></a>
          </div>
          <h6>Made With <i className="fa fa-heart" style={{ fontSize: 18 }}></i> By Daniel Mimoun</h6>
        </div>
      </div>
    );
  }
}

export default App;
