import React, { Component } from "react";
import TaxiDriverInfo from "./taxiDriverInfo";
import TripTimeline from "./tripTimeline";
import TripService from "../services/tripService";

class TaxiTrip extends Component {
  state = {
    trip: this.props.trip,
    currentLocation: 0,
    errorMessage: "",
    hasError: false,
  };

  componentDidMount() {
    this.startCheckingTrip(3000);
  }

  render() {
    return (
      <React.Fragment>
        {this.state.hasError && (
          <div className="alert alert-danger" role="alert">
            {this.state.errorMessage}
          </div>
        )}
        <div>
          <div className="container">
            <div className="col-lg-12 d-flex flex-row justify-content-center align-items-center">
              <div
                className="jumbotron"
                style={{ marginTop: "100px", width: "95%" }}
              >
                <TaxiDriverInfo
                  driverName={this.state.trip.taxiDriver.name}
                  rating={this.state.trip.taxiDriver.rating}
                  isDriving={true}
                />
                <hr />
                <TripTimeline
                  currentPoint={this.state.trip.now}
                  points={this.state.trip.points}
                />

                {this.state.trip.isFinished && (
                  <span>
                    <hr></hr>
                    <h5>{this.state.trip.taxiDriver.name} has reach you!</h5>
                    <div style={{ color: "#989898" }}>
                      Do you want to rate the driver ?
                    </div>
                    <button
                      type="button"
                      className="btn btn-rounded waves-effect btn-outline-info"
                      style={{ width: "35%", marginTop: "10px" }}
                      onClick={this.rateDriver}
                    >
                      <i className="fas fa-star pr-2" aria-hidden="true"></i>
                      Yes. Rate
                    </button>
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }

  startCheckingTrip = async (pollingInterval) => {
    try {
      var isFinished = await this.executeTripChecking();
      while (!isFinished) {
        await new Promise((r) => setTimeout(r, pollingInterval));
        isFinished = await this.executeTripChecking();
      }
    } catch (err) {
      this.setState({
        errorMessage: `Taxi driver suffered an accident and cannot reach you! ${err.message}`,
        hasError: true,
      });
    }
  };

  executeTripChecking = async () => {
    var tripStatus = await TripService.checkTripStatus(
      this.state.trip.taxiDriver,
      this.state.trip.points,
      this.state.trip.now
    );
    this.setState({
      hasError: false,
      errorMessage: "",
      trip: tripStatus,
    });
    return tripStatus.isFinished;
  };

  rateDriver = () => {
    this.props.handleDriveRating();
  };
}

export default TaxiTrip;
