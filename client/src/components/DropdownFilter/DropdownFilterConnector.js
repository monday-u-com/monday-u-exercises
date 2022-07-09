import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setDropdownFilterAction } from "../../actions/filter-actions";
import DropdownFilter from "./DropdownFilter";

const mapDispatchToProps = (dispatch, ownProps) => {
   return bindActionCreators({ setDropdownFilterAction }, dispatch);
};

export default connect(null, mapDispatchToProps)(DropdownFilter);
