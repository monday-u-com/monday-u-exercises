import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ListControls from "./ListControls";
import{showLoaderAction,hideLoaderAction} from '../../redux/actions/ViewsActions'
import{addItemsAction} from '../../redux/actions/ItemActions'
import { getItems } from "../../redux/selectors/itemsEntitiesSelectors";
import { getShowLoader } from "../../redux/selectors/items-view-selectors";

const mapStateToProps = (state, ownProps) => {
    const showLoader = getShowLoader(state);
    const items = getItems(state)

    return { showLoader,items };
  };
  
  const mapDispatchToProps = (dispatch, ownProps) => {
    return bindActionCreators(
      {
        showLoaderAction,hideLoaderAction,addItemsAction,
      },
      dispatch
    );
    }  


    export default connect(mapStateToProps, mapDispatchToProps)(ListControls);

