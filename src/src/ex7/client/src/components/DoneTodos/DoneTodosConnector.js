import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import DoneTodos from "./DoneTodos";
import { getSearchInput,getDoneItems } from "../../redux/selectors/items-entities-selectors";


const mapStateToProps = (state, ownProps) => {
    
    const searchInputValue = getSearchInput(state);
   
    const doneItems = getDoneItems(state)
    return {searchInputValue,doneItems };
  };
  
  const mapDispatchToProps = (dispatch, ownProps) => {
    return bindActionCreators(
      {
        
       
      },
      dispatch
    );
    }  

    export default connect(mapStateToProps, mapDispatchToProps)(DoneTodos);