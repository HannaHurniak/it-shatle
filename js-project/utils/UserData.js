const USER_DATA_KEY = "users";
const EMAIL_VALIDATION_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const USER_DATA_RESPONSE = {
  USER_ALREADY_EXISTS: "USER ALREADY EXISTS",
  INVALID_EMAIL: "INVALID EMAIL",
  USER_NOT_EXISTS: "USER NOT EXISTS",
  EMAIL_OR_PASSWORD_IS_NOT_CORRECT: "EMAIL OR PASSWORD IS NOT CORRECT",
  LOGIN_SUCCESS: "LOGIN SUCCESS",
  REGISTER_SUCCESS: "REGISTER SUCCESS",
};

export default class UserData {
  static login(email, password) {
    if(!UserData.validateEmail(email)) {
      return USER_DATA_RESPONSE.INVALID_EMAIL;
    }
    const users = JSON.parse(localStorage.getItem(USER_DATA_KEY)) || {};
    if(!users[email]) {
      return USER_DATA_RESPONSE.USER_NOT_EXISTS;
    }
    if(users[email] !== password) {
      return USER_DATA_RESPONSE.EMAIL_OR_PASSWORD_IS_NOT_CORRECT;
    }
    return USER_DATA_RESPONSE.LOGIN_SUCCESS;
  }

  static register(email, password) {
    if(!UserData.validateEmail(email)) {
      return USER_DATA_RESPONSE.INVALID_EMAIL;
    }

    const users = JSON.parse(localStorage.getItem(USER_DATA_KEY)) || {};
    if(users[email]) {
      return USER_DATA_RESPONSE.USER_ALREADY_EXISTS;
    }
    users[email] = password;
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(users));
    return USER_DATA_RESPONSE.REGISTER_SUCCESS;
  }

  static validateEmail(email) {
    return EMAIL_VALIDATION_REGEX.test(email);
  }
};
