export class ItemManager {
  init() {
    this.todosArray = ['Walk the dog', 'Take a shower', 'Feed the baby', 'Wash the dishes'];
    return this.todosArray;
  }
  deleteItem(index) {
    this.todosArray.splice(index, 1);
    return this.todosArray;
  }
  addItem(newTodoText) {
    this.todosArray.push(newTodoText);
    return this.todosArray;
  }
}
