import navbarCSS from "./Navbar.module.css";

function Navbar() {
   return (
      <nav className={navbarCSS.nav}>
         <a href="/" className={navbarCSS["site-title"]}>
            Weekend To-Do
         </a>
         <ul>
            <li>
               <a href="/">Home</a>
            </li>
            <li>
               <a href="/about">About</a>
            </li>
         </ul>
      </nav>
   );
}
export default Navbar;
