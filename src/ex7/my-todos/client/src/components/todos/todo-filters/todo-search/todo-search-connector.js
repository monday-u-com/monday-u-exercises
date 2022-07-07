import {connect} from "react-redux";
import TodoSearchComponent from "./todo-search-component";
import {bindActionCreators} from "redux";
import {setTodoSearchAction} from "../../../../app/actions/todo-search-actions";
import {getTodoSearchValue} from "../../../../app/selectors/todo-search-selectors";

const mapStateToProps = (state, ownProps) => {
    const todoSearchValue = getTodoSearchValue(state);
    return {todoSearchValue};
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return bindActionCreators({setTodoSearchAction}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoSearchComponent);
