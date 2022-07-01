import React from "react";
import Item from "./Item";
import styles from "./ListItems.module.css";
import PropTypes from "prop-types";

const ListItem = ({
  data,
  removeIdFromDataHandler,
  onChangeValueUpdateData,
  setToastProps,
  checkIfTextAlreadyExist,
}) => {
  return (
    <ul className={styles.list}>
      {data.map((item) => {
        return (
          <React.Fragment key={item.id}>
            <Item
              itemName={item.itemName}
              id={item.id}
              removeIdFromDataHandler={removeIdFromDataHandler}
              status={item.status}
              onChangeValueUpdateDataHandler={onChangeValueUpdateData}
              setToastProps={setToastProps}
              checkIfTextAlreadyExist={checkIfTextAlreadyExist}
            ></Item>
          </React.Fragment>
        );
      })}
    </ul>
  );
};

ListItem.propTypes = {
  data: PropTypes.array,
  removeIdFromDataHandler: PropTypes.func,
  onChangeValueUpdateData: PropTypes.func,
  setToastProps: PropTypes.func,
};

ListItem.defaultProps = {
  data: [],
  removeIdFromDataHandler: "none", /// need to check it with ayelet
  onChangeValueUpdateData: "none",
  setToastProps: "none",
};

export default ListItem;
