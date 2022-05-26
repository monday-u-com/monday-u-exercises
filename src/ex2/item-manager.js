const unsorted = Symbol("unsorted");
const sortedAsc = Symbol("sortedAsc");
const sortedDesc = Symbol("sortedDesc");

export class ItemManager {
  init() {
    this.items = [
      {text: 'Walk the dog', isNew: false},
      {text: 'Take a shower', isNew: false},
      {text: 'Feed the baby', isNew: false},
      {text: 'Wash the dishes', isNew: false}
    ]
    this.sortOrder = unsorted;
    return this.items;
  }

  addItem(text) {
    const itemIndex = this.items.findIndex(item => item.text === text);
    if (itemIndex > -1) {
      this.items[itemIndex].isNew = true;
    } else {
      this.items.push({text: text, isNew: true });
    }
    this.sortOrder = unsorted;
    return this.items;
  }

  markItemAsOld(item){
    item.isNew = false;
  }

  deleteItem(index) {
    this.items.splice(index, 1);
    return this.items;
  }

  sortItems(){
    if (this.sortOrder === unsorted || this.sortOrder === sortedDesc) {
      this.items.sort((a, b) => a.text.localeCompare(b.text));
      this.sortOrder = sortedAsc;
    } else {
      this.items.reverse();
      this.sortOrder = sortedDesc;
    }
    return this.items;
  }
}
