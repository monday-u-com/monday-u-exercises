import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import TodoFooterComponent from "./todo-footer-component";
import {clearAllAction, getPendingTodosAction} from "../../../app/actions/todo-footer-actions";
import {getTodoListValue} from "../../../app/selectors/todo-list-selectors";
import {getPendingTodosValue} from "../../../app/selectors/todo-footer-selectors";

const mapStateToProps = (state, ownProps) => {
    const todosValue = getTodoListValue(state);
    const pendingTodosValue = getPendingTodosValue(state);
    return {todosValue, pendingTodosValue};
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return bindActionCreators({clearAllAction, getPendingTodosAction}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoFooterComponent);
