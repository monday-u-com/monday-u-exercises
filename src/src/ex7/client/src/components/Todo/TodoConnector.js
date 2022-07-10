import Todo from "./Todo";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getItems } from "../../redux/selectors/items-entities-selectors";

const mapStateToProps = (state, ownProps) => {
    const items = getItems(state)

    return {items };
  };

const mapDispatchToProps = (dispatch , ownProps) =>{
    return bindActionCreators({

    },
    dispatch);
}
export default connect(mapDispatchToProps,mapStateToProps)(Todo);
