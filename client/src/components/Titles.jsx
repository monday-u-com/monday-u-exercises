import titlesCSS from "./Titles.module.css";

function Titles() {
   return (
      <>
         <h1 className={titlesCSS["app-title"]}>Weekend To-Do</h1>
         <p className={titlesCSS.info}>
            Get your tasks done before the weekend! And catch some Pokemons while you're at it...
         </p>
      </>
   );
}

export default Titles;
