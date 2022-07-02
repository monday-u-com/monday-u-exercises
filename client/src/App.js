import "./App.css";
import HomeCard from "./components/HomeCard";
import Navbar from "./components/Navbar";
import AboutCard from "./components/AboutCard";
import { Route, Routes } from "react-router-dom";

function App() {
   return (
      <>
         <Navbar />
         <div className="card-container">
            <Routes>
               <Route path="/" element={<HomeCard />} />
               <Route path="/about" element={<AboutCard />} />
            </Routes>
         </div>
      </>
   );
}

export default App;
