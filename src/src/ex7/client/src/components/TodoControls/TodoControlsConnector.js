import TodoControls from "./TodoControls";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { showLoaderAction, hideLoaderAction } from "../../redux/actions/ViewsActions";
import { addItemsAction } from "../../redux/actions/ItemActions";
import { getShowLoader } from "../../redux/selectors/items-view-selectors";
import { getItems } from "../../redux/selectors/itemsEntitiesSelectors";

const mapStateToProps = (state , ownProps) => {
    const showLoader = getShowLoader(state);
    const items = getItems(state)

    return {showLoader ,items};
};

const mapDispatchToProps = (dispatch , ownProps) =>{
    return bindActionCreators({
        showLoaderAction,hideLoaderAction,addItemsAction,

    },
    dispatch
    );
}

export default connect(mapStateToProps,mapDispatchToProps)(TodoControls);