import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { Checkbox, Loader, Button } from "monday-ui-react-core";
import Delete from "monday-ui-react-core/dist/icons/Delete";
import styles from "./ListItemComponent.module.scss";

function ListItemComponent({ name, id, status, removeItem, toggleItem }) {
  const [isLoading, setIsLoading] = useState(false);

  const onToggleItem = useCallback(async () => {
    const checked = !status;
    const item = { name, id, status: checked };
    try {
      toggleItem(item);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(true);
    }
  }, [status]);

  const onDeleteItem = useCallback(async () => {
    const item = { name, id, status };
    setIsLoading(true);
    removeItem(item);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className={styles.container} key={id}>
        <Loader size={40} />
      </div>
    );
  }

  return (
    <div className={styles.container} key={id}>
      <Checkbox checked={status} onChange={onToggleItem} />
      <p className={styles.text} onClick={onToggleItem}>{name}</p>
      <Button rightIcon={Delete}
              size={Button.sizes.SMALL}
              kind={Button.kinds.TERTIARY}
              className={styles.deleteButton}
              onClick={onDeleteItem} />
    </div>
  );
}

ListItemComponent.propTypes = {
  name: PropTypes.string,
  id: PropTypes.number,
  status: PropTypes.bool,
  onChange: PropTypes.func
};

ListItemComponent.defaultProps = {
  status: false
};

export default ListItemComponent;
