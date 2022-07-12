import SearchBox from "./Search";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { updateSearchInputAction } from "../../redux/actions/ItemActions";
import { getSearchInput } from "../../redux/selectors/itemsEntitiesSelectors";

const mapStateToProps = (state, ownProps) => {
  const searchInputValue = getSearchInput(state);
  return { searchInputValue };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return bindActionCreators(
    {
      updateSearchInputAction,
    },
    dispatch
  );
};

  export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);