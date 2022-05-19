

window.addEventListener('load',()=> {
  const form = document.querySelector('#new-task-form');
  const input = document.querySelector('#new-task-input');
  const filterOption = document.querySelector(".filter-todo");
  const list_el = document.querySelector('#tasks');
  var audio = new Audio('checksound1.mp3');
  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  document.getElementById("current_date").innerHTML = date;
  

  filterOption.addEventListener("click", filterTodo);
  

  form.addEventListener('submit',(e)=>{
      // stop refreshing page
      e.preventDefault();
      
  
      const task = input.value;
      
      
      // if task filed is empty pop an alert!
      if(!task){
          alert("Please fill out tasks filed");
          return;
      }

      // creating dom nodes
      const task_el = document.createElement('div');
  task_el.classList.add('task');

      const task_content_el = document.createElement('div');
  task_content_el.classList.add('content');
      // task_content_el.innerText = task;
      
      task_el.appendChild(task_content_el);

      const task_input_el = document.createElement("input");
      task_input_el.classList.add("text");
      task_input_el.type ="text";
      task_input_el.value = task;
      task_input_el.setAttribute("readonly","readonly");

      task_content_el.appendChild(task_input_el)


      const task_actions_el = document.createElement("div");
      task_actions_el.classList.add("actions");

      const task_check_el = document.createElement("button");
      task_check_el.innerHTML = `<i class="fas fa-check"></i>`;
      task_check_el.classList.add("complete-btn");
      


      const task_edit_el = document.createElement("button");
      task_edit_el.classList.add("edit");
      task_edit_el.innerHTML = "Edit";

      const task_delete_el = document.createElement("button");
      task_delete_el.classList.add("delete");
      task_delete_el.innerHTML = "Delete";

     

      // appended all childes to the actions div
      task_actions_el.appendChild(task_check_el);
      task_actions_el.appendChild(task_edit_el);
      task_actions_el.appendChild(task_delete_el);
      
      

      task_el.appendChild(task_actions_el);



      list_el.appendChild(task_el);
      input.value="";
      


      task_edit_el.addEventListener("click", ()=>{
          if(task_edit_el.innerText.toLowerCase() == "edit"){
              task_input_el.removeAttribute("readonly");
              task_input_el.focus();
              task_edit_el.innerText = "Save";
          }else{
              task_input_el.setAttribute("readonly","readonly");
              task_edit_el.innerText = "Edit";
          }
      });

      task_delete_el.addEventListener('click', ()=> {
        audio.play();
         list_el.removeChild(task_el);

      });
      task_check_el.addEventListener("click", ()=>{
          task_content_el.classList.toggle("completed");
          animItem.goToAndPlay(0,true);
      })

      task_input_el.addEventListener("click", ()=>{
        animItem.goToAndPlay(0,true);
          audio.play();
      })
     

  });
  function saveLocalTodos(task) {
      let tasks;
      if (localStorage.getItem("task") === null) {
          tasks = [];
      } else {
          tasks = JSON.parse(localStorage.getItem("tasks"));
      }
      tasks.push(task);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      console.log(task);
    }

    function filterTodo(e) {
      const tasks = list_el.childNodes;
      tasks.forEach(function(task) {
        switch (e.target.value) {
          case "all":
            task.style.display = "flex";
            break;
          case "completed":
            if (task.classList.contains("completed")) {
              task.style.display = "flex";
            } else {
              task.style.display = "none";
            }
            break;
          case "uncompleted":
            if (!task.classList.contains("completed")) {
              task.style.display = "flex";
            } else {
              task.style.display = "none";
            }
        }
      });
    }
    
    
});


