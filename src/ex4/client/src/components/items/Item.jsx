import { ListItem, IconButton, Flex } from 'monday-ui-react-core';
import { ReactComponent as Delete } from '../../images/delete_icon.svg';
import { ReactComponent as Edit } from '../../images/edit_icon.svg';
import 'monday-ui-react-core/dist/main.css';
import { useRef, useState } from 'react';
import { PropTypes } from 'prop-types';

const Item = ({ text, onDelete, onEdit, onChangeStatus, id, status }) => {
  const label = useRef('');
  const [checked, setChecked] = useState(status);

  const deleteHandler = () => {
    onDelete(id);
  };

  const changeStatusHandler = () => {
    onChangeStatus(id, !checked);
    setChecked(!checked);
  };

  const editItemHandler = (event) => {
    const itemLabel = label.current;
    if (event.key === 'Enter') {
      itemLabel.contentEditable = 'false';
      if (itemLabel.prevText !== itemLabel.innerText) {
        onEdit(id, itemLabel.innerText);
      }
    }
  };

  const toggleEditMode = () => {
    const itemLabel = label.current;
    itemLabel.prevText = itemLabel.innerText;
    const currentState = itemLabel.contentEditable;
    itemLabel.contentEditable = currentState === 'true' ? 'false' : 'true';
  };

  return (
    <ListItem>
      <Flex
        justify={Flex.justify.SPACE_BETWEEN}
        style={{
          width: '100%',
        }}
      >
        <div>
          <input
            type="checkbox"
            checked={checked}
            onChange={changeStatusHandler}
          ></input>
          <label ref={label} prevText={text} onKeyPress={editItemHandler}>
            {text}
          </label>
        </div>
        <div>
          <IconButton
            ariaLabel="Edit item"
            icon={Edit}
            onClick={toggleEditMode}
          ></IconButton>
          <IconButton
            ariaLabel="Delete item"
            icon={Delete}
            onClick={deleteHandler}
          ></IconButton>
        </div>
      </Flex>
    </ListItem>
  );
};

export default Item;

Item.propTypes = {
  text: PropTypes.string,
  id: PropTypes.string,
  status: PropTypes.bool,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  onChangeStatus: PropTypes.func,
};
