export class ItemManager {
  constructor() {
    this.items = []
  }
  addItem(item) {
    this.items.push(item)
  }
  removeItem(item) {
    this.items.splice(this.items.indexOf(item), 1)
  }
  getLastItem() {
    const lastItem = this.items[this.items.length - 1]
    return lastItem
  }
  getItems() {
    return this.items
  }
 
}
