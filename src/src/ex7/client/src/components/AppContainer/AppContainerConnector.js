import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import AppContainer from "./AppContainer";
import { getItemsAction } from "../../redux/actions/ItemActions";
import { getItems,getTasksStatusState } from "../../redux/selectors/itemsEntitiesSelectors";

const mapStateToProps = (state, ownProps) => {
    const numOfItems = getItems(state).length
    const tasksStatusState = getTasksStatusState(state)
  return {numOfItems,tasksStatusState};
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return bindActionCreators(
    {
      getItemsAction,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
