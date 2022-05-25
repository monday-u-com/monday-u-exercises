class ItemManager {
    localStorageTableKey = 'app_todo_list_table';
    localStorageSortKey = 'sort_by';

    constructor() {
        this.pokemonClient = new PokemonClient;
        this.initLocalStorage();
    }

    async addItem(value) {
        const items = value
            .split(',')
            .map(s => s.trim())
            .filter(Boolean);
        return Promise.all(items.map(item => this.handleItem(item, false)));
    }

    async handleItem(item, checked) {
        const res = { item, checked };
        const pokemonExist = this.isPokemonExist(item);
        if (pokemonExist) {
            res.type = 'pokemonExists';
            res.pokemon = pokemonExist.pokemon;
            return res;
        }
        const pokemon = await this.pokemonClient.getPokemon(item.toLowerCase());
        if (pokemon.success) {
            res.type = 'pokemon';
            res.pokemon = pokemon.body;
        }
        else if (pokemon.error && !isNaN(item) && !item.toString().includes('.')) {
            res.type = 'pokemonNotFound';
        } else {
            res.type = 'text';
        }
        return res;
    }

    insertItem({ item, checked, pokemon, type, message }) {
        this.addItemToLocalStorage({
            type,
            item,
            checked,
            pokemon,
            message
        });
    }

    isPokemonExist(pokemon) {
        const itemsListData = this.getTableFromLocalStorage();
        return itemsListData?.find(data => (data.pokemon?.id == pokemon || data.pokemon?.name == pokemon.toLowerCase()));
    }

    editItem(element, newItem) {
        const newElement = { ...element };
        newElement.item = newItem;
        newElement.message = newItem;
        this.editItemLocalStorage(element, newElement);
    }

    getItemsLength() {
        return this.getTableFromLocalStorage()?.length;
    }

    sortItemsData(itemsListData) {
        const sortBy = this.getSortBy();
        itemsListData?.sort((a, b) => a.message > b.message ? 1 : a.message < b.message ? -1 : 0);
        if (sortBy === 'A-Z') {
            itemsListData?.reverse();
        }
    }

    updateItemCheckbox(element) {
        element.checked = !element.checked;
        editItemLocalStorage(element, element);
    }


    //Local storage
    initLocalStorage() {
        try {
            if (!Array.isArray(this.getTableFromLocalStorage())) {
                this.saveToLocalStorage([])
            }
        } catch (e) {
            this.saveToLocalStorage([]);
        }
    }

    addItemToLocalStorage(item) {
        const table = this.getTableFromLocalStorage();
        table.push(item);
        this.saveToLocalStorage(table);
    }

    getItemFromLocalStorage(item) {
        const table = this.getTableFromLocalStorage();
        return { table, item: table.find(el => el.item === item.item) };
    }

    editItemLocalStorage(item, obj) {
        const current = this.getItemFromLocalStorage(item);
        if (!current.item) {
            return;
        }
        current.table[current.table.indexOf(current.item)] = obj;
        this.saveToLocalStorage(current.table);
    }

    removeItemFromLocalStorage(item) {
        const current = this.getItemFromLocalStorage(item);
        if (!current.item) {
            return;
        }
        current.table.splice(current.table.indexOf(current.item), 1);
        this.saveToLocalStorage(current.table);
    }

    getTableFromLocalStorage() {
        const table = JSON.parse(localStorage.getItem(this.localStorageTableKey));
        this.sortItemsData(table);
        return table;
    }

    saveToLocalStorage(table) {
        localStorage.setItem(this.localStorageTableKey, JSON.stringify(table));
    }

    cleanLocalStorageTable() {
        localStorage.setItem(this.localStorageTableKey, JSON.stringify([]));
    }

    saveSortBy(sortBy) {
        localStorage.setItem(this.localStorageSortKey, JSON.stringify(sortBy));
    }

    getSortBy() {
        return JSON.parse(localStorage.getItem(this.localStorageSortKey));
    }
}