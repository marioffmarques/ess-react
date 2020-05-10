import React, { Component } from "react";
import { Redirect, BrowserRouter as Router } from "react-router-dom";

import NavBar from "./navBar";
import VoiceCommandCapture from "./VoiceCommandCapture";
import AuthService from "../services/authService";

class Home extends Component {
  state = {
    loggedInUser: this.props.location.state?.username,
    voiceCommandOutcome: [],
  };

  render() {
    if (!AuthService.isLoggedIn()) {
      return <Redirect to="/login"></Redirect>;
    }
    return (
      <React.Fragment>
        <NavBar
          loggedInUser={this.state.loggedInUser}
          handleLogout={this.onLogout}
        />
        {this.state.voiceCommandOutcome.length == 0 && (
          <VoiceCommandCapture
            handleCommandOutcome={this.onVoiceCommandFinishProcessing}
          />
        )}
      </React.Fragment>
    );
  }

  onVoiceCommandFinishProcessing = (commandOutcome) => {
    console.log("THere we go");
    this.setState({ voiceCommandOutcome: commandOutcome });
  };

  onLogout = () => {
    AuthService.logout();
    this.forceUpdate();
  };
}

export default Home;
