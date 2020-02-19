import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

const PageNotFound = () => {
  return (
    <section>
      <h1>Uh oh!</h1>
      <p>Page can't be found.</p>
      <Link to="/Quote-Machine">Back Home</Link>
    </section>
  );
};

export default PageNotFound;
