class LocalStorageManager {
    static localStorageTableKey = 'app_todo_list_table';
    static localStorageSortKey = 'sort_by';

    static initLocalStorage() {
        try {
            if (!Array.isArray(this.getTableFromLocalStorage())) {
                this.saveToLocalStorage([])
            }
        } catch (e) {
            this.saveToLocalStorage([]);
        }
    }

    static addItemToLocalStorage(item) {
        const table = this.getTableFromLocalStorage();
        table.push(item);
        this.saveToLocalStorage(table);
    }

    static getItemFromLocalStorage(item) {
        const table = this.getTableFromLocalStorage();
        return { table, item: table.find(el => el.item === item.item) };
    }

    static editItemLocalStorage(item, obj) {
        const current = this.getItemFromLocalStorage(item);
        if (!current.item) {
            return;
        }
        current.table[current.table.indexOf(current.item)] = obj;
        this.saveToLocalStorage(current.table);
    }

    static removeItemFromLocalStorage(item) {
        const current = this.getItemFromLocalStorage(item);
        if (!current.item) {
            return;
        }
        current.table.splice(current.table.indexOf(current.item), 1);
        this.saveToLocalStorage(current.table);
    }

    static getTableFromLocalStorage() {
        const table = JSON.parse(localStorage.getItem(this.localStorageTableKey));
        this.sortItemsData(table);
        return table;
    }

    static saveToLocalStorage(table) {
        localStorage.setItem(this.localStorageTableKey, JSON.stringify(table));
    }

    static cleanLocalStorageTable() {
        localStorage.setItem(this.localStorageTableKey, JSON.stringify([]));
    }

    static saveSortBy(sortBy) {
        localStorage.setItem(this.localStorageSortKey, JSON.stringify(sortBy));
    }

    static getSortBy() {
        return JSON.parse(localStorage.getItem(this.localStorageSortKey));
    }

    static sortItemsData(itemsListData) {
        const sortBy = this.getSortBy();
        itemsListData?.sort((a, b) => a.message > b.message ? 1 : a.message < b.message ? -1 : 0);
        if (sortBy === 'A-Z') {
            itemsListData?.reverse();
        }
    }

}

LocalStorageManager.initLocalStorage();
