import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setSortDirectionAction } from "../../actions/filter-actions";
import SortButtons from "./SortButtons";

const mapDispatchToProps = (dispatch, ownProps) => {
   return bindActionCreators({ setSortDirectionAction }, dispatch);
};

export default connect(null, mapDispatchToProps)(SortButtons);
