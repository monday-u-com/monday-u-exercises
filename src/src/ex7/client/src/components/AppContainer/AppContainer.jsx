import { useEffect} from "react";
import "./AppContainer.css";
import PropTypes from "prop-types";
import SearchConnector from "../Search/SearchConnector.js";
import TodoConnector from "../Todo/TodoConnector";
import TodoControlsConnector from "../TodoControls/TodoControlsConnector";
import FooterConnector from "../Footer/FooterConnector";


const AppContainer = ({ numOfTasks, getItemsAction }) => {
  

  useEffect(() => {
    getItemsAction();
  }, [getItemsAction]);

  return (
    <section className="wrapper">
      <div className="todoApp" id="todoApp">
        <h1 className="">TOdoS</h1>

        <div>
          <TodoControlsConnector/>
          <SearchConnector/>
          <TodoConnector/>
          {numOfTasks > 0 && <FooterConnector/>}
  
        </div>
      </div>
    </section>
  );
}

AppContainer.propTypes = {
  numOfTasks:PropTypes.number,
  getItemsAction:PropTypes.func,
};

export default AppContainer;
