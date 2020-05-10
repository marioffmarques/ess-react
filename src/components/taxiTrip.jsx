import React, { Component } from "react";
import AddressService from "../services/addressService";

class TaxiTrip extends Component {
  state = {
    locations: null,
    currentLocation: 0,
    errorMessage: "",
    hasError: false,
  };
}

export default TaxiTrip;
