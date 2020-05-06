class StoreHelper {
  static isLoggedIn() {
    return localStorage.getItem("authToken") !== null;
  }

  static setAuth(token) {
    localStorage.setItem("authToken", token);
  }

  static getAuthToken() {
    return localStorage.getItem("authToken");
  }

  static removeAuthToken() {
    localStorage.removeItem("authToken");
  }
}

export default StoreHelper;
