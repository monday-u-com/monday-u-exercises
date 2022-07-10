import { useCallback, useState } from "react";
import TextField from "monday-ui-react-core/dist/TextField";
import Button from "monday-ui-react-core/dist/Button";
import Add from "monday-ui-react-core/dist/icons/Add";
import PropTypes from "prop-types";
import styles from "./ListControlsComponent.module.scss";

function ListControlsComponent({ addItem }) {
  const [name, setName] = useState("");

  const onInputChange = useCallback(value => {
    setName(value);
  }, [])

  const addItemCallback = useCallback(async () => {
    addItem(name);
  }, [name])

  const handleEnterPressed = useCallback(event => {
    if (event.key === "Enter") {
      event.preventDefault();
      addItemCallback(name);
    }
  }, [addItemCallback, name])

  return (
    <div className={styles.container} onChange={console.log}>
      <TextField placeholder="Add your new todo"
                 size={TextField.sizes.MEDIUM}
                 classNamxe={styles.input}
                 onChange={onInputChange}
                 onKeyDown={handleEnterPressed}/>
      <Button rightIcon={Add} onClick={addItemCallback}/>
    </div>
  );
}

ListControlsComponent.propTypes = {
  onChange: PropTypes.func
};

export default ListControlsComponent;
