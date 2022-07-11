import Todo from "./Todo";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getItems,getSearchInput} from "../../redux/selectors/items-entities-selectors";

const mapStateToProps = (state, ownProps) => {
  const items = getItems(state)
  const searchInputValue = getSearchInput(state)


  return {items,searchInputValue };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return bindActionCreators(
    {
     
    },
    dispatch
  );
  }  


  export default connect(mapStateToProps, mapDispatchToProps)(Todo);
