import { MenuButton, MenuItem, Menu } from 'monday-ui-react-core';
import { showAllAction } from '../../actions/show-all-actions';
import { showDoneAction } from '../../actions/show-done-actions';
import { showUndoneAction } from '../../actions/show-undone-actions';
import { useDispatch } from 'react-redux';
const ViewMenu = () => {
  const dispatch = useDispatch();

  return (
    <div style={{ padding: '0 16px' }}>
      <MenuButton>
        <Menu id="menu">
          <MenuItem
            onClick={() => {
              dispatch(showDoneAction());
            }}
            title="Done"
          />
          <MenuItem
            onClick={() => {
              dispatch(showUndoneAction());
            }}
            title="Undone"
          />
          <MenuItem
            onClick={() => {
              dispatch(showAllAction());
            }}
            title="All"
          />
        </Menu>
      </MenuButton>
    </div>
  );
};

export default ViewMenu;
