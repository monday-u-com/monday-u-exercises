class ItemManager {
  constructor() {
    this.itemList = [];
    this.addItem = this.addItem.bind(this);
    this.renderItems = this.renderItems.bind(this);
    this.createItem = this.createItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }

  addItem() {
    const item = document.querySelector("#list-item-input").value;

    this.itemList.push(item);
    this.renderItems();
  }

  removeItem({ target }) {
    const buttonId = target.id.split("-");
    buttonId.pop();
    const item = buttonId.join(" ");

    const itemIndex = this.itemList.findIndex((listItem) => {
      return listItem === item;
    });

    this.itemList.splice(itemIndex, 1);

    this.renderItems();
  }

  renderItems() {
    const list = document.querySelector("#list");
    list.innerHTML = "";

    this.itemList.forEach((item) => {
      const itemNode = this.createItem(item);

      list.appendChild(itemNode);
    });
  }

  createItem(item) {
    //create elements
    const divElm = document.createElement("div");
    const liElm = document.createElement("li");
    const deleteButton = document.createElement("img");

    // style  elements
    divElm.classList.add("div-item");
    // divElm.classList.add("grow");
    liElm.classList.add("list-item");
    deleteButton.classList.add("list-item-delete-button");

    //add textNodes
    liElm.appendChild(document.createTextNode(item));
    deleteButton.src = "../images/delete_icon.svg";

    //add ids
    const itemId = item.split(" ").join("-");
    divElm.setAttribute("id", `${itemId}`);
    deleteButton.setAttribute("id", `${itemId}-delete`);

    //append <li> and <button> to <div>
    divElm.appendChild(liElm);
    divElm.appendChild(deleteButton);

    //add clickListener to button
    deleteButton.addEventListener("click", this.removeItem);

    //clear input
    document.querySelector("#list-item-input").value = "";

    return divElm;
  }
}

export const itemManager = new ItemManager();