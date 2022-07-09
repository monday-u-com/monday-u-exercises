import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { sortTasksAction } from "../../actions/api-actions";
import SortButtons from "./SortButtons";

const mapDispatchToProps = (dispatch, ownProps) => {
   return bindActionCreators({ sortTasksAction }, dispatch);
};

export default connect(null, mapDispatchToProps)(SortButtons);
