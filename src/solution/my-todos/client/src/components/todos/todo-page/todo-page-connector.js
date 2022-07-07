import {connect} from "react-redux";
import TodoPageComponent from "./todo-page-component";
import {getTodoInputValue} from "../../../app/selectors/todo-input-selectors";
import {bindActionCreators} from "redux";

const mapStateToProps = (state, ownProps) => {
    const inputValue = getTodoInputValue(state);
    return {inputValue};
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return bindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoPageComponent);
