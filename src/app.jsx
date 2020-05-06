import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import NavBar from "./components/navBar";
import StoreHelper from "./helpers/storeHelper";

class App extends Component {
  render() {
    if (!StoreHelper.isLoggedIn()) {
      return <Redirect to="/login"></Redirect>;
    }
    return (
      <React.Fragment>
        <NavBar />
        <main className="container"></main>
      </React.Fragment>
    );
  }
}

export default App;
