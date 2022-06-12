
import App from "./app.js";

class Main {
  constructor() {
    this.app = new App();
  }
  init() {
    this.app.runApp();
  }
}

const main = new Main();

document.addEventListener("DOMContentLoaded", function () {
  main.init();
});
