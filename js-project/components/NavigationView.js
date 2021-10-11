import ViewComponent from "./ViewComponent.js";
import classnames from "../utils/classnames.js";

export default class NavigationView extends ViewComponent {
  constructor({ tabs, defaultTab }) {
    super("div", "navigation");
    this.tabs = tabs;
    this.currentTab = tabs.find(tab => tab === defaultTab);
    this.onLogout = null;
    this.onTabClick = null;
    this.logoutButton = null;
  }

  handleTabClick(e) {
    const tab = e.target.closest(".tab");
    if(!tab) {
      return;
    };
    const prevTab = this.currentTab;
    this.currentTab = tab.dataset.tab;
    this.onTabClick && this.onTabClick(prevTab, this.currentTab);
  }
  handleLogoutClick(e) {
    this.onLogout && this.onLogout();
  }

  componentDidMount() {
    this.root.addEventListener("click", (e) => this.handleTabClick(e));
    this.root.querySelector(".logoutBtn").addEventListener("click", (e) => this.handleLogoutClick(e))
  }

  render() {
    const tabs = this.tabs.map(tab => `
      <div class="tab" data-tab=${tab}>${tab}</div>
    `).join("");
    const logoutButton = `<button class="logoutBtn"}>Log out</button>`;
    this.root.innerHTML = [tabs, logoutButton].join('');
  }
}