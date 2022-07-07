import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getAllTasks } from "../../selectors/items-entities-selectors";
import { setDropdownFilterAction } from "../../actions/filter-actions";
import DropdownFilter from "./DropdownFilter";

const mapStateToProps = (state, ownProps) => {
   const tasks = getAllTasks(state);
   return { tasks };
};

const mapDispatchToProps = (dispatch, ownProps) => {
   return bindActionCreators({ setDropdownFilterAction }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(DropdownFilter);
