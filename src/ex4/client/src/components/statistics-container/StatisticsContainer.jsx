import { Flex } from 'monday-ui-react-core';
import 'monday-ui-react-core/dist/main.css';
import { useSelector } from 'react-redux';

const StatisticsContainer = () => {
  const items = useSelector((state) => state.itemsEntities.items);

  return (
    <Flex
      className="todo-container"
      justify={Flex.justify.SPACE_BETWEEN}
      direction={Flex.directions.COLUMN}
    >
      <div className="todo-list-container">
        <h1>Statistics</h1>
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
      </div>
    </Flex>
  );
};

export default StatisticsContainer;
