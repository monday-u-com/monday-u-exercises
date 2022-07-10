import actionTypes from "../actions/constants";

const initialState = {
	isLoading: true,
	openToast: false,
};

const itemsViewReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.IS_LOADING:
			return { ...state, isLoading: action.payload };

		case actionTypes.OPEN_TOAST:
			return { ...state, openToast: action.payload };
		default:
			return state;
	}
};
export default itemsViewReducer;
