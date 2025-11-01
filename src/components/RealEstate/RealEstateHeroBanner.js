import React from "react";
import "../../styles/realestate/estate_herobanner.css";

function RealEstateHeroBanner() {
  return (
    <section className="carpentry-hero-banner">
      {/* Scrolling Text
      <div className="carpentry-scrolling-text">
        <div className="carpentry-scrolling-content">
          BOOK YOUR CARPENTRY LESSON TODAY • LEARN FROM EXPERT CRAFTSMEN • BOOK YOUR CARPENTRY LESSON TODAY • LEARN FROM EXPERT CRAFTSMEN •
        </div>
      </div> */}

      {/* Video Background */}
      <div className="carpentry-video-container">
        <video
          className="carpentry-hero-video"
          src="/Videos/Academy/academy.mp4"
          autoPlay
          muted
          loop
          playsInline
          webkit-playsinline="true"
          preload="auto"
          disablePictureInPicture
        />
      </div>

      {/* Overlay */}
      <div className="carpentry-video-overlay"></div>

      {/* WhatsApp Floating Icon
      <div className="carpentry-whatsapp-float">
        <a 
          href="https://wa.me/6512345678" 
          target="_blank" 
          rel="noopener noreferrer"
          className="carpentry-whatsapp-link"
        >
          <img src="/Images/Academy/whatsapp.png" alt="WhatsApp" />
        </a>
      </div> */}
    </section>
  );
}

export default RealEstateHeroBanner;