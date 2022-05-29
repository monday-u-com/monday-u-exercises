import App from "./app";



class Main{
  constructor(){
  this.app = new App();
  
  }
  init() {
    this.app.initializeApp();
  }
  
 }

 const main = new Main();
 document.addEventListener("DOMContentLoaded", function () {
  main.init();
});