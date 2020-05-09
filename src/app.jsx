import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import {
  Route,
  NavLink,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";

import NavBar from "./components/navBar";
import Home from "./components/home";
import About from "./components/about";
import AuthService from "./services/authService";

class App extends Component {
  render() {
    if (!AuthService.isLoggedIn()) {
      return <Redirect to="/login"></Redirect>;
    }
    return (
      <React.Fragment>
        {/* <NavBar /> */}

        <main className="container"></main>
      </React.Fragment>
    );
  }
}

export default App;
