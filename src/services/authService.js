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
      let jResponse = await response.json();
      StoreHelper.setObject("authToken", jResponse.data.token);
      StoreHelper.setObject("user", user);
      return true;
    } else {
      return false;
    }
  }

  static logout() {
    StoreHelper.removeObject("authToken");
    StoreHelper.removeObject("user");
  }

  static isLoggedIn() {
    return StoreHelper.getObject("authToken") !== null;
  }

  static getAuthToken() {
    return StoreHelper.getObject("authToken");
  }
}

export default AuthService;
