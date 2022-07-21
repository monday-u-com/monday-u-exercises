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

TasksContainer.PropsTypes = {
  filteredtodoList: PropTypes.array,
};

export default TasksContainer;
