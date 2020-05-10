import Cookies from "js-cookie";

class StoreHelper {
  static setObject(key, obj) {
    //localStorage.setItem(key, obj);
    Cookies.set(key, obj, { expires: 2 });
  }

  static getObject(key) {
    return Cookies.get(key);
    //return localStorage.getItem(key);
  }

  static removeObject(key) {
    Cookies.remove(key);
    //localStorage.removeItem(key);
  }
}

export default StoreHelper;
