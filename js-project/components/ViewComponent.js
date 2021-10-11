export default class ViewComponent {
    constructor(tag = "div", className = "") {
      this.root = document.createElement(tag);
      this.root.className = className;
    }
  
    componentWillUnmount() {}
  
    componentDidMount() {}
  
    componentDidUpdate() {}
  
    update() {
      this.render();
      this.componentDidUpdate();
    }
  
    render() {}
  
    mount(parent) {
      this.render();
      parent.append(this.root);
      this.componentDidMount();
    }
  
    unmount() {
      this.componentWillUnmount();
      this.root.remove();
    }
  }