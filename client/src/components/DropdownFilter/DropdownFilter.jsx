import dropdownCSS from "./DropdownFilter.module.css";

function DropdownFilter({ setDropdownFilterAction }) {
   const handleChange = (event) => {
      setDropdownFilterAction(event.target.value);
   };

   return (
      <select className={dropdownCSS.dropdown} onChange={handleChange}>
         <option value="all">Show All</option>
         <option value="done">Show Done</option>
         <option value="undone">Show Undone</option>
      </select>
   );
}

export default DropdownFilter;
