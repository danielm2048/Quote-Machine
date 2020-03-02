import React from "react";
import { Link } from "react-router-dom";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

const Pic = props => {
  return (
    <ReactCSSTransitionGroup
      transitionName="fade"
      transitionEnterTimeout={300}
      transitionLeaveTimeout={300}
    >
      <Link href="#">
        <img
          className="picture-size"
          key={props.picture}
          src={props.picture}
          alt="Imagine this is the person please!"
        />
      </Link>
    </ReactCSSTransitionGroup>
  );
};

export default Pic;
