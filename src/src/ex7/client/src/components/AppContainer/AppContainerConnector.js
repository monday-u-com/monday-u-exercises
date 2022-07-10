import AppContainer from "./AppContainer";
import { getItemsAction } from "../../redux/actions/ItemActions";
import { getItems } from "../../redux/selectors/items-entities-selectors";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const mapStateToProps = (state,ownProps) =>{
    const numOfTasks = getItems(state).length
    return {numOfTasks}
};

const mapDispatchToProps = (dispatch, ownProps) =>{
    return bindActionCreators({
        getItemsAction,
    },
    dispatch
    );
};

export default connect(mapStateToProps,mapDispatchToProps)(AppContainer);