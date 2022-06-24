class Main {
    constructor() {
        this.itemClient = new ItemClient()
    }

    init = async () => {
        const addItemButton = document.getElementById("list-item-submit");
        addItemButton.addEventListener("click", this.handleItem);

        await this.renderItems();
    }

    handleItem = async () => {
        const input = document.getElementById("list-item-input");
        const inputValue = input.value;

        await this.itemClient.postItem(inputValue)
        await this.renderItems()
    }

    deleteItem = async item => {
        await this.itemClient.deleteItem(item);
        await this.renderItems();
    }

    renderItems = async () => {
        const list = document.getElementById("list");
        list.innerHTML = "";

        const items = await this.itemClient.getItems()

        items.forEach(item => {
            const listItem = document.createElement("li");
            listItem.classList.add('list-item');
            listItem.innerHTML = item;

            const listItemDeleteButton = this._createDeleteButton(item);
            listItem.appendChild(listItemDeleteButton);
            list.appendChild(listItem);
        })
    }

    _createDeleteButton = item => {
        const button = document.createElement("img");
        button.src = "./images/delete_icon.svg";
        button.classList.add('list-item-delete-button');
        button.addEventListener("click", _ => this.deleteItem(item));

        return button
    }
}

const main = new Main();

document.addEventListener("DOMContentLoaded", function () {
    main.init();
});