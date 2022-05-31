const UNSORTED = Symbol("unsorted");
const SORTED_ASC = Symbol("sortedAsc");
const SORTED_DESC = Symbol("sortedDesc");
import { writeFile, readFileSync } from 'fs';

const DATA_FILE_NAME = "savedData.json";

export class ItemManager {
  init() {
    this.items = this.getItemsFromFile();
    console.log(this.items);
    this.sortOrder = UNSORTED;
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
    this.writeItemsToFile();
    return this.items;
  }

  markItemAsOld(item){
    item.isNew = false;
  }

  deleteItem(index) {
    this.items.splice(index, 1);
    this.writeItemsToFile();
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
    this.writeItemsToFile();
    return this.items;
  }

  getItemsFromFile(){
    const data = readFileSync(DATA_FILE_NAME);
    return JSON.parse(data);
  }

  writeItemsToFile(){
    writeFile(DATA_FILE_NAME, JSON.stringify(this.items, null, 2), err => {
      if (err) throw err;
    });
  }
}
