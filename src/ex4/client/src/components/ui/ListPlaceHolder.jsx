import { MoveArrowUp } from 'monday-ui-react-core/dist/allIcons';
import { Icon } from 'monday-ui-react-core';

const ListPlaceHolder = () => {
  return (
    <div className="empty-list">
      <Icon icon={MoveArrowUp} />
      <h3>Add a new task!</h3>
    </div>
  );
};

export default ListPlaceHolder;
