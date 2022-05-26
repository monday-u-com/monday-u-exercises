class ItemManager {
   constructor() {
      this.items = [];
   }

   add(task) {
      this.items.push(task);
   }

   remove(i) {
      this.items.splice(i, 1);
   }

   clear() {
      this.items = [];
   }

   sortDown() {
      this.items.sort();
   }

   sortUp() {
      this.items.sort().reverse();
   }
}
