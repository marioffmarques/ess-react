import React, { Component } from "react";
import { Redirect, BrowserRouter as Router } from "react-router-dom";
import { SwitchTransition, CSSTransition } from "react-transition-group";

import NavBar from "./navBar";
import VoiceCommandCapture from "./voiceCommandCapture";
import AddressSelector from "./addressSelector";
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
          <CSSTransition
            in={true}
            appear={true}
            timeout={700}
            classNames="fade"
          >
            <VoiceCommandCapture
              handleCommandOutcome={this.onVoiceCommandFinishProcessing}
            />
          </CSSTransition>
        )}

        {this.state.voiceCommandOutcome.length > 0 && (
          <CSSTransition
            in={true}
            appear={true}
            timeout={700}
            classNames="fade"
          >
            <AddressSelector
              availableDestinations={this.state.voiceCommandOutcome}
              handleTripStart={this.onTripStart}
            />
          </CSSTransition>
        )}
      </React.Fragment>
    );
  }

  onVoiceCommandFinishProcessing = (commandOutcome) => {
    this.setState({ voiceCommandOutcome: commandOutcome });
  };

  onTripStart = (tripData) => {
    console.log("Trip start", tripData);
  };

  onLogout = () => {
    AuthService.logout();
    this.forceUpdate();
  };
}

export default Home;
