import { itemManager } from "./ItemManager.js";

// Implement the `Main` class here
class Main {
  constructor() {}

  addButton = document.querySelector("#list-item-submit");
  addItemInput = document.querySelector("#list-item-input");

  init() {
    this.addButton.addEventListener("click", itemManager.addItem);

    this.addItemInput.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        itemManager.addItem();
      }
    });
  }
}

const main = new Main();

document.addEventListener("DOMContentLoaded", function () {
  // you should create an `init` method in your class
  // the method should add the event listener to your "add" button
  main.init();
});
