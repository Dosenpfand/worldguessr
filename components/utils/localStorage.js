export default class gameStorage {

  static isCrazyGames() {
    return false; // Effectively disable CrazyGames SDK for storage
  }

  static setItem(key, value) {
    console.log('setItem', key, value );
    try {
      if(gameStorage.isCrazyGames()) {
        window.CrazyGames.SDK.data.setItem(key, value);
      } else {
      window.localStorage.setItem(key, value);
      }
    } catch (e) {}
  }
  static getItem(key) {
    console.log('getItem', key );
    try {
      if(gameStorage.isCrazyGames()) {
        return window.CrazyGames.SDK.data.getItem(key);
      } else {
      return window.localStorage.getItem(key);
      }
    } catch (e) {}
  }
  static removeItem(key) {
    console.log('removeItem', key );
    try {
      if(gameStorage.isCrazyGames()) {
        window.CrazyGames.SDK.data.removeItem(key);
      } else {
      window.localStorage.removeItem(key);
      }
    } catch (e) {}
  }
}
