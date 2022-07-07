import {connect} from "react-redux";
import TodoSearchComponent from "./todo-status-component";
import {bindActionCreators} from "redux";
import {getTodoStatusArray} from "../../../../app/selectors/todo-status-selectors";
import {setStatusAction} from "../../../../app/actions/todo-status-actions";

const mapStateToProps = (state, ownProps) => {
    const todoStatusArray = getTodoStatusArray(state);
    return {todoStatusArray};
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return bindActionCreators({setStatusAction}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoSearchComponent);
