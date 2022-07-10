import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchItems } from "../../actions/fetch-items-actions";
import { search } from "../../actions/search-actions";
import ListContainer from "./ListContainer";
import { getFilteredItems } from "../../selectors/items-entities-selectors";
import { getIsError, getIsLoading } from "../../selectors/items-view-selectors";

// Here we map the state into props that we're going to use in the ListContainer component
const mapStateToProps = state => {
    const items = getFilteredItems(state);
    const isLoading = getIsLoading(state);
    const isError = getIsError(state);
    return { items, isLoading, isError };
};

// Here we map the dispatch actions into props that we're going to use in the ListContainer component
const mapDispatchToProps = dispatch => {
    return bindActionCreators({ fetchItems, search }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ListContainer);
