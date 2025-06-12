import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import HeroBanner from "./Components/HeroBanner";
import Footer from "./Components/Footer";
import Layout from "./Components/Layout";
import About from "./pages/About Us";
import Contact from "./pages/Contact Us";
import Services from "./pages/Services";
import NutrientDashboard from "./pages/NutrientDashboard";
import FertilizerRecommendation from "./pages/FertilizerRecommendation";
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        {/* Home page with its own layout */}
        <Route path="/" element={
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <HeroBanner />
            <Footer />
          </div>
        } />
        
        {/* All other pages use the common Layout */}
        <Route path="/about" element={<Layout><About /></Layout>} />
        <Route path="/services" element={<Layout><Services /></Layout>} />
        <Route path="/contact" element={<Layout><Contact /></Layout>} />
        <Route path="/nutrient-dashboard" element={<Layout><NutrientDashboard /></Layout>} />
        <Route path="/fertilizer-recommendation" element={<Layout><FertilizerRecommendation /></Layout>} />
      </Routes>
    </Router>
  );
}

export default App;
