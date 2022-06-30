import pendingTasksCSS from "./PendingTasks.module.css";

function PendingTasks({ tasks }) {
   return (
      <p className={pendingTasksCSS["pending-tasks"]}>
         You have <span id={pendingTasksCSS["tasks-counter"]}>{tasks.length}</span> pending tasks
      </p>
   );
}

export default PendingTasks;
