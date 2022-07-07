import {connect} from "react-redux";
import TodoPageComponent from "./spinner-component";
import {bindActionCreators} from "redux";
import {getSpinnerActive} from "../../app/selectors/spinner-selectors";

const mapStateToProps = (state, ownProps) => {
    const spinnerValue = getSpinnerActive(state);
    return {spinnerValue};
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return bindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoPageComponent);
