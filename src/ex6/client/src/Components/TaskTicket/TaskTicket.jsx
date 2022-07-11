import React, { memo, useCallback } from "react";
import { Icon } from "monday-ui-react-core";
import Delete from "monday-ui-react-core/dist/icons/Delete";
import PropTypes from "prop-types";

import styles from "./TaskTicket.module.scss";

const TaskTicket = memo(({ task, index, onTaskDelete, onToggleComplete }) => {
  const onDelete = useCallback((e) => {
    e.stopPropagation();
    onTaskDelete(task.itemName);
  });

  const taskAlert = useCallback(() => {
    alert(task.itemName);
  });

  const onToggle = useCallback((e) => {
    e.stopPropagation();
    const updated = { ...task, status: e.target.checked };
    onToggleComplete(updated);
  });

  return (
    <div key={index} className={styles.task} onClick={taskAlert}>
      <input
        type="checkbox"
        onChange={onToggle}
        onClick={(e) => e.stopPropagation()}
        checked={task.status}
      />
      <h3 className={styles.item_name}>{task.itemName}</h3>
      <Icon
        className={styles.delete}
        icon={Delete}
        iconSize="24"
        onClick={onDelete}
        ignoreFocusStyle
      />
    </div>
  );
});

TaskTicket.PropTypes = {
  task: PropTypes.object,
  index: PropTypes.number,
  onTaskDelete: PropTypes.func,
  onToggleComplete: PropTypes.func,
};

const defaultFunc = () => {
  console.log("Error:No function received");
};

const defaultObject = {
  itemName: "defaultObject",
  status: false,
};

TaskTicket.defaultProps = {
  task: defaultObject,
  index: -1,
  onTaskDelete: defaultFunc,
  onToggleComplete: defaultFunc,
};

export default TaskTicket;
