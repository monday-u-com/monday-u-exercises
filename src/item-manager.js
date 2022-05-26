class ItemManager {
   constructor(render) {
      this.items = [];
      this.render = render;
   }

   add(task) {
      this.items.push(task);
      this.render(true);
   }

   remove(i) {
      this.items.splice(i, 1);
      this.render(false);
   }

   clear() {
      this.items = [];
      this.render(false);
   }

   sortDown() {
      this.items.sort();
      this.render(false);
   }

   sortUp() {
      this.items.sort().reverse();
      this.render(false);
   }
}
