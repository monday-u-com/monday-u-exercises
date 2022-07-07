import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import TodoInputComponent from "./todo-input-component";
import {addTodoAction} from "../../../app/actions/todo-input-actions";
import {getTodoListValue} from "../../../app/selectors/todo-list-selectors";

const mapStateToProps = (state, ownProps) => {
    const todosValue = getTodoListValue(state);
    return {todosValue};
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return bindActionCreators({addTodoAction}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoInputComponent);
