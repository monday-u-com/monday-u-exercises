import "./App.css";
import HomeCardConnector from "./components/HomeCard/HomeCardConnector";
import Navbar from "./components/Navbar";
import AboutCard from "./components/AboutCard";
import { Route, Routes } from "react-router-dom";

function App() {
   return (
      <>
         <Navbar />
         <div className="card-container">
            <Routes>
               <Route path="/" element={<HomeCardConnector />} />
               <Route path="/about" element={<AboutCard />} />
            </Routes>
         </div>
      </>
   );
}

export default App;
