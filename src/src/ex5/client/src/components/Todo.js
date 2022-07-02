import React ,{useState} from 'react'
import TodoForm from "./TodoForm"
import {RiCloseCircleLine} from "react-icons/ri"
import {TiEdit} from "react-icons/ti"

function Todo({todos,completeTodo, removeTodo , updateTodo}) {
    const [edit,setEdit] = useState({
        id:null,
        item : "",
    });

    const submitUpdate = item =>{
        updateTodo(edit.id,item)
        setEdit({
            id:null,
            item:""
        });
    };
    if(edit.id){
        return <TodoForm edit={edit} onSubmit={submitUpdate}/>
    }

    return todos.map((todo,index)=>(
    <div className={todo.isComplete ? 'todo-row complete': 'todo-row'} key={index}>
    <div key={todo.id} onClick={()=> completeTodo(todo.id)}>
    {todo.item}
    </div>
    <div className="icons">
        <RiCloseCircleLine onClick={()=> removeTodo(todo.id)} className="delete-icon"/>
        <TiEdit onClick={()=> setEdit({id: todo.id,item:todo.input})}/>
    
    </div>

    </div>
  ))
}

export default Todo