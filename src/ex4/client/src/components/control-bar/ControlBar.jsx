import { Flex, Button, SplitButton, ListItem } from 'monday-ui-react-core';
import { PropTypes } from 'prop-types';
import 'monday-ui-react-core/dist/main.css';

const ControlBar = ({ onDeleteAll, onSort }) => {
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
          <ListItem onClick={() => onSort('name')}>By Name</ListItem>,
          <ListItem onClick={() => onSort('createdAt')}>By Date</ListItem>,
          <ListItem onClick={() => onSort('status')}>By Progress</ListItem>,
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
