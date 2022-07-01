import { Toast } from "monday-ui-react-core";

const MyToast = ({ property, setToastProps }) => {
  const { showToast, toastType, message } = property;
  const setToastPropsHandler = () => {
    setToastProps({ showToast: false, toastType: "", message: "" });
  };
  return (
    <Toast
      open={showToast}
      type={Toast.types[toastType]}
      className="monday-storybook-toast_wrapper"
      onClose={setToastPropsHandler}
    >
      {message}
    </Toast>
  );
};

export default MyToast;
