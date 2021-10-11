const LOGIN_STATE_KEY = "login";

export default class LoginState {
  static setState(email) {
    localStorage.setItem(LOGIN_STATE_KEY, email);
  }

  static getState() {
    return localStorage.getItem(LOGIN_STATE_KEY);
  }

  static reset() {
    localStorage.removeItem(LOGIN_STATE_KEY);
  }
}