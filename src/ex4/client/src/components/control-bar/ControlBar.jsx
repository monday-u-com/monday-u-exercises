import { Flex, Button, SplitButton, ListItem } from 'monday-ui-react-core';
import { PropTypes } from 'prop-types';
import 'monday-ui-react-core/dist/main.css';
import { fetchItems } from '../../reducers/items-entities-reducer';
import { useDispatch } from 'react-redux';

const ControlBar = ({ onDeleteAll, onSort }) => {
  const dispatch = useDispatch();

  const sortHandler = (field) => {
    dispatch(fetchItems(field));
  };

  return (
    <Flex
      justify={Flex.justify.SPACE_AROUND}
      style={{
        width: '100%',
      }}
    >
      <Button
        onClick={onDeleteAll}
        size={Button.sizes.SMALL}
        kind={Button.kinds.SECONDARY}
      >
        DELETE ALL
      </Button>
      <SplitButton
        size={Button.sizes.SMALL}
        kind={SplitButton.kinds.SECONDARY}
        secondaryDialogPosition={SplitButton.secondaryPositions.BOTTOM_MIDDLE}
        secondaryDialogContent={[
          <ListItem key="name-sort" onClick={() => sortHandler('name')}>
            By Name
          </ListItem>,
          <ListItem key="date-sort" onClick={() => sortHandler('createdAt')}>
            By Date
          </ListItem>,
          <ListItem key="status-sort" onClick={() => sortHandler('status')}>
            By Progress
          </ListItem>,
        ]}
      >
        SORT
      </SplitButton>
    </Flex>
  );
};

export default ControlBar;

ControlBar.propTypes = {
  onDeleteAll: PropTypes.func,
  onSort: PropTypes.func,
};
