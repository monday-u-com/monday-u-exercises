import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getAllTasks } from "../../selectors/items-entities-selectors";
import { setSearchInputAction } from "../../actions/search-actions";

import Search from "./DropdownFilter";

const mapStateToProps = (state, ownProps) => {
   const tasks = getAllTasks(state);
   return { tasks };
};

const mapDispatchToProps = (dispatch, ownProps) => {
   return bindActionCreators({ setSearchInputAction }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
