import React ,{useState , useEffect} from 'react'
import TodoController from "./TodoController"
import Todo from "./Todo"
import {fetchItems,deleteAll,deleteItem,createItem,statusChange} from "../itemClient.js"
function TodoApp() {
    const [items, setItems] = useState([]);

    const itemToCreate = async (item) => {
      await createItem(item);
      const items = await fetchItems();
      setItems(items.data);
    };
  
    const itemToDelete = async (itemId) => {
      await deleteItem(itemId);
      const items = await fetchItems();
      setItems(items.data);
    };
    const deleteAllItems = async (itemId) => {
      await deleteAll(itemId);
      const items = await fetchItems();
      setItems(items.data);
    };
  
    const itemToEdit = async (itemId,newStatus) => {
      await statusChange(itemId,newStatus);
      const items = await fetchItems();
      setItems(items.data);
    };
  
    useEffect(() => {
      const fetchedItems = async () => {
        const items = await fetchItems();
        setItems(items.data);
      };
      fetchedItems();
    }, []);
  
   
    return (
      <div className="appContainer">
        <div className="listContainerBackground">
          <TodoController itemToCreate={itemToCreate} />
          <div className="list-container">
          <Todo
            todos={items}
            // completeTodo={completeTodo}
            // removeTodo={removeTodo}
            // updateTodo={updateTodo}
          />
          </div>
        </div>
      </div>
    );
  };

export default TodoApp