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
      StoreHelper.setObject("adata", {
        token: jResponse.data.token,
        user: user,
      });

      return true;
    } else {
      return false;
    }
  }

  static logout() {
    StoreHelper.removeObject("adata");
  }

  static isLoggedIn() {
    return StoreHelper.getObject("adata") !== undefined;
  }

  static getAuthToken() {
    return JSON.parse(StoreHelper.getObject("adata")).token;
  }
}

export default AuthService;
