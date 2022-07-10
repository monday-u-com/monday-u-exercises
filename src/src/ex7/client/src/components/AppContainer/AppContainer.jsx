import { useEffect, useState } from "react";
import "./AppContainer.css";
import Todo from "../Todo/Todo";
import TodoControls from "../TodoControls/TodoControls";
import { useSelector, useDispatch } from 'react-redux';
import Footer from "../Footer/Footer";
import {
  fetchItems,
  createItem,
  deleteItem,
  updateStatus,
  editTaskName,
  deleteAllItems,
} from "../../itemClient";

function AppContainer() {
  const [items, setItems] = useState([]);
  const [numOfTasks, setNumOfTasks] = useState(0);
  // 
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);
  // 
  const renderNewItems = async (item) => {
    try {
      const newItems = await createItem(item);
      newItems.forEach((item) => {
        items.push(item);
      });
      setItems([...items]);
      setNumOfTasks(items.length);
    } catch (err) {
      throw new Error(err);
    }
  };

  const deleteItemFromTodoList = async (itemId) => {
    try {
      await deleteItem(itemId);
      const itemIndex = items.findIndex((item) => item.itemId === itemId);
      items.splice(itemIndex, 1);
      setItems([...items]);
      setNumOfTasks(items.length);
    } catch (err) {
      throw new Error(err);
    }
  };
  const clearAllFromDb = async () => {
    try {
      await deleteAllItems();
      setItems([]);
      setNumOfTasks(0);
    } catch (err) {
      throw new Error(err);
    }
  };

  useEffect(() => {
    fetchItems().then((fetchedItems) => {
      setItems(fetchedItems);
      setNumOfTasks(fetchedItems.length);
    });
  }, []);

  return (
    <section className="wrapper">
      <div className="todoApp" id="todoApp">
        <h1 className="">TOdoS</h1>

        <div>
          <TodoControls renderNewItems={renderNewItems} />
          <Todo
            items={items}
            deleteItemFromDb={deleteItemFromTodoList}
            updateStatusDb={updateStatus}
            editTaskNameDb={editTaskName}
          />
          {numOfTasks > 0 && (
            <Footer
              numOfTasks={numOfTasks}
              clearAllFromDb={clearAllFromDb}
            ></Footer>
          )}
        </div>
      </div>
    </section>
  );
}

export default AppContainer;

