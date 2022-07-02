import "./App.css";
import Card from "./components/Card";
import Navbar from "./components/Navbar";

function App() {
   return (
      <>
         <Navbar />
         <div className="card-container">
            <Card />
         </div>
      </>
   );
}

export default App;
