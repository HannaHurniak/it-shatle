'use strict';
import LoginView from "./components/LoginView.js";
import RegistrationView from "./components/RegistrationView.js";
import TableView from "./components/TableView.js";
import NavigationView from "./components/NavigationView.js";
import ViewComponent from "./components/ViewComponent.js";
import LoginState from "./utils/LoginState.js";

const loginView = new LoginView();
const registrationView = new RegistrationView();

const tableView = new TableView();
const tabs = [
  {
    title: "Home",
    component: new ViewComponent(),
  },
  {
    title: "Clients",
    component: tableView,
  },
  {
    title: "Map",
    component: new ViewComponent(),
  },
];

const navigationView = new NavigationView({
  tabs: tabs.map(tab => tab.title),
  defaultTab: "Clients",
});


const onRegister = () => {
  registrationView.unmount();
  loginView.mount(document.body);
};

loginView.onRegisterClick = () => {
  loginView.unmount();
  registrationView.mount(document.body);
};
loginView.onLoginSuccess = () => {
  loginView.unmount();
  navigationView.mount(document.body);
  tableView.mount(document.body);
};
registrationView.onLoginClick = onRegister;
registrationView.onRegisterSuccess = onRegister;

navigationView.onLogout = () => {
  LoginState.reset();
  const tab = tabs.find(tab => tab.title === navigationView.currentTab);
  tab.component.unmount();
  navigationView.unmount();
  loginView.mount(document.body);
};

navigationView.onTabClick = (prevTabTitle, tabTitle) => {
  const prev = tabs.find(tab => tab.title === prevTabTitle);
  const next = tabs.find(tab => tab.title === tabTitle);
  prev.component.unmount();
  next.component.mount(document.body);
};

navigationView.mount(document.body);
tableView.mount(document.body);
