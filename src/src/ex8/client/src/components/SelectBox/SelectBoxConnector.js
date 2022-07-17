import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import SelectBox from "./SelectBox";
import { updateSelectInputAction } from "../../redux/actions/ItemActions";
const mapStateToProps = (state, ownProps) => {
  return { };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return bindActionCreators(
    {
        updateSelectInputAction
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectBox);
