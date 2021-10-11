import UserData, {USER_DATA_RESPONSE} from "../utils/UserData.js";
import ViewComponent from "./ViewComponent.js";

export default class RegistrationView extends ViewComponent {
  constructor() {
    super("form", "authorization");
    this.onLoginClick = null;
    this.onRegisterSuccess = null;
    this.email = null;
    this.password = null;
    this.passwordConfirmation = null;
    this.signInButton = null;
    this.registerButton = null;
    this.errorDiv = null;
  }

  render() {
    this.root.innerHTML = "";
    this.email = document.createElement('input');
    this.email.className = "email";
    this.email.placeholder = 'Введите ваш Email';

    this.password = document.createElement('input');
    this.password.className = "email";
    this.password.placeholder = "Password";
    this.password.type = 'password';

    this.passwordConfirmation = document.createElement('input');
    this.passwordConfirmation.className = "email";
    this.passwordConfirmation.placeholder = "Confirm password";
    this.passwordConfirmation.type = 'password';

    this.signInButton = document.createElement("button");
    this.signInButton.type = "submit";
    this.signInButton.innerText = "sign in";

    this.registerButton = document.createElement("button");
    this.registerButton.type = "submit";
    this.registerButton.innerText = "регистрация";

    this.errorDiv = document.createElement('div');

    this.root.append(
      this.email,
      this.password,
      this.passwordConfirmation,
      this.signInButton,
      this.registerButton,
      this.errorDiv
    );
  }

  showError(message) {
    this.errorDiv.innerText = message;
  }

  onRegisterClick(event) {
    event.preventDefault();
    const email = this.email.value;
    const password = this.password.value;
    const passwordConfirmation = this.passwordConfirmation.value;

    if(!UserData.validateEmail(email)) {
      return this.showError("Email is not valid");
    };
    if(password.length < 3 || passwordConfirmation.length < 3) {
      this.password.value = "";
      this.passwordConfirmation.value = "";
      return this.showError("Password must be at least 3 characters");
    }
    if(password !== passwordConfirmation) {
      this.password.value = "";
      this.passwordConfirmation.value = "";
      return this.showError("Passwords do not match!");
    }

    switch(UserData.register(email, password)) {
      case USER_DATA_RESPONSE.USER_ALREADY_EXISTS:
        return this.showError("User already exists!");
      case USER_DATA_RESPONSE.REGISTER_SUCCESS:
        this.showError("Register completed!");
        if(typeof this.onRegisterSuccess === 'function') {
          this.onRegisterSuccess();
        }
        return;
      default:
        this.showError("Smth went wrong!");
    }
  }

  reset() {
    this.email.value = "";
    this.password.value = "";
    this.passwordConfirmation.value = "";
  }

  componentDidMount() {
    this.signInButton.onclick = event => {
      event.preventDefault();
      if(typeof this.onLoginClick === 'function') {
        this.onLoginClick();
      }
    };

    this.registerButton.onclick = (event) => this.onRegisterClick(event);
  }

  componentWillUnmount() {
    this.reset();
    this.registerButton.onclick = undefined;
  }
}
