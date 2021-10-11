import ViewComponent from "./ViewComponent.js";

export default class Modal extends ViewComponent {
  constructor({ title }) {
    super("div", "modal-container");
    this.title = title;
    this.onAccept = null;
    this.onDecline = null;
  }

  show() {
    this.root.classList.add("show");
  }

  hide() {
    this.root.classList.remove("show");
  }

  componentWillUnmount() {}

  componentDidMount() {
    this.hide();
    this.root.addEventListener('click', ({target}) => {
      if(!target.closest(".modal")) {
        return this.hide();
      }

      if(target.tagName !== "BUTTON") {
        return;
      }

      if(target.classList.contains("accept")) {
        this.onAccept && this.onAccept();
      }

      if(target.classList.contains("decline")) {
        this.onDecline && this.onDecline();
      }
      this.hide();
    });
  }

  render() {
    this.root.innerHTML = `
      <div class="modal">
        <div class="title">${this.title}</div>
        <div class="modal-buttons">
            <button class="accept">Yes</button>
            <button class="decline">No</button>
        </div>
      </div>
    `;
  }
}