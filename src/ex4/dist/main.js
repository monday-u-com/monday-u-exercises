import ItemClient from './clients/item_client.js'

class Main {
    constructor() {
        this.itemClient = new ItemClient()
        this.list = document.getElementById("list");
    }

    init = async () => {
        const addItemButton = document.getElementById("list-item-submit");
        addItemButton.addEventListener("click", this.handleItem);

        await this.renderItems(); // this will make it so that any time you refresh the page you'll see the items already in your todo list
    }

    handleItem = async () => {
        const item = document.getElementById("list-item-input").value
        let loading = document.getElementById('spinner')
        try {
            loading.style.visibility = 'visible'
            await this.itemClient.postItem(item)
            this.renderItems()
            loading.style.visibility = 'hidden'
        } catch (e) {
            console.log(e)
            alert("There was an error creating the item.")
        }
    }

    deleteItem = async item => {
        let loading = document.getElementById('spinner')
        let index = this.findIndexOfItem(item)
        loading.style.visibility = 'visible'
        await this.itemClient.deleteItem(index)
        loading.style.visibility = 'hidden'
        this.renderItems()
    }

    findIndexOfItem(item) {
        const listItems = this.list.getElementsByTagName('li')
        for (let i = 0; i < listItems.length; i++) {
            if (listItems[i].innerText === item) {
                return i
            }
        }
    }

    renderItems = async () => {
        list.innerHTML = "";
        document.getElementById("list-item-input").value = '';

        const items = await this.itemClient.getItems()

        items.forEach(item => {
            this.createItem(item)
        })
    }

    createItem = async (item) => {
        const listItem = document.createElement("li");
        listItem.classList.add('list-item');
        listItem.innerHTML = item;

        const listItemDeleteButton = this._createDeleteButton(item);
        listItem.appendChild(listItemDeleteButton);
        this.list.appendChild(listItem);
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