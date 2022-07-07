import {connect} from "react-redux";
import TodoSortByComponent from "./todo-sort-by-component";
import {bindActionCreators} from "redux";
import {setSortBy} from "../../../../app/actions/todo-sort-by-actions";
import {getSortByObject} from "../../../../app/selectors/todo-sort-by-selectors";

const mapStateToProps = (state, ownProps) => {
    const sortByObject = getSortByObject(state);
    return {sortByObject};
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return bindActionCreators({setSortBy}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoSortByComponent);
