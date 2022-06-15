class Main {
  constructor() {
    this.itemClient = new ItemClient();
  }

  init = async () => {
    const addItemButton = document.getElementById("list-item-submit");
    addItemButton.addEventListener("click", this.handleItem);

    const itemsData = await this.itemClient.fetchAllItems();

    await this.renderItems(itemsData); // this will make it so that any time you refresh the page you'll see the items already in your todo list
  };

  handleItem = async () => {
    // implement
  };

  deleteItem = async (item) => {
    // implement
  };

  renderItems = async (itemsData) => {
    const list = document.getElementById("list");
    list.innerHTML = "";

    const items = itemsData.data;

    items.forEach((item) => {
      const listItem = document.createElement("li");
      listItem.classList.add("list-item");
      listItem.innerHTML = item.name;

      const listItemDeleteButton = this._createDeleteButton(item);
      listItem.appendChild(listItemDeleteButton);
      list.appendChild(listItem);
    });
  };

  _createDeleteButton = (item) => {
    const button = document.createElement("img");
    button.src = "./images/delete_icon.svg";
    button.classList.add("list-item-delete-button");
    button.addEventListener("click", (_) => this.deleteItem(item));

    return button;
  };
}

const main = new Main();

document.addEventListener("DOMContentLoaded", function () {
  main.init();
});
