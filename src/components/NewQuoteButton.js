import React from "react";

const NewQuoteButton = props => {
  return (
    <div className="row">
      <div className="btn-group cont">
        <button
          type="button"
          id="newQuote"
          className="btn btn-danger"
          onClick={props.handleClick}
        >
          Get A New Quote!
        </button>
        <button
          type="button"
          className="btn btn-danger dropdown-toggle dropdown-toggle-split"
          data-toggle="dropdown"
          data-flip="false"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <span className="sr-only">Toggle Dropdown</span>
        </button>
        <div id="menu" className="dropdown-menu">
          <label htmlFor="all" className="dropdown-item">
            <input id="all" type="checkbox" className="check" name="All" /> All{" "}
          </label>
          <label htmlFor="romance" className="dropdown-item">
            <input
              id="romance"
              type="checkbox"
              className="check"
              name="Romance"
            />{" "}
            Romance{" "}
          </label>
          <label htmlFor="motivation" className="dropdown-item">
            <input
              id="motivation"
              type="checkbox"
              className="check"
              name="Motivation"
            />{" "}
            Motivation{" "}
          </label>
          <label htmlFor="friends" className="dropdown-item">
            <input
              id="friends"
              type="checkbox"
              className="check"
              name="Friends"
            />{" "}
            Friends{" "}
          </label>
          <label htmlFor="life" className="dropdown-item">
            <input id="life" type="checkbox" className="check" name="Life" />{" "}
            Life{" "}
          </label>
        </div>
      </div>
    </div>
  );
};

export default NewQuoteButton;
