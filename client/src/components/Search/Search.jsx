import searchCSS from "./Search.module.css";
import { TextField } from "monday-ui-react-core";

function Search() {
   return (
      <TextField
         placeholder="Search"
         size={TextField.sizes.SMALL}
         onChange={(text) => console.log(text)}
         nameClass={searchCSS.search}
      />
   );
}

export default Search;
