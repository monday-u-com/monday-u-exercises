import pendingTasksCSS from "./PendingTasks.module.css";
import PropTypes from "prop-types";

function PendingTasks({ tasks }) {
   const numOfDoneTasks = tasks.reduce((previousVal, currentVal) => {
      return previousVal + currentVal.status;
   }, 0);

   return (
      <>
         <p className={pendingTasksCSS["pending-tasks"]}>You have {tasks.length} tasks,</p>
         <p className={pendingTasksCSS["pending-tasks"]}>{numOfDoneTasks} marked as done</p>
      </>
   );
}

PendingTasks.propTypes = {
   tasks: PropTypes.array,
};

export default PendingTasks;
