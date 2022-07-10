const listToDo = document.querySelector(".listToDo");
const count = document.querySelector(".count");
const buttonClearAll = document.querySelector(".buttonClearAll");
const newToInput = document.querySelector(".newToInput");
const buttonAdd = document.querySelector(".buttonAdd");

var removeSVG = '<i class="fa fa-trash"></i>';
count.textContent = 0;

clickButtonClearAll();

document.addEventListener("keydown", addEnter);
buttonAdd.addEventListener("click", add);
buttonClearAll.addEventListener("click", deleteListToDo);

function addEnter(event) {
  if (
    event.code === "Enter" &&
    document.querySelector("#newToDo input").value.length != 0
  )
    add();
}

function deleteListToDo() {
  if (confirm("Are you sure??") == true) {
    document.querySelector("#listToDo").innerHTML = "";
    count.textContent = 0;
    clickButtonClearAll();
  }
}

function clickButtonClearAll() {
  if (count.textContent > 0) {
    buttonClearAll.classList.add("active");
  } else {
    buttonClearAll.classList.remove("active");
  }
}

function add() {
  if (document.querySelector("#newToDo input").value.length == 0) {
    alert("Please Enter new todo");
  } else {
    var div = document.createElement("div");
    div.classList.add("todo");
    var item = document.createElement("span");
    item.innerText = document.querySelector("#newToDo input").value;
    var remove = document.createElement("button");
    remove.classList.add("delete");
    remove.innerHTML = removeSVG;
    remove.addEventListener("click", function () {
      this.parentNode.style.opacity = "0";
      count.textContent--;
      clickButtonClearAll();
      setTimeout(() => this.parentNode.remove()(), 200);
    });
    div.appendChild(remove);
    div.appendChild(item);
    listToDo.insertBefore(div, listToDo.childNodes[0]);
    document.getElementById("newToInput").value = "";
    count.textContent++;
    clickButtonClearAll();
  }
}
