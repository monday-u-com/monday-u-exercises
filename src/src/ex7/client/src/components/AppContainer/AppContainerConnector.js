import AppContainer from "./AppContainer";
import { getItemsAction } from "../../redux/actions/ItemActions";
import { getItems ,getTasksStatusState } from "../../redux/selectors/items-entities-selectors";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const mapStateToProps = (state,ownProps) =>{
    const numOfTasks = getItems(state).length
    const tasksStatusState = getTasksStatusState(state)
  
    return {numOfTasks,tasksStatusState}
};

const mapDispatchToProps = (dispatch, ownProps) =>{
    return bindActionCreators(
        {
          getItemsAction,
        },
        dispatch
      );
    };

export default connect(mapStateToProps,mapDispatchToProps)(AppContainer);