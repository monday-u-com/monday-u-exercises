import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { removeItem } from "../../../actions/remove-item-actions";
import { toggleItem } from "../../../actions/toggle-item-actions";
import ListItemComponent from "./ListItemComponent";

const mapDispatchToProps = (dispatch, ownProps) => {
    return bindActionCreators({ toggleItem, removeItem }, dispatch);
};

export default connect(null, mapDispatchToProps)(ListItemComponent);
