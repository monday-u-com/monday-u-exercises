import {connect} from "react-redux";
import TodoFiltersComponent from "./todo-filters-component";
import {bindActionCreators} from "redux";

const mapDispatchToProps = (dispatch, ownProps) => {
    return bindActionCreators({}, dispatch);
};

export default connect(null, mapDispatchToProps)(TodoFiltersComponent);
