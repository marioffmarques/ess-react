import React, { Component } from "react";
import ReactDOM from "react-dom";
import {
  Route,
  NavLink,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";

import App from "./app";
import Login from "./components/login";

const routing = (
  <Router>
    <Switch>
      <Route path="/login" component={Login} />
      <Route exact path="/" component={App} />
    </Switch>
  </Router>
);

ReactDOM.render(routing, container);
