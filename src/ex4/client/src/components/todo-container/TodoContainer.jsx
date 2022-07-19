import { Flex } from 'monday-ui-react-core';
import ItemInput from '../item-input/ItemInput';
import ItemsList from '../items-list/ItemsList';
import ControlBar from '../control-bar/ControlBar';
import 'monday-ui-react-core/dist/main.css';
import { useSelector, useDispatch } from 'react-redux';
import { deleteAll } from '../../actions/deleteAll-items-actions';
import { addNewItems } from '../../actions/add-item-actions';
import LoadingSpinner from '../ui/LoadingSpinner';
import SearchBar from '../search/SearchBar';

const TodoContainer = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.itemsEntities.status);

  const addItem = async (newItems) => {
    const inputArray = newItems.split(',');
    dispatch(addNewItems(inputArray));
  };

  const removeAll = async () => {
    dispatch(deleteAll());
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
        <SearchBar />
        {isLoading === 'loading' && <LoadingSpinner />}
        {isLoading === 'idle' && <ItemsList />}
      </div>
      <ControlBar onDeleteAll={removeAll}></ControlBar>
    </Flex>
  );
};

export default TodoContainer;
