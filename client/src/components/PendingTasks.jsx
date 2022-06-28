import "../App.css";

function PendingTasks({ tasks }) {
   return (
      <p className="pending-tasks">
         You have <span id="tasks-counter">{tasks.length}</span> pending tasks
      </p>
   );
}

export default PendingTasks;
