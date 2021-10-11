import LoginState from "./LoginState.js";

const DELETED_COMPANIES_KEY = "deletedCompanies";

export default class DeletedCompanies {
  static addToList(companyId) {
    const email = LoginState.getState();

    const deletedCompanies = JSON.parse(localStorage.getItem(DELETED_COMPANIES_KEY)) || {};
    if(!deletedCompanies[email]) {
      deletedCompanies[email] = [companyId];
    } else {
      deletedCompanies[email].push(companyId);
    }

    localStorage.setItem(DELETED_COMPANIES_KEY, JSON.stringify(deletedCompanies));
  }

  static getList() {
    const email = LoginState.getState();

    const deletedCompanies = JSON.parse(localStorage.getItem(DELETED_COMPANIES_KEY)) || {};
    return deletedCompanies[email] || [];
  }

  static resetList() {
    const email = LoginState.getState();

    const deletedCompanies = JSON.parse(localStorage.getItem(DELETED_COMPANIES_KEY)) || {};
    delete deletedCompanies[email];

    localStorage.setItem(DELETED_COMPANIES_KEY, JSON.stringify(deletedCompanies));
  }
}