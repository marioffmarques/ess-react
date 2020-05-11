import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

import NavBar from "./navBar";
import AuthService from "../services/authService";

import VoiceCommandCapture from "./voiceCommandCapture";
import AddressSelector from "./addressSelector";
import TaxiTrip from "./taxiTrip";
import TaxiDriverRating from "./taxiDriverRating";

class Home extends Component {
  state = {
    loggedInUser: this.props.location.state?.username,
    currentStep: 0,
    voiceCommandOutcome: [],
    trip: null,
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
        {this.state.currentStep == 0 && (
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

        {this.state.currentStep == 1 && (
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

        {this.state.currentStep == 2 && (
          <CSSTransition
            in={true}
            appear={true}
            timeout={700}
            classNames="fade"
          >
            <TaxiTrip
              trip={this.state.trip}
              handleDriveRating={this.onDriverRating}
            />
          </CSSTransition>
        )}

        {this.state.currentStep == 3 && (
          <CSSTransition
            in={true}
            appear={true}
            timeout={700}
            classNames="fade"
          >
            <TaxiDriverRating taxiDriver={this.state.trip.taxiDriver} />
          </CSSTransition>
        )}
      </React.Fragment>
    );
  }

  onVoiceCommandFinishProcessing = (commandOutcome) => {
    this.setState({ voiceCommandOutcome: commandOutcome, currentStep: 1 });
  };

  onTripStart = (tripData) => {
    this.setState({ trip: tripData, currentStep: 2 });
  };

  onDriverRating = () => {
    console.log("Driver rating");
    this.setState({ currentStep: 3 });
  };

  onLogout = () => {
    AuthService.logout();
    this.setState({ trip: null, voiceCommandOutcome: [], currentStep: 0 });
  };
}

export default Home;
