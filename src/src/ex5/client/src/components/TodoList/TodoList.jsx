import { useState } from "react";

const TodoList = ({item, deleteItem , statusUpdate}) =>{
    const [isPokemon , setIsPokemon] =useState(item.isPokemon);
    const newItem = isPokemon ? `Cool You cought ${item.newItem}` : item.newItem;


    const handleCheckBox = (event) =>{
        if(event.target.checked) {
            statusUpdate(item.itemId,true);
        }else{
            statusUpdate(item.itemId,false);
        }

    };
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