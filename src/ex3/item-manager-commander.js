import { writeFile, readFileSync } from 'fs';

const DATA_FILE_NAME = "savedData.json";

export class ItemManagerCommander {
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
      this.items[itemIndex].isNew = true;
    } else {
      this.items.push({text: text, isNew: true });
    }
    this.writeItemsToFile();
  }

  markItemAsOld(item){
    item.isNew = false;
    this.writeItemsToFile();
  }

  deleteItem(index) {
    this.items.splice(index, 1);
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
