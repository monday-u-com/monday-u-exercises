import {ItemManager} from "./taskloader";



class Main{
  constructor(){
this.itemManager = new ItemManager ();
window.onload = itemManager.loadTasks;
 }
 init(){
  // On form submit add task
  document.querySelector("form").addEventListener("submit", e => {
  e.preventDefault();
  this.itemManager.addTask();

});
 }
}
const main = new Main();
main.init();















