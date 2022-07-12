import "./ListFooter.css";
import PropTypes from "prop-types";
const ListFooter = ({ numOfItems, clearAllItemsAction }) => {
  const handleClearAllClick = async () => {
    await clearAllItemsAction();
  };

  return (
    <footer>
      <p className="count"> You Have :  {numOfItems} Panding Tasks </p>
      <button onClick={handleClearAllClick} className="clearAllBtn">
      Clear 🆑 All
      </button>
    </footer>
  );
};
ListFooter.propTypes = {
  numOfItems: PropTypes.number,
  clearAllItemsAction: PropTypes.func,
};

export default ListFooter;
