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

  static async checkTripStatus(taxiDriver, points, now) {
    if (!taxiDriver || !points) {
      throw { message: "Missing data to perform the request." };
    }
    console.log("Checking the trip status..");

    let response = await fetch(ApiEndpoints.CHECK_TRIP, {
      method: "POST",
      headers: new Headers({
        Authorization: `Bearer ${AuthService.getAuthToken()}`,
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({
        taxiDriver: taxiDriver,
        points: points,
        now: now ?? 0,
      }),
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
        throw { message: "Cannot determine the trip status." };
      } else {
        throw { message: "Server error." };
      }
    }
  }

  static async sendRating(taxiDriver, rating, ratingComment) {
    if (!taxiDriver) {
      throw { message: "Missing data to perform the request." };
    }
    console.log("Sending rate..", rating, ratingComment);

    let response = await fetch(ApiEndpoints.RATE_DRIVER, {
      method: "POST",
      headers: new Headers({
        Authorization: `Bearer ${AuthService.getAuthToken()}`,
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({
        taxiDriver: taxiDriver,
        rating: rating ?? 1,
        comment: ratingComment,
      }),
      mode: "cors",
      cache: "default",
    });

    if (response.ok) {
      return await response.json();
    } else {
      if (response.status == 401) {
        throw { message: "Unauthorized." };
      } else if (response.status == 400) {
        throw { message: "Cannot send your rating. Check your parameters." };
      } else {
        throw { message: "Server error." };
      }
    }
  }
}

export default TripService;
