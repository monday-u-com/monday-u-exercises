const UNSORTED = Symbol("unsorted");
const SORTED_ASC = Symbol("sortedAsc");
const SORTED_DESC = Symbol("sortedDesc");
import { AppendToFile, OverwriteFile } from "mondayu-logger-assh";

export class ItemManager {
  init() {
    this.items = [
      {text: 'Walk the dog', isNew: false},
      {text: 'Take a shower', isNew: false},
      {text: 'Feed the baby', isNew: false},
      {text: 'Wash the dishes', isNew: false}
    ]
    this.sortOrder = UNSORTED;
    // OverwriteFile.log(this.items);
    return this.items;
  }

  addItem(text) {
    const itemIndex = this.items.findIndex(item => item.text === text);
    if (itemIndex > -1) {
      this.items[itemIndex].isNew = true;
    } else {
      this.items.push({text: text, isNew: true });
      this.sortOrder = UNSORTED;
    }
    // OverwriteFile.log(this.items);
    return this.items;
  }

  markItemAsOld(item){
    item.isNew = false;
  }

  deleteItem(index) {
    this.items.splice(index, 1);
    // OverwriteFile.log(this.items);
    return this.items;
  }

  sortItems(){
    if (this.sortOrder === UNSORTED || this.sortOrder === SORTED_DESC) {
      this.items.sort((a, b) => a.text.localeCompare(b.text));
      this.sortOrder = SORTED_ASC;
    } else {
      this.items.reverse();
      this.sortOrder = SORTED_DESC;
    }
    // OverwriteFile.log(this.items);
    return this.items;
  }
}
