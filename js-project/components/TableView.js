import ViewComponent from "./ViewComponent.js";
import {loadCompanies} from "../api.js";
import classnames from "../utils/classnames.js";
import Modal from "./Modal.js";
import DeletedCompanies from "../utils/DeletedCompanies.js";

const fields = ["name", "company", "email", "phone", "balance", "registered"];

const createHeadRow = () => `
  <tr>
    ${fields.map(field => `<th>${field}</th>`).join('')}
    <th></th>
  </tr>
`;

const createRow = (company) => `
  <tr class="${classnames("table-row", company.isActive && "active")}">
    ${fields.map(field => `<td>${company[field]}</td>`).join('')}
    <td><button class="delete-btn" data-id=${company._id}>x</button></td>
  </tr>
`;

export default class TableView extends ViewComponent {
  constructor() {
    super("table", "table-container");
    this.root.innerText = "TABLE";
    this.companies = [];
    this.selectedRow = null;
    this.modal = new Modal({
      title: "Are you sure you want to delete company?",
    });
    this.scrollUpBtn = null;
  }

  selectOnClick(event) {
    const element = event.target;
    const closest = element.closest(".table-row");
    if(this.selectedRow) {
      this.selectedRow.classList.remove("selected");
    }
    this.selectedRow = closest;
    this.selectedRow.classList.add("selected");
  }

  deleteCompany(id) {
    DeletedCompanies.addToList(id);
    this.update();
  }

  onDelete(event) {
    event.preventDefault();
    const button = event.target;
    if(!button.classList.contains("delete-btn")) {
      return;
    }
    const id = button.dataset.id;
    this.modal.show();
    this.modal.onAccept = () => this.deleteCompany(id);
  }

  onScrollUp(e) {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  componentDidMount() {
    loadCompanies()
      .then(companies => this.companies = companies)
      .then(() => this.update())
      .catch(e => console.error(e));
    this.root.addEventListener("click", (e) => this.selectOnClick(e));
    this.root.addEventListener("click", (e) => this.onDelete(e));
    this.scrollUpBtn.onclick = (e) => this.onScrollUp(e);
  }

  componentDidUpdate() {
    this.scrollUpBtn.onclick = (e) => this.onScrollUp(e);
  }

  componentWillUnmount() {
    this.modal.unmount();
  }

  render() {
    const headRow = createHeadRow();

    const deletedCompanies = DeletedCompanies.getList();
    const rows = this.companies
      .filter(company => !deletedCompanies.includes(company._id))
      .map(createRow).join("");
    this.root.innerHTML = [headRow, rows].join("");
    this.modal.mount(document.body);
    this.scrollUpBtn = document.createElement("div");
    this.scrollUpBtn.className = "scroll-up-btn";
    this.scrollUpBtn.innerText = "Scroll up";
    this.root.append(this.scrollUpBtn);
  }
}

// txt += "<p>Browser CodeName: " + navigator.appCodeName + "</p>";
    // txt += "<p>Browser Name: " + navigator.appName + "</p>";
    // txt += "<p>Browser Version: " + navigator.appVersion + "</p>";
    txt += "<p>Cookies Enabled: " + navigator.cookieEnabled + "</p>";
    txt += "<p>Browser Language: " + navigator.language + "</p>";
    txt += "<p>Browser Online: " + navigator.onLine + "</p>";
    // txt += "<p>Platform: " + navigator.platform + "</p>";
    txt += "<p>User-agent header: " + navigator.userAgent + "</p>";