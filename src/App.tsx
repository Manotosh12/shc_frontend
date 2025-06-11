import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import HeroBanner from "./Components/HeroBanner";
import './App.css'
import About from "./pages/About Us";
import Contact from "./pages/Contact Us";
import Services from "./pages/Services";


function App() {
  return (

    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HeroBanner />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;
