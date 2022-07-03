import { useEffect, useState } from "react";
import "./AppContainer.module.css";
import { fetchItems, createItem, deleteItem, statusChange } from "../../itemClient";
import Todo from "../Todo";
import TodoControls from "../TodoControls/TodoControls";

function AppContainer(){
    const[items,setItems] = useState([]);


    const renderNewItems = async (item) =>{
        const newItems = await createItem(item);
        newItems.forEach((item)=>{
            items.push(item)
        });
    setItems([...items]);
    };

    useEffect(()=>{
        fetchItems().then((fetchedItems) => {
            setItems(fetchedItems);
          });
        }, []);

    return (
        <div className="wrapper">
            <Todo items={items} deleteItem={deleteItem} statusChange={statusChange}/>
            <TodoControls renderNewItems={renderNewItems}/>
        </div>
    )
}

export default AppContainer;