import searchCSS from "./Search.module.css";
import { TextField } from "monday-ui-react-core";
import debounce from "lodash.debounce";
import { useCallback, useEffect, useMemo } from "react";
import PropTypes from "prop-types";

function Search({ setSearchInputAction }) {
   const handleChange = useCallback(
      (e) => {
         setSearchInputAction(e.toString().toLowerCase());
      },
      [setSearchInputAction]
   );

   const debouncedResults = useMemo(() => {
      return debounce(handleChange, 400);
   }, [handleChange]);

   useEffect(() => {
      return () => {
         debouncedResults.cancel();
      };
   });

   return (
      <TextField
         placeholder="Search"
         size={TextField.sizes.SMALL}
         onChange={debouncedResults}
         className={searchCSS.search}
      />
   );
}

Search.propTypes = {
   setSearchInputAction: PropTypes.func,
};

export default Search;
