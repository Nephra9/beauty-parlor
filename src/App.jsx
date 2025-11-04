import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom"; // ✅ Import Router components
import "./App.css";
import About from "./Pages/About";
import Products from "./Pages/Products";
import Specialities from "./Pages/Specialities";
import Gallery from "./Pages/Gallery";
import Booking from "./Pages/Booking";
import Navbar from "./Components/navbar"; // ✅ Make sure file name matches
import Home from "./Pages/Homepage"; // ✅ Home page import

function App() {
  return (
    <>

     
      <div className="Homecontent middle flex-grow-1">
         <Navbar />
        <Routes>
          <Route index element={<Home />} />
  <Route path="about" element={<About />} />
  <Route path="products" element={<Products />} />
  <Route path="specialities" element={<Specialities />} />
  <Route path="gallery" element={<Gallery />} />
  <Route path="booking" element={<Booking />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
