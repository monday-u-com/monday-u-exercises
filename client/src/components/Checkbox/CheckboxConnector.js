import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Checkbox from "./Checkbox";
import { checkMarkTaskAction } from "../../actions/api-actions";
import { getAllTasks } from "../../selectors/items-entities-selectors";

const mapStateToProps = (state, ownProps) => {
   const tasks = getAllTasks(state);
   return { tasks };
};

const mapDispatchToProps = (dispatch, ownProps) => {
   return bindActionCreators({ checkMarkTaskAction }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkbox);
