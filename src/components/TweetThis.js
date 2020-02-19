import React from "react";

const TweetThis = props => {
  return (
    <div className="col-md-4">
      <a
        id="tweet-quote"
        data-toggle="tooltip"
        title="Tweet this quote!"
        target="_blank"
        rel="noopener noreferrer"
        href={
          "https://twitter.com/intent/tweet?text=" +
          props.text +
          " " +
          props.author
        }
      >
        <i className="fa fa-twitter" style={{ fontSize: 24 }}></i>
      </a>
    </div>
  );
};

export default TweetThis;
