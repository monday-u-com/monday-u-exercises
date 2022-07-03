import { Flex } from 'monday-ui-react-core';
import 'monday-ui-react-core/dist/main.css';
import { useState, useEffect } from 'react';
import { getItems } from '../Services/item_client';
import LoadingSpinner from './ui/LoadingSpinner';

const StatisticsContainer = () => {
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

  return (
    <Flex
      className="todo-container"
      justify={Flex.justify.SPACE_BETWEEN}
      direction={Flex.directions.COLUMN}
    >
      <div className="todo-list-container">
        <h1>Statistics</h1>
        {isLoading && <LoadingSpinner />}
        {!isLoading && (
          <div>
            <h3>Completed: </h3>
            <h3>{items.filter((item) => item.status).length}</h3>
            <h3>Overall:</h3>
            <h3> {items.length}</h3>
            <h3>Catched pokemons:</h3>
            <h3>
              {items.filter((item) => item.pokemonId && item.status).length}
            </h3>
          </div>
        )}
      </div>
    </Flex>
  );
};

export default StatisticsContainer;
