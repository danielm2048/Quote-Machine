import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import './App.css';

const quotes = [
  { text: "It does not matter how slowly you go as long as you do not stop.", author: "- Confucius", picture: "https://bit.ly/2MZBMFX" },
  { text: "A person who never made a mistake never tried anything new.", author: "- Albert Einstein", picture: "https://bit.ly/34gD1q6" },
  { text: "Winning isn’t everything, but wanting to win is.", author: "- Vince Lombardi", picture: "https://bit.ly/34enlDv"},
  { text: "Go confidently in the direction of your dreams. Live the life you have imagined.", author: "- Henry David Thoreau", picture: "https://bit.ly/2BUWZKH"},
  { text: "The most common way people give up their power is by thinking they don’t have any.", author: "- Alice Walker", picture: "https://bit.ly/34a15uy"}
];

let rand = Math.floor(Math.random() * quotes.length);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quotes,
      order: rand,
      text: quotes[rand].text,
      author: quotes[rand].author,
      picture: quotes[rand].picture
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    if (this.state.order === this.state.quotes.length - 1) {
      this.setState({
        text: this.state.quotes[this.state.order].text,
        author: this.state.quotes[this.state.order].author,
        picture: this.state.quotes[this.state.order].picture,
        order: 0
      });
    }
    else {
      this.setState({
        text: this.state.quotes[this.state.order].text,
        author: this.state.quotes[this.state.order].author,
        picture: this.state.quotes[this.state.order].picture,
        order: this.state.order + 1
      });
    }
  }
  render() {
    return (
      <div id="quote-box" className="container-fluid App el">
        <h1>Welcome to the Quote Machine!</h1>
        <h5>Made By Daniel Mimoun</h5>
        <div className="row App-header">
          <div className="col">
          <ReactCSSTransitionGroup
              transitionName="carousel"
              transitionEnterTimeout={2900}
              transitionLeaveTimeout={2900}>
              <img className="picture-size" key={this.state.picture} src={this.state.picture} alt="Imagine this is the the person please!"/>
            </ReactCSSTransitionGroup>
          </div>
          <div className="col">
            <p id="text" className="">{this.state.text}</p>
          </div>
          <div className="col">
            <h6 id="author">{this.state.author}</h6>
          </div>
          <div className="row">
            <div className="col">
              <button id="new-quote" className="btn btn-danger" onClick={this.handleClick}>New Quote</button>
            </div>
            <div className="col">
              <a id="tweet-quote" data-toggle="tooltip" title="Tweet this quote!" target="_blank" rel="noopener noreferrer" href={"https://twitter.com/intent/tweet?text=" + this.state.text}><i class="fa fa-twitter" style={{ fontSize: 24 }}></i></a>
            </div>
          </div>
        </div>
      </div>
    );
  };
}

export default App;
