import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setSearchInputAction } from "../../actions/filter-actions";
import Search from "./Search";

const mapDispatchToProps = (dispatch, ownProps) => {
   return bindActionCreators({ setSearchInputAction }, dispatch);
};

export default connect(null, mapDispatchToProps)(Search);
