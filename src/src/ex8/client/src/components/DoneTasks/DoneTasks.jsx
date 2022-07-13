import PropTypes from "prop-types";
import ListItemConnector from "../ListItem/ListItemConnector.js";
const DoneTasks = ({ searchInputValue, doneItems }) => {
  return (
    <div>
      <ul className="tasks">
        {doneItems
          .filter((item) => item.itemName.includes(searchInputValue))
          .map((item) => {
            return <ListItemConnector item={item} key={item.itemId} />;
          })}
      </ul>
    </div>
  );
};
DoneTasks.prototype = {
  doneItems: PropTypes.array,
  searchInputValue: PropTypes.string,
};

export default DoneTasks;
