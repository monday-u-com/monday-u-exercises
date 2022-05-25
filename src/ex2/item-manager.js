const unsorted = Symbol("unsorted");
const sortedAsc = Symbol("sortedAsc");
const sortedDesc = Symbol("sortedDesc");

export class ItemManager {
  init() {
    this.todosArray = [
      {text: 'Walk the dog', isNew: false},
      {text: 'Take a shower', isNew: false},
      {text: 'Feed the baby', isNew: false},
      {text: 'Wash the dishes', isNew: false}
    ]
    this.isSorted = unsorted;
    return this.todosArray;
  }

  deleteItem(index) {
    this.todosArray.splice(index, 1);
    return this.todosArray;
  }

  addItem(newItemText) {
    const existingItemIndex = this.todosArray.findIndex(item => item.text === newItemText);
    if (existingItemIndex > -1) {
      this.todosArray[existingItemIndex].isNew = true;
    } else {
      this.todosArray.push({text: newItemText, isNew: true });
    }
    this.isSorted = unsorted;
    return this.todosArray;
  }

  sortItems(){
    if (this.isSorted === unsorted || this.isSorted === sortedDesc) {
      this.todosArray.sort( (a, b) => a.text.localeCompare(b.text) );
      this.isSorted = sortedAsc;
    } else {
      this.todosArray.reverse();
      this.isSorted = sortedDesc;
    }
    return this.todosArray;
  }

  markItemAsOld(item){
    item.isNew = false;
  }
}
