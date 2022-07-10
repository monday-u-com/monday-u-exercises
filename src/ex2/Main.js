
import App from "./App.js";

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
