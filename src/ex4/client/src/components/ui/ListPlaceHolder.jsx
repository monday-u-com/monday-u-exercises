import { ReactComponent as Hand } from '../../images/hand_icon.svg';
import { Icon } from 'monday-ui-react-core';

const ListPlaceHolder = () => {
  return (
    <div className="empty-list">
      <Icon icon={Hand} />
      <h3>Add a new task!</h3>
    </div>
  );
};

export default ListPlaceHolder;
