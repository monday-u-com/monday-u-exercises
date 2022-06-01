class ItemManager {
   constructor(render) {
      this.items = [];
      this.render = render;
      this.pendingTasks = 0;
   }

   add(task) {
      this.items.push(task);
      this.pendingTasks++;
      this.render(true);
   }

   remove(i) {
      this.items.splice(i, 1);
      this.pendingTasks--;
      this.render(false);
   }

   clear() {
      this.items = [];
      this.pendingTasks = 0;
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
