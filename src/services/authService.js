import { ApiEndpoints } from "../helpers/configHelper";
import StoreHelper from "../helpers/storeHelper";

class AuthService {
  static async login(user, password) {
    if (!user || !password) {
      throw "Username and Password cannot be empty";
    }
    let credentialsBase64 = btoa(`${user}:${password}`);

    let response = await fetch(ApiEndpoints.TOKEN, {
      method: "POST",
      headers: new Headers({
        Authorization: `Basic ${credentialsBase64}`,
      }),
      mode: "cors",
      cache: "default",
    });

    if (response.ok) {
      console.log("Response ok");
      let jResponse = await response.json();
      StoreHelper.setObject("authToken", jResponse.data.token);
      return jResponse.data.token;
    } else {
      console.log("Response NOT ok");
      throw "Authentication Failed";
    }
  }

  static logout() {
    StoreHelper.removeObject("authToken");
  }

  static isLoggedIn() {
    return StoreHelper.getObject("authToken") !== null;
  }
}

export default AuthService;
