import React, { Component } from "react";
import ReactDOM from "react-dom";
import {
  Route,
  NavLink,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";

import NavBar from "./components/navBar";
import App from "./app";
import Login from "./components/login";
import NotFound from "./components/notFound";
import AuthService from "./services/authService";

const routing = (
  <div>
    {alert("sd")}
    <Router>
      {AuthService.isLoggedIn() && <NavBar />}
      <Switch>
        <Route path="/login" component={Login} />
        <Route exact path="/" component={App} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  </div>
);

ReactDOM.render(routing, container);
