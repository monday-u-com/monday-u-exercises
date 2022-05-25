const unsorted = Symbol("unsorted");
const sortedAsc = Symbol("sortedAsc");
const sortedDesc = Symbol("sortedDesc");

export class ItemManager {
  init() {
    this.todosArray = ['Walk the dog', 'Take a shower', 'Feed the baby', 'Wash the dishes'];
    this.isSorted = unsorted;
    return this.todosArray;
  }
  deleteItem(index) {
    this.todosArray.splice(index, 1);
    return this.todosArray;
  }
  addItem(newTodoText) {
    this.todosArray.push(newTodoText);
    this.isSorted = unsorted;
    return this.todosArray;
  }
  sortItems(){
    if (this.isSorted === unsorted || this.isSorted === sortedDesc) {
      this.todosArray.sort( (a, b) => a.localeCompare(b) );
      this.isSorted = sortedAsc;
    } else {
      this.todosArray.reverse();
      this.isSorted = sortedDesc;
    }
    return this.todosArray;
  }
}
