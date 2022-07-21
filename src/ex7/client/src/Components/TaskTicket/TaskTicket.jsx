import React, { memo, useCallback } from "react";
import { Icon } from "monday-ui-react-core";
import Delete from "monday-ui-react-core/dist/icons/Delete";
import propTypes from "prop-types";

import styles from "./TaskTicket.module.scss";

const TaskTicket = memo(
  ({ task, deleteTaskAction, updateTaskAction }) => {
    const onDelete = useCallback(
      (e) => {
        deleteTaskAction(task);
      },
      [deleteTaskAction, task]
    );

    const taskAlert = useCallback(() => {
      alert(task.itemName);
    });

    const onToggle = useCallback((e) => {
      const updated = { ...task, status: e.target.checked };
      updateTaskAction(updated);
    });

    return (
      <div className={styles.task}>
        <input
          type="checkbox"
          onChange={onToggle}
         checked={task.status}
        />
        <h3 className={styles.item_name} onClick={taskAlert}>
          {task.itemName}
        </h3>
        <Icon
          className={styles.delete}
          icon={Delete}
          iconSize={24}
          onClick={onDelete}
          ignoreFocusStyle
        />
      </div>
    );
  }
);

TaskTicket.propTypes = {
  task: propTypes.object.isRequired,
  onTaskDelete: propTypes.func,
  onToggleComplete: propTypes.func,
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
  onTaskDelete: defaultFunc,
  onToggleComplete: defaultFunc,
};

export default TaskTicket;
