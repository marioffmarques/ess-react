import { ApiEndpoints } from "../helpers/configHelper";
import AuthService from "./authService";

class TripService {
  static async startTrip(originLocation) {
    if (!originLocation) {
      throw { message: "The user location is not known." };
    }
    console.log("Starting the trip:", originLocation);

    let response = await fetch(ApiEndpoints.START_TRIP, {
      method: "POST",
      headers: new Headers({
        Authorization: `Bearer ${AuthService.getAuthToken()}`,
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({ userLocation: originLocation }),
      mode: "cors",
      cache: "default",
    });

    if (response.ok) {
      let jResponse = await response.json();
      return jResponse.data;
    } else {
      if (response.status == 401) {
        throw { message: "Unauthorized." };
      } else if (response.status == 404) {
        throw { message: "Cannot determine trip intermidiate points." };
      } else {
        throw { message: "Server error." };
      }
    }
  }

  static async checkTripStatus(originLocation) {
    // TODO
  }

  static async sendRating(originLocation) {}
}

export default TripService;
