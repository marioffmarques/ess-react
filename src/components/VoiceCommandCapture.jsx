import React, { Component } from "react";
import CommandService from "../services/commandService";
import AddressService from "../services/addressService";

class VoiceCommandCapture extends Component {
  state = {
    isRecording: false,
    isLoading: false,
    isSendingCommand: false,
    hasError: false,
    errorMessage: "",
    destination: {
      isDestinationResolved: false,
      text: "",
    },
  };

  render() {
    return (
      <React.Fragment>
        {this.state.hasError && (
          <div className="alert alert-danger" role="alert">
            {this.state.errorMessage}
          </div>
        )}
        <div className="container">
          <div className="col-lg-12 d-flex flex-row justify-content-center align-items-center">
            <div
              className="jumbotron"
              style={{ marginTop: "100px", width: "95%" }}
            >
              <h3>Where do you want to go ?</h3>
              <button
                type="button"
                disabled={this.state.isLoading || this.state.isSendingCommand}
                className={`btn btn-rounded waves-effect ${
                  this.state.isRecording
                    ? "btn-outline-warning"
                    : "btn-outline-info"
                }`}
                style={{ width: "35%", marginTop: "20px" }}
                onClick={this.handleAudioRecording}
              >
                {this.state.isLoading ? (
                  <span
                    style={{ marginRight: 10 }}
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                ) : (
                  <i className="fas fa-microphone pr-2" aria-hidden="true"></i>
                )}

                {this.state.isRecording
                  ? "Stop"
                  : this.state.isLoading
                  ? "Processing"
                  : "Record"}
              </button>

              {this.state.destination.isDestinationResolved &&
                !this.state.isRecording && (
                  <span>
                    <hr></hr>
                    <h6>Is this what you mean?</h6>
                    <span style={{ color: "#989898", fontSize: 13 }}>
                      Edit if needed...
                    </span>
                    <textarea
                      value={this.state.destination.text}
                      onChange={(evt) => {
                        this.setState({
                          destination: {
                            isDestinationResolved: true,
                            text: evt.target.value,
                          },
                        });
                      }}
                      id="form17"
                      className="md-textarea form-control"
                      rows="3"
                    ></textarea>
                    <button
                      type="button"
                      disabled={
                        this.state.isLoading || this.state.isSendingCommand
                      }
                      className="btn btn-rounded waves-effect btn-outline-info"
                      style={{ width: "35%", marginTop: "10px" }}
                      onClick={this.submitRevisedCommand}
                    >
                      {this.state.isSendingCommand ? (
                        <span
                          style={{ marginRight: 10 }}
                          className="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                      ) : (
                        <i className="fas fa-check pr-2" aria-hidden="true"></i>
                      )}
                      Accept it!
                    </button>
                  </span>
                )}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }

  handleAudioRecording = () => {
    let isCurrentlyRecording = this.state.isRecording;

    if (!isCurrentlyRecording) {
      this.startAudioRecorder();
    } else {
      this.stopAudioRecorder();
    }

    this.setState({
      isRecording: !this.state.isRecording,
      hasError: false,
      destination: {
        isDestinationResolved: false,
        text: "",
      },
    });
  };

  startAudioRecorder = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: false,
        audio: true,
        echoCancellation: true,
      })
      .then(async (stream) => {
        this.setState({
          hasError: false,
          errorMessage: "",
        });

        this.recorder = RecordRTC(stream, {
          type: "audio/wav",
          audioBitsPerSecond: 128000,
          bufferSize: 16384,
        });
        this.recorder.startRecording();
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          hasError: true,
          isRecording: false,
          errorMessage: `The permission to access the microphone was not granted. ${error.message}`,
        });
      });
  };

  stopAudioRecorder = () => {
    this.recorder.stopRecording(() => {
      let blob = this.recorder.getBlob();
      this.setState({ isLoading: true });
      this.uploadVoiceCommand(blob);
    });
  };

  uploadVoiceCommand = async (commandBlob) => {
    try {
      var resultCommandId = await CommandService.uploadVoiceCommand(
        commandBlob,
        "wav"
      );
      console.log(resultCommandId);
      this.getCommandResult(resultCommandId);
    } catch (err) {
      this.setState({
        isLoading: false,
        isRecording: false,
        errorMessage: `${err.name ?? "Error"}: ${err.message}`,
        hasError: true,
      });
    }
  };

  getCommandResult = async (commandId) => {
    try {
      var result = await CommandService.getCommandResult(commandId);
      this.setState({
        isLoading: false,
        isRecording: false,
        hasError: false,
        destination: {
          isDestinationResolved: true,
          text: result,
        },
      });
    } catch (err) {
      console.log(err);
      this.setState({
        isLoading: false,
        isRecording: false,
        errorMessage: `An error occurred during voice processing! ${err.message}`,
        hasError: true,
      });
    }
  };

  submitRevisedCommand = async () => {
    try {
      this.setState({ isSendingCommand: true, hasError: false });
      var result = await AddressService.searchAddress(
        this.state.destination.text
      );

      this.props.handleCommandOutcome(result);
    } catch (err) {
      this.setState({
        errorMessage: `An error occurred while searching addresses! ${err.message}`,
        hasError: true,
        isSendingCommand: false,
        // destination: {
        //   isDestinationResolved: false,
        //   text: "",
        // },
      });
    }
  };
}

export default VoiceCommandCapture;
