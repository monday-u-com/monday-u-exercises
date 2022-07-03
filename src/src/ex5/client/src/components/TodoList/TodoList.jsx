import { useState } from "react";
import PropTypes from "prop-types";
const TodoList = ({item, deleteItem , statusUpdate ,editTodoDb}) =>{
    const newItemPokemon = item.isPokemon === 0 ? false:true;
    const [todoName, setTodoName] = useState( newItemPokemon ? `Cool You cought ${item.item}` : item.item );
    const [clickEdit , setClickEdit] = useState(true);
    



    const handleCheckBox = async (event) =>{
        try{
           if(event.target.checked){
                await statusUpdate(item.itemId, true);
        }else{
            await statusUpdate(item.itemId,false);
        }
        }catch(error){
            throw new Error("Failure while update the checkbox status")
        }
    };

    const handleClickOnEditBtn = ()=>{
        setClickEdit(false);
    };

    const handleSaveBtnClick = async () =>{
        try{
            setClickEdit(true);
            const newTodo = todoName.replace("`Cool You cought" , "");
            await editTodoDb(item.itemId, newTodo);  
        }catch(error){
            throw new Error("Failure while edit Todo inside DB");  
        }
    }
    return(
        <div>
            <li id={item.itemId}>
                <div>
                    <input type="checkbox" defaultChecked ={item.status} onChange={handleCheckBox}/>
                    <input type="text" readOnly="true" value= {item}/>
                </div>
                {isPokemon &&(
                    <a>
                    {""}
                    <img src = {item.imageUrl}></img>
                    </a>
                )}
                <button className="delete" onClick={() => deleteItem(item.itemId)}>🗑️</button>
                
            </li>
        </div>
    )

};

export default TodoList