import actionTypes from "../actions/constants";

const initialState = {
	isLoading: true,
	openToast: false,
	searchText: "",
};

const itemsViewReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.IS_LOADING:
			return { ...state, isLoading: action.payload };

		case actionTypes.OPEN_TOAST:
			return { ...state, openToast: action.payload };

		case actionTypes.SEARCH:
			const x = { ...state, searchText: action.payload };
			return x;
		default:
			return state;
	}
};
export default itemsViewReducer;
