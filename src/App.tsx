import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import './i18n'; 
import Navbar from "./components/Navbar";
import HeroBanner from "./components/HeroBanner";
import Footer from "./components/Footer";
import About from "./pages/About";
import Layout from "./components/Layout";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import PrivateRoute from "./components/PrivateRoute";
import NutrientDashboard from "./pages/NutrientDashboard";

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import WeatherAdvisory from "./pages/WeatherAdvisory";
import FertilizerDirect from "./pages/FertilizerDirect";



function App() {
  return (
    <Router>
      <Routes>
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
        <Route path="/nutrient-dashboard" element={<PrivateRoute><Layout><NutrientDashboard /></Layout></PrivateRoute>} />
        <Route path="/fertilizer-direct" element={<Layout><FertilizerDirect /></Layout>} />
        <Route path="/signup" element={<Layout><Signup /></Layout>} />
        <Route path="/login" element={<Layout><Login /></Layout>} />
        <Route path="/weather-advisory" element={<Layout><WeatherAdvisory /></Layout>} />
      </Routes>
    </Router>
  );
}

export default App;
