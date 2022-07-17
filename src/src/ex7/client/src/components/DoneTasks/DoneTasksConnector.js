import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import DoneTasks from "./DoneTasks";
import {getSearchInput, getDoneItems } from "../../redux/selectors/itemsEntitiesSelectors";


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


    export default connect(mapStateToProps, mapDispatchToProps)(DoneTasks);

