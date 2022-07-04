import navbarCSS from "./Navbar.module.css";
import classNames from "classnames";
import { Link, useMatch, useResolvedPath } from "react-router-dom";

function Navbar() {
   return (
      <nav className={navbarCSS.nav}>
         <Link to="/" className={navbarCSS["site-title"]}>
            Weekend To-Do
         </Link>
         <ul>
            <CustomLink to="/">Home</CustomLink>
            <CustomLink to="/about">About</CustomLink>
         </ul>
      </nav>
   );
}

function CustomLink({ to, children }) {
   const resolvedPath = useResolvedPath(to);
   const isActive = useMatch({ path: resolvedPath.pathname, end: true });

   return (
      <li className={classNames({ [navbarCSS.active]: isActive })}>
         <Link to={to}>{children}</Link>
      </li>
   );
}
export default Navbar;
