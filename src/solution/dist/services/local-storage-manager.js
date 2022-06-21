class LocalStorageManager {
    localStorageSortKey = 'sort_by';

    constructor() { }

    saveSortBy(sortBy) {
        localStorage.setItem(this.localStorageSortKey, JSON.stringify(sortBy));
    }

    getSortBy() {
        return JSON.parse(localStorage.getItem(this.localStorageSortKey));
    }
}