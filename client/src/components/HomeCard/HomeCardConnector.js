import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { clearTasksAction } from "../../actions/api-actions";
import HomeCard from "./HomeCard";
import { getAllTasks } from "../../selectors/items-entities-selectors";
import { ActionCreators as UndoActionCreators } from "redux-undo";

const mapStateToProps = (state, ownProps) => {
   const NUM_OF_PAST_STATES_ON_LOAD = 2;
   const tasks = getAllTasks(state);
   const canUndo = state.itemsEntities.past.length > NUM_OF_PAST_STATES_ON_LOAD;
   return { tasks, canUndo };
};

const mapDispatchToProps = (dispatch, ownProps) => {
   const onUndo = () => UndoActionCreators.undo();

   return bindActionCreators({ clearTasksAction, onUndo }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeCard);
