import "../App.css";
import AddBar from "./AddBar";
import SortButtons from "./SortButtons";
import Tasks from "./Tasks";
import Loader from "./Loader";
import PendingTasks from "./PendingTasks";
import Button from "./Button";
import Titles from "./Titles";

function Card() {
   return (
      <div className="card">
         <Titles />
         <AddBar />
         <SortButtons />
         <div className="tasks-and-clear-container">
            <Tasks />
            <Loader />
            <div className="footer-container">
               <PendingTasks />
               <Button innerText={"Clear All"} className={"clear-all"} />
            </div>
         </div>
      </div>
   );
}

export default Card;
