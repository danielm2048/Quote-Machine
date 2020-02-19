import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

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

export default Pic;