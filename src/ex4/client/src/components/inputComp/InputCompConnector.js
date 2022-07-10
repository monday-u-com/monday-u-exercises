import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import InputComp from "./InputComp";
import { dispatchAddItems } from "../../redux/actions/itemsEntitiesActions";
import { dispatchIsLoading } from "../../redux/actions/itemsViewActions";

const mapStateToProps = (state, ownProps) => {
	return {};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return bindActionCreators({ dispatchAddItems, dispatchIsLoading }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(InputComp);
