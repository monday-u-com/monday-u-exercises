import pendingTasksCSS from "./PendingTasks.module.css";
import PropTypes from "prop-types";

function PendingTasks({ tasks }) {
   return (
      <p className={pendingTasksCSS["pending-tasks"]}>
         You have <span id={pendingTasksCSS["tasks-counter"]}>{tasks.length}</span> pending tasks
      </p>
   );
}

PendingTasks.propTypes = {
   tasks: PropTypes.array,
};

export default PendingTasks;
