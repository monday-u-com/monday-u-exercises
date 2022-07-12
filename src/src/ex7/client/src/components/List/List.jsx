import "./List.css";
import PropTypes from "prop-types";
import ListItemConnector from "../ListItem/ListItemConnector.js";
const List = ({ items, searchInputValue}) => {
  return (
    <div className="">
      <ul className="todos">
        
        {items
          .filter((item) => item.item.includes(searchInputValue))
          .map((item) => {
            return <ListItemConnector item={item} key={item.itemId} />;
          })}
      </ul>
    </div>
  );
};
List.prototype = {
  items: PropTypes.array,
  searchInputValue: PropTypes.string,
};

export default List;
