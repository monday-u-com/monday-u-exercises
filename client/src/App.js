import "./App.css";
import Card from "./components/Card";
import Navbar from "./components/Navbar";
import About from "./About";
import { Route, Routes } from "react-router-dom";

function App() {
   return (
      <>
         <Navbar />
         <div className="card-container">
            <Routes>
               <Route path="/" element={<Card />} />
               <Route path="/about" element={<About />} />
            </Routes>
         </div>
      </>
   );
}

export default App;
