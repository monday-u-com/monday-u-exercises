import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { clearTasksAction } from "../../actions/api-actions";
import HomeCard from "./HomeCard";
import { getAllTasks } from "../../selectors/items-entities-selectors";

const mapStateToProps = (state, ownProps) => {
   const tasks = getAllTasks(state);
   return { tasks };
};

const mapDispatchToProps = (dispatch, ownProps) => {
   return bindActionCreators({ clearTasksAction }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeCard);
