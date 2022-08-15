import loaderCSS from "./Loader.module.css";
import PropTypes from "prop-types";

function Loader({ isLoading }) {
   return isLoading ? <div className={loaderCSS.loader}></div> : <></>;
}

Loader.propTypes = {
   isLoading: PropTypes.bool,
};

export default Loader;
