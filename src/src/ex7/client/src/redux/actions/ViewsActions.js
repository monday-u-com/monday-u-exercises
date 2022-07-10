
import actionTypes from "../actions/constants";

const showLoader = () => ({
  type: actionTypes.DISPLAY_LOADER,
});

const hideLoader = () => ({
  type: actionTypes.HIDE_LOADER,
});

const showClearButton = () => ({
  type: actionTypes.SHOW_CLEAR_BUTTON,
});

const hideClearButton = () => ({
  type: actionTypes.HIDE_CLEAR_BUTTON,
});


export const showLoaderAction = () => {
  return (dispatch) => {
    dispatch(showLoader());
  };
};

export const hideLoaderAction = () => {
  return (dispatch) => dispatch(hideLoader());
};

export const showClearButtonAction = () => {
  return (dispatch) => dispatch(showClearButton());
};

export const hideClearButtonAction = () => {
  return (dispatch) => dispatch(hideClearButton());
};


