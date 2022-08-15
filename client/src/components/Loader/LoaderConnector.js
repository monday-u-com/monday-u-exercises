import { connect } from "react-redux";
import { getLoaderValue } from "../../selectors/items-view-selectors";
import Loader from "./Loader";

const mapStateToProps = (state, ownProps) => {
   const isLoading = getLoaderValue(state);
   return { isLoading };
};

export default connect(mapStateToProps, null)(Loader);
