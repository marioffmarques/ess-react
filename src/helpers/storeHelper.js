class StoreHelper {
  static setObject(key, obj) {
    localStorage.setItem(key, obj);
  }

  static getObject(key) {
    return localStorage.getItem(key);
  }

  static removeObject(key) {
    localStorage.removeItem(key);
  }
}

export default StoreHelper;
