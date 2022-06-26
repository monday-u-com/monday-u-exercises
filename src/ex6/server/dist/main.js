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

    toggleDone = async item => {
        item.status = !item.status;
        await this.itemClient.toggleDone(item);
        await this.renderItems();
    }

    renderItems = async () => {
        const list = document.getElementById("list");
        list.innerHTML = "";

        const items = await this.itemClient.getItems()

        debugger;
        items.forEach(item => {
            const listItem = document.createElement("li");
            listItem.classList.add('list-item');
            const listItemDoneButton = this._createDoneButton(item);
            listItem.appendChild(listItemDoneButton);

            const listItemTextElement = this._createItemTextElement(item);
            listItem.appendChild(listItemTextElement)

            const listItemDeleteButton = this._createDeleteButton(item);
            listItem.appendChild(listItemDeleteButton);

            list.appendChild(listItem);
        })
    }

    _createItemTextElement = item => {
        const tag = document.createElement("p");
        const text = document.createTextNode(item.name);
        tag.classList.add('list-item-text');
        tag.appendChild(text);

        return tag;
    };


    _createDeleteButton = item => {
        const button = document.createElement("img");
        button.src = "./images/delete_icon.svg";
        button.classList.add('list-item-delete-button');
        button.addEventListener("click", _ => this.deleteItem(item));

        return button
    }

    _createDoneButton = item => {
        const checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        checkbox.name = "done";
        checkbox.value = "done";
        checkbox.id = `${item.id}`;
        checkbox.checked = item.status;
        checkbox.classList.add('list-item-checkbox');
        checkbox.addEventListener("click", _ => this.toggleDone(item));
        return checkbox;
    }
}

const main = new Main();

document.addEventListener("DOMContentLoaded", function () {
    main.init();
});
