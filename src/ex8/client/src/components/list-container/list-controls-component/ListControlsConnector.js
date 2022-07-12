import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addItem } from "../../../actions/add-item-actions";
import ListControlsComponent from "./ListControlsComponent";

const mapDispatchToProps = (dispatch, ownProps) => {
    return bindActionCreators({ addItem }, dispatch);
};

export default connect(null, mapDispatchToProps)(ListControlsComponent);
