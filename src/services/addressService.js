import { ApiEndpoints } from "../helpers/configHelper";
import AuthService from "./authService";

class AddressService {
  static async searchAddress(addressToSearch) {
    if (!addressToSearch) {
      throw { message: "Destination address is not valid." };
    }
    console.log("Searching for Address:", addressToSearch);

    let response = await fetch(ApiEndpoints.SEARCH_ADDRESS, {
      method: "POST",
      headers: new Headers({
        Authorization: `Bearer ${AuthService.getAuthToken()}`,
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({ address: addressToSearch }),
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
        throw { message: "There are no address based on your search." };
      } else {
        throw { message: "Server error." };
      }
    }
  }

  static async getPriceForDestination(originLocation, destinationAddress) {
    if (!originLocation) {
      throw { message: "User location is not defined" };
    }
    if (!destinationAddress) {
      throw { message: "Destination address is not valid." };
    }

    console.log("Origin Location:", originLocation);
    console.log("Getting price for Address:", destinationAddress.label);

    let response = await fetch(ApiEndpoints.GET_ADDRESS_PRICE, {
      method: "POST",
      headers: new Headers({
        Authorization: `Bearer ${AuthService.getAuthToken()}`,
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({
        origin: originLocation,
        destination: destinationAddress.position,
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
        throw { message: "There is no price available for your destination." };
      } else {
        throw { message: "The price for your trip cannot be calculated." };
      }
    }
  }
}

export default AddressService;
