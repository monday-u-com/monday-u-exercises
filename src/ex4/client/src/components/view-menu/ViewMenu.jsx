import { MenuButton, MenuItem, Menu } from 'monday-ui-react-core';
import {
  showAllAction,
  showDoneAction,
  showUndoneAction,
} from '../../reducers/items-view-reducer';
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
