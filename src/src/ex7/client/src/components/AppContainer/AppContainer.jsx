import { useEffect} from "react";
import "./AppContainer.css";
import PropTypes from "prop-types";
import SearchConnector from "../Search/SearchConnector.js";
import TodoConnector from "../Todo/TodoConnector";
import SelectBoxConnector from "../SelectBox/SelectBoxConnector";
import TodoControlsConnector from "../TodoControls/TodoControlsConnector";
import FooterConnector from "../Footer/FooterConnector";
import DoneTodosConnector from "../DoneTodos/DoneTodosConnector";


const AppContainer = ({ numOfTasks, getItemsAction , tasksStatusState }) => {
  

  useEffect(() => {
    getItemsAction();
  }, [getItemsAction]);

  return (
    <section className="wrapper">
      <div className="todoApp" id="todoApp">
        <h1 className="">TOdoS</h1>

        <div>
          <TodoControlsConnector/>
          {numOfTasks > 0 && <SearchConnector />}
          {tasksStatusState ? <TodoConnector /> : <DoneTodosConnector />}
          {numOfTasks > 0 && <SelectBoxConnector />}
          {numOfTasks > 0 && <FooterConnector />}
  
        </div>
      </div>
    </section>
  );
}

AppContainer.propTypes = {
  numOfTasks:PropTypes.number,
  getItemsAction:PropTypes.func,
  tasksStatusState: PropTypes.bool,
};

export default AppContainer;
