import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import { connect } from "react-redux";
import { loadUser } from "./actions/authActions";
//import { getQuotes } from "./actions/quoteActions";
import PropTypes from "prop-types";
import AppNavbar from "./components/AppNavbar";
import Quotes from "./components/Quotes";
import Likes from "./components/Likes";
import PageNotFound from "./components/PageNotFound";

function PrivateRoute({ component: Component, ...rest }) {
  const user = localStorage.getItem("token");
  return (
    <Route
      {...rest}
      render={props =>
        user !== null ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
      }
    />
  );
}

class App extends React.Component {
  static propTypes = {
    auth: PropTypes.object,
    loadUser: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.loadUser();
  }

  render() {
    if (this.props.auth.isLoading)
      return (
        <div id="" className="lds-ripple">
          <div></div>
          <div></div>
        </div>
      );
    return (
      <div>
        <Router>
          <div className="container App">
            <AppNavbar />
            <Switch>
              <Route path="/" exact component={Quotes} />
              <PrivateRoute path="/likes" component={Likes} />
              <Route component={PageNotFound} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { loadUser })(App);
