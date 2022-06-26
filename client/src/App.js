import "./App.css";
import AddBar from "./components/AddBar";
import SortButtons from "./components/SortButtons";
import Tasks from "./components/Tasks";
import Loader from "./components/Loader";
import PendingTasks from "./components/PendingTasks";
import ClearButton from "./components/ClearButton";

function App() {
   return (
      <div className="card-container">
         <div className="card">
            <h1 className="app-title">Weekend To-Do</h1>
            <p className="info">
               Get your tasks done before the weekend! And catch some Pokemons while you're at it...
            </p>
            <AddBar />
            <SortButtons />
            <div className="tasks-and-clear-container">
               <Tasks />
               <Loader />
               <div className="footer-container">
                  <PendingTasks />
                  <ClearButton />
               </div>
            </div>
         </div>
      </div>
   );
}

export default App;
