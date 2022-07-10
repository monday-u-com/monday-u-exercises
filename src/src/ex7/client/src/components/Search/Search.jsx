import TodoListConnector from "../TodoList/TodoListConnector";
import PropTypes from "prop-types";

const Search = ({items, updateSearchInputAction,searchInputValue }) =>{
    const handleInput = (e) =>{
        updateSearchInputAction(e.target.value.trim());
    }
    return (
        <div>
        <input type="text" placeholder="Search Todos Here" onChange={handleInput} value={searchInputValue}></input>

        </div>
    );
};

Search.propTypes = {
    items: PropTypes.array,
  };
  
  export default Search;