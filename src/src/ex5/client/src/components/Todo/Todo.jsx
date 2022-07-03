import TodoList from "../TodoList/TodoList.jsx";
import "./Todo.module.css";

const Todo =({items, deleteItem , statusUpdate}) =>{
    return (
        <div className="list-container">
            {items.map((item,index)=>{
                return(
                    <TodoList item={item} deleteItem={deleteItem} statusUpdate={statusUpdate} key={index}/>
                );
            })}
        </div>
    )
}
export default Todo;