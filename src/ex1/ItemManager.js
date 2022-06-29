export class ItemManager {
    constructor() {
        this.items = []
    }

    remove(item) {
        this.items = this.items.filter(i => i !== item)
    }

    add(item) {
        this.items.push(item)
    }
}