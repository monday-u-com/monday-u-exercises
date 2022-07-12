import { useEffect } from "react";
import "./AppContainer.css";
import ListConnector from "../List/ListConnector";
import ListControlsConnector from "../ListControls/ListControlsConnector";
import ListFooterConnector from "../ListFooter/ListFooterConnector";
import PropTypes from "prop-types";
import SearchBoxConnector from "../SearchBox/SearchBoxConnector.js";
import SelectBoxConnector from "../SelectBox/SelectBoxConnector";
import DoneTasksConnector from "../DoneTasks/DoneTasksConnector";

const AppContainer = ({ numOfItems, getItemsAction, tasksStatusState }) => {
  useEffect(() => {
    getItemsAction();
  }, [getItemsAction]);

  return (
    <section className="wrapper">
      <div className="todoApp" id="todoApp">
        <h1 className="">TodoS</h1>

        <div>
          <ListControlsConnector />
          {numOfItems > 0 && <SearchBoxConnector />}
          {tasksStatusState ? <ListConnector /> : <DoneTasksConnector />}
          {numOfItems > 0 && <SelectBoxConnector />}
          {numOfItems > 0 && <ListFooterConnector />}
        </div>
      </div>
    </section>
  );
};
AppContainer.propTypes = {
  numOfItems: PropTypes.number,
  getItemsAction: PropTypes.func,
  tasksStatusState: PropTypes.bool,
};

export default AppContainer;
