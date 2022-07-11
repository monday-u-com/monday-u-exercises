import { List, Flex } from 'monday-ui-react-core';
import Item from './Item';
import ListPlaceHolder from '../ui/ListPlaceHolder';
import 'monday-ui-react-core/dist/main.css';
import { PropTypes } from 'prop-types';
import { useSelector } from 'react-redux';
import ViewMenu from '../view-menu/ViewMenu';

const ItemsList = () => {
  const items = useSelector((state) => state.itemsEntities.items);
  const searchedItemsIds = useSelector(
    (state) => state.itemsEntities.searchedItems
  );
  const view = useSelector((state) => state.itemsView.show);

  const searchedItems =
    searchedItemsIds !== null
      ? items.filter((item) => searchedItemsIds.some((id) => id === item.id))
      : items;

  let itemsToRender = searchedItems;
  if (view === 'done')
    itemsToRender = searchedItems.filter((item) => item.status === true);
  else if (view === 'undone')
    itemsToRender = searchedItems.filter((item) => item.status === false);

  if (items.length === 0) {
    return <ListPlaceHolder />;
  }

  return (
    <Flex
      direction={Flex.directions.COLUMN}
      align={Flex.align.END}
      style={{ width: '100%' }}
    >
      <ViewMenu />
      <List className="list">
        {itemsToRender.map((item) => (
          <Item
            key={item.id}
            id={item.id}
            text={item.name}
            status={item.status}
          />
        ))}
      </List>
    </Flex>
  );
};

export default ItemsList;

ItemsList.propTypes = {
  items: PropTypes.array,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  onChangeStatus: PropTypes.func,
};
