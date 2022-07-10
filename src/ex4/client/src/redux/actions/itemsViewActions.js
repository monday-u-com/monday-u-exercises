import actionTypes from "../actions/constants/index";

const setIsLoading = (isLoading) => {
	return { type: actionTypes.IS_LOADING, payload: isLoading };
};

export const dispatchIsLoading = (isLoading) => {
	return (dispatch) => {
		dispatch(setIsLoading(isLoading));
	};
};

const OpenToast = (isToastOpen) => {
	return { type: actionTypes.OPEN_TOAST, payload: isToastOpen };
};

export const dispatchOpenToast = (isToastOpen) => {
	return (dispatch) => {
		dispatch(OpenToast(isToastOpen));
	};
};
