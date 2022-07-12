import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import{clearAllItemsAction} from '../../redux/actions/ItemActions'
import { getItems } from "../../redux/selectors/itemsEntitiesSelectors";
import ListFooter from "./ListFooter";

const mapStateToProps = (state, ownProps) => {
    
    const numOfItems = getItems(state).length

    return {numOfItems};
  };
  
  const mapDispatchToProps = (dispatch, ownProps) => {
    return bindActionCreators(
      {
        clearAllItemsAction
      },
      dispatch
    );
    }  


    export default connect(mapStateToProps, mapDispatchToProps)(ListFooter);

