import React, { Component } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import Home from "./components/home";
import Login from "./components/login";
import NotFound from "./components/notFound";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route exact path="/" component={Home} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    );
  }
}

export default App;
