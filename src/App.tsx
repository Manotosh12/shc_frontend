import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import About from "./pages/About Us";
import Contact from "./pages/Contact Us";
import Services from "./pages/Services";
import NutrientDashboard from "./pages/NutrientDashboard";
import FertilizerRecommendation from "./pages/FertilizerRecommendation";
import './App.css'
import Navbar from "./components/Navbar";
import HeroBanner from "./components/HeroBanner";
import Footer from "./components/Footer";
import Layout from "./components/Layout";
import './i18n'; 

function App() {
  return (
    <Router>
      <Routes>
        {/* Home page with its own layout */}
        <Route path="/" element={
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1 mt-16">
              <div className="px-4 md:px-12 lg:px-24 xl:px-32 2xl:px-64 w-full mx-auto">
                <HeroBanner />
              </div>
            </main>
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
