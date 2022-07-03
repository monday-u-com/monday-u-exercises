import { List, Flex } from 'monday-ui-react-core';
import Item from './Item';
import ListPlaceHolder from '../ui/ListPlaceHolder';
import 'monday-ui-react-core/dist/main.css';
import { PropTypes } from 'prop-types';

const ItemsList = ({ items = [], onDelete, onEdit, onChangeStatus }) => {
  if (items.length === 0) {
    return <ListPlaceHolder />;
  }
  return (
    <Flex justify={Flex.justify.CENTER} style={{ width: '100%' }}>
      <List className="list">
        {items.map((item) => (
          <Item
            key={item.id}
            id={item.id}
            text={item.name}
            status={item.status}
            onDelete={onDelete}
            onEdit={onEdit}
            onChangeStatus={onChangeStatus}
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
