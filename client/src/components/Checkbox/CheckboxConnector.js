import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Checkbox from "./Checkbox";
import { checkMarkTaskAction } from "../../actions/api-actions";
import { getTasksToDisplay } from "../../selectors/items-view-selectors";

const mapStateToProps = (state, ownProps) => {
   const tasks = getTasksToDisplay(state);
   return { tasks };
};

const mapDispatchToProps = (dispatch, ownProps) => {
   return bindActionCreators({ checkMarkTaskAction }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkbox);
