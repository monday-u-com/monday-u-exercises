import dropdownCSS from "./DropdownFilter.module.css";

// import { useCallback, useEffect, useMemo } from "react";

function DropdownFilter() {
   // const handleChange = useCallback(
   //    (e) => {
   //       setSearchInputAction(e.toString().toLowerCase());
   //    },
   //    [setSearchInputAction]
   // );

   // const debouncedResults = useMemo(() => {
   //    return debounce(handleChange, 400);
   // }, [handleChange]);

   // useEffect(() => {
   //    return () => {
   //       debouncedResults.cancel();
   //    };
   // });

   return (
      <select className={dropdownCSS.dropdown}>
         <option value="fruit">Show All</option>
         <option value="vegetable">Show Done</option>
         <option value="meat">Show Undone</option>
      </select>
   );
}

export default DropdownFilter;
