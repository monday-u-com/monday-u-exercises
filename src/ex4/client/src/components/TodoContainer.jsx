import { Flex } from 'monday-ui-react-core';
import ItemInput from './ItemInput';
import ItemsList from './items/ItemsList';
import Card from './ui/Card';
import ControlBar from './control-bar/ControlBar';
import 'monday-ui-react-core/dist/main.css';
import { useState, useEffect } from 'react';
import {
  getItems,
  addItems,
  removeAll,
  editItem,
  removeItem,
  changeStatus,
} from '../Services/item_client';
import LoadingSpinner from './ui/LoadingSpinner';

const TodoContainer = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const list = [];
    getItems().then((result) => {
      result.forEach((item) => list.push(item));
      setIsLoading(false);
      setItems(list);
    });
  }, []);

  const addItem = async (newItems) => {
    const inputArray = newItems.split(',');
    setIsLoading(true);
    const createdItems = await addItems(inputArray);
    setIsLoading(false);
    setItems([...createdItems, ...items]);
  };

  const deleteItem = async (id) => {
    await removeItem(id);
    setItems(items.filter((item) => item.id !== id));
  };

  const editSingleItem = async (id, text) => {
    await editItem(id, text);
  };

  const changeStatusHandler = async (id, newStatus) => {
    await changeStatus(id, newStatus);
  };

  const deleteAll = async () => {
    setIsLoading(true);
    await removeAll();
    setIsLoading(false);
    setItems([]);
  };

  const sortList = async (field) => {
    setIsLoading(true);
    const sortedList = await getItems(field);
    setIsLoading(false);
    setItems(sortedList);
  };
  return (
    <Flex
      className="todo-container"
      justify={Flex.justify.SPACE_BETWEEN}
      direction={Flex.directions.COLUMN}
    >
      <div className="todo-list-container">
        <h1>Todo List</h1>
        <ItemInput onAdd={addItem} className="todo-list-input" />
        {isLoading && <LoadingSpinner />}
        {!isLoading && (
          <ItemsList
            items={items}
            onDelete={deleteItem}
            onEdit={editSingleItem}
            onChangeStatus={changeStatusHandler}
          />
        )}
      </div>
      <ControlBar onDeleteAll={deleteAll} onSort={sortList}></ControlBar>
    </Flex>
  );
};

export default TodoContainer;
