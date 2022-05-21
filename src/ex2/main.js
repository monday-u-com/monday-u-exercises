import { itemManager } from "./ItemManager.js";

// Implement the `Main` class here
class Main {
  constructor() {}

  addButton = document.querySelector("#list-item-submit");

  init() {
    this.addButton.addEventListener("click", itemManager.addItem);
  }
}

const main = new Main();

document.addEventListener("DOMContentLoaded", function () {
  // you should create an `init` method in your class
  // the method should add the event listener to your "add" button
  main.init();
});
