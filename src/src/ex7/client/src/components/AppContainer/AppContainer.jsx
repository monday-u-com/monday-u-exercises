import { useEffect, useState } from "react";
import "./AppContainer.css";
import PropTypes from "prop-types";
import TodoConnector from "../Todo/TodoConnector";
import TodoControlsConnector from "../TodoControls/TodoControlsConnector";
import FooterConnector from "../Footer/FooterConnector";


const AppContainer = ({ numOfTasks, getItemsAction }) => {
  

  useEffect(() => {
    getItemsAction();
  }, []);

  return (
    <section className="wrapper">
      <div className="todoApp" id="todoApp">
        <h1 className="">TOdoS</h1>

        <div>
          <TodoControlsConnector/>
          <TodoConnector/>
          {numOfTasks > 0 && <FooterConnector/>}
  
        </div>
      </div>
    </section>
  );
}

AppContainer.propTypes = {
  numOfTasks:PropTypes.number,
  getItemsAction:PropTypes.func,
};

export default AppContainer;



// const [items, setItems] = useState([]);
//   const [numOfTasks, setNumOfTasks] = useState(0);
//   // 
//   const dispatch = useDispatch();
//   const todos = useSelector((state) => state.todos);
//   // 
//   const renderNewItems = async (item) => {
//     try {
//       const newItems = await createItem(item);
//       newItems.forEach((item) => {
//         items.push(item);
//       });
//       setItems([...items]);
//       setNumOfTasks(items.length);
//     } catch (err) {
//       throw new Error(err);
//     }
//   };

//   const deleteItemFromTodoList = async (itemId) => {
//     try {
//       await deleteItem(itemId);
//       const itemIndex = items.findIndex((item) => item.itemId === itemId);
//       items.splice(itemIndex, 1);
//       setItems([...items]);
//       setNumOfTasks(items.length);
//     } catch (err) {
//       throw new Error(err);
//     }
//   };
//   const clearAllFromDb = async () => {
//     try {
//       await deleteAllItems();
//       setItems([]);
//       setNumOfTasks(0);
//     } catch (err) {
//       throw new Error(err);
//     }
//   };