<<<<<<< HEAD
import React from "react";
import TaskTicketConnector from "../TaskTicket/TaskTicket-connector";
import styles from "./TasksContainer.module.scss";
import PropTypes from "prop-types";

const TasksContainer = ({filteredTodoList }) => {
  return (
    <>
      <div className={styles.task_container}>
        {filteredTodoList?.map((item, index) => {
          return <TaskTicketConnector task={item} index={index} key={index} />;
        })}
      </div>
    </>
  );
};
=======
import React, { memo, useCallback } from "react";
import TaskTicket from "../TaskTicket/TaskTicket";
import styles from "./TasksContainer.module.scss";
import { removeTask, updateTask } from "../../api/item_client";
import PropTypes from "prop-types";

const TasksContainer = memo(({ todoList, setIsLoading }) => {
  const onTaskDelete = useCallback((taskContent) => {
    removeTask(taskContent).then(() => {
      setIsLoading(true);
    });
  }, []);

  const onToggleComplete = useCallback((taskContent) => {
    updateTask(taskContent).then(() => {
      setIsLoading(true);
    });
  }, []);

  return (
    <div className={styles.tasks_container}>
      {todoList.map((item, index) => {
        return (
          <TaskTicket
            task={item}
            index={index}
            key={index}
            onTaskDelete={onTaskDelete}
            onToggleComplete={onToggleComplete}
          />
        );
      })}
    </div>
  );
});
>>>>>>> main

TasksContainer.PropsTypes = {
  filteredtodoList: PropTypes.array,
};

<<<<<<< HEAD
=======
TasksContainer.defaultProps = {
  todoList: [],
  setIsLoading: () => {
    console.log("Error: No function received");
  },
};

>>>>>>> main
export default TasksContainer;
