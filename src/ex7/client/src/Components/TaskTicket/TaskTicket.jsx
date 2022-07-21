import React, { memo, useCallback } from "react";
import { Icon } from "monday-ui-react-core";
import Delete from "monday-ui-react-core/dist/icons/Delete";
<<<<<<< HEAD
import propTypes from "prop-types";

import styles from "./TaskTicket.module.scss";

const TaskTicket = memo(({ task, deleteTaskAction, updateTaskAction }) => {
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
      <input type="checkbox" onChange={onToggle} checked={task.status} />
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
});

TaskTicket.propTypes = {
  task: propTypes.object.isRequired,
  onTaskDelete: propTypes.func,
  onToggleComplete: propTypes.func,
=======
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
>>>>>>> main
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
<<<<<<< HEAD
=======
  index: -1,
>>>>>>> main
  onTaskDelete: defaultFunc,
  onToggleComplete: defaultFunc,
};

export default TaskTicket;
