import actionTypes from "./constants";

const show = () => ({
   type: actionTypes.SHOW_LOADER,
});
const hide = () => ({
   type: actionTypes.HIDE_LOADER,
});

export const loaderShowAction = () => {
   return (dispatch) => {
      dispatch(show());
   };
};

export const loaderHideAction = () => {
   return (dispatch) => {
      dispatch(hide());
   };
};
