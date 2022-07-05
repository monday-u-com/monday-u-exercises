import loaderCSS from "./Loader.module.css";

function Loader({ isLoading }) {
   return isLoading ? <div className={loaderCSS.loader}></div> : <></>;
}

export default Loader;
