// src/App.js
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Navbar";
import Footer from "./components/Footer";
import GarrisonNavbar from "./components/Garrison/GarrisonNavbar"; // ✅ bring in the new king of navbars

// Import your pages...
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import CreateAccount from "./pages/CreateAccount";
import Kindrette from "./pages/Kindrette";
import Business3 from "./pages/Business3";
import Business4 from "./pages/Business4";
import Events from "./pages/Events";
import FiftySevenMarket from "./pages/FiftySevenMarket";

import Garrison from "./pages/Garrison/Garrison";
import GarrisonAboutPage from "./pages/Garrison/GarrisonAboutPage";
import GarrisonEventsPage from "./pages/Garrison/GarrisonEventsPage";
import GarrisonFeaturesPage from "./pages/Garrison/GarrisonFeaturesPage";
import GarrisonLocationPage from "./pages/Garrison/GarrisonLocationPage";
import GarrisonHistoryPage from "./pages/Garrison/GarrisonHistoryPage";
import GarrisonGalleryPage from "./pages/Garrison/GarrisonGalleryPage";
import GarrisonEnquiryPage from "./pages/Garrison/GarrisonEnquiryPage";

import FiftySevenDirective from "./pages/57Directive/57Directive";
import EnquirePage from "./pages/57Directive/EnquirePage";

import Academy from "./pages/Academy/Academy";

import RealEstate from "./pages/Realestate/Realestate";


import "./App.css";
import SellYourPlace from "./pages/Realestate/Realestate";

function Layout() {
  const location = useLocation();
  
  // Scroll to top on route change
  useEffect(() => {
    // Small delay to ensure route change is complete and DOM is ready
    const timer = setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant'
      });
      // Also try scrolling the document element for better compatibility
      if (document.documentElement) {
        document.documentElement.scrollTop = 0;
      }
      if (document.body) {
        document.body.scrollTop = 0;
      }
    }, 0);
    
    return () => clearTimeout(timer);
  }, [location.pathname]);
  
  const isGarrisonPage = location.pathname.startsWith("/garrison");

  return (
    <>
      {isGarrisonPage ? <GarrisonNavbar /> : <Header />}  

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create-account" element={<CreateAccount />} />

          <Route path="/garrison" element={<Garrison />} />
          <Route path="/garrison/about" element={<GarrisonAboutPage />} />
          <Route path="/garrison/events" element={<GarrisonEventsPage />} />
          <Route path="/garrison/features" element={<GarrisonFeaturesPage />} />
          <Route path="/garrison/location" element={<GarrisonLocationPage />} />
          <Route path="/garrison/history" element={<GarrisonHistoryPage />} />
          <Route path="/garrison/gallery" element={<GarrisonGalleryPage />} />
          <Route path="/garrison/enquiry" element={<GarrisonEnquiryPage />} />

          <Route path="/kindrette" element={<Kindrette />} />
          <Route path="/business3" element={<Business3 />} />
          <Route path="/business4" element={<Business4 />} />
          <Route path="/events" element={<Events />} />
          <Route path="/fiftyseven-market" element={<FiftySevenMarket />} />

          <Route path="/57directive" element={<FiftySevenDirective />} />
          <Route path="/57directive/enquirepage" element={<EnquirePage />} />



          <Route path="/academy" element={<Academy />} />

          <Route path="/realestate" element={<SellYourPlace />} />

        </Routes>
      </main>

      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
