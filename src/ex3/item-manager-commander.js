import { writeFile, readFileSync } from 'fs';

const DATA_FILE_NAME = "savedData.json";

export class ItemManagerCommander {
  init() {
    this.getAll();
  }

  getAll() {
    try {
      this.items = this.getItemsFromFile();
    } catch (error) {
      this.items = [];
      this.writeItemsToFile();
    }
    return this.items;
  }

  addItem(text) {
    const itemIndex = this.items.findIndex(item => item.text === text);
    if (itemIndex > -1) {
      this.items = this.items.map(oItem =>
        oItem.text === text ? {text: text, isNew: true} : oItem)
    } else {
      this.items = [ ...this.items, {text: text, isNew: true } ]
    }
    this.writeItemsToFile();
  }

  markItemAsOld(item){
    this.items = this.items.map(oItem =>
      oItem.text === item.text ? {...item, isNew: false} : oItem)
    this.writeItemsToFile();
  }

  deleteItem(index) {
    const item = this.items[index];
    this.items = this.items.filter(oItem => oItem !== item)
    this.writeItemsToFile();
  }

  clearAllItems() {
    this.items = [];
    this.writeItemsToFile();
  }

  sortItems(){
    this.items.sort((a, b) => a.text.localeCompare(b.text));
    this.writeItemsToFile();
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
