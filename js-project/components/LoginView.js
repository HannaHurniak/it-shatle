import UserData, {USER_DATA_RESPONSE} from "../utils/UserData.js";
import ViewComponent from "./ViewComponent.js";
import LoginState from "../utils/LoginState.js";

export default class LoginView extends ViewComponent {
  constructor() {
    super('form', "div");
    this.onRegisterClick = null;
    this.onLoginSuccess = null;
    this.memberLogin = null;
    this.inputEmail = null;
    this.inputPass = null;
    this.buttonLogin = null;
    this.notMember= null;
    this.buttonCreateAccount = null;
    this.errorDiv = null;
  }

  render() {
    this.root.innerHTML = "";

    this.memberLogin = document.createElement('h1');
    this.memberLogin.innerText = "MEMBER LOGIN";
    this.memberLogin.className = "memberLogin";

    this.inputEmail = document.createElement('input');
    this.inputEmail.name = "email";
    this.inputEmail.className = "inputEmail";
    this.inputEmail.placeholder = 'Username'

    this.inputPass = document.createElement('input');
    this.inputPass.name = "passord";

    this.inputPass.type = "password";
    this.inputPass.className = "inputPass";
    this.inputPass.placeholder = 'Password';

    this.buttonLogin = document.createElement('button');
    this.buttonLogin.type = "submit";
    this.buttonLogin.innerText = 'LOGIN NOW';
    this.buttonLogin.className = "buttonLogin";

    this.notMember = document.createElement('h5');
    this.notMember.innerText = "Not a member?";
    this.notMember.className = "notMember";

    this.buttonCreateAccount = document.createElement('button');
    this.buttonCreateAccount.type = "submit";
    this.buttonCreateAccount.innerText = 'Create Account';
    this.buttonCreateAccount.className = "buttonCreateAccount";

    this.errorDiv = document.createElement('div');
    this.errorDiv.className = "errorDiv";

    this.root.append(
      this.memberLogin,
      this.inputEmail,
      this.inputPass,
      this.buttonLogin,
      this.notMember,
      this.buttonCreateAccount,
      this.errorDiv,
    );
  }

  componentDidMount() {
    this.registerButton.onclick = event => {
      event.preventDefault();
      if(typeof this.onRegisterClick === 'function') {
        this.onRegisterClick();
      }
    };

    this.root.onsubmit = event => {
      event.preventDefault();
      const email = this.emailInput.value;
      const password = this.passwordInput.value;
      switch (UserData.login(email, password)) {
        case USER_DATA_RESPONSE.INVALID_EMAIL:
          this.errorDiv.innerText = "Invalid email!";
          break;
        case USER_DATA_RESPONSE.USER_NOT_EXISTS:
          this.errorDiv.innerText = "User not exists!";
          break;
        case USER_DATA_RESPONSE.EMAIL_OR_PASSWORD_IS_NOT_CORRECT:
          this.errorDiv.innerText = "Password or Email is not correct!";
          break;
        case USER_DATA_RESPONSE.LOGIN_SUCCESS:
          this.errorDiv.innerText = "Login Success";
          LoginState.setState(email);
          if(typeof this.onLoginSuccess === 'function') {
            this.onLoginSuccess();
          }
          break;
      }
    };
  }
};
