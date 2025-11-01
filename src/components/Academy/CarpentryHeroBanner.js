// src/components/academy/CarpentryHeroBanner.js
import React from "react";
import "../../styles/academy/carpentry-herobanner.css";

function CarpentryHeroBanner() {
  return (
    <section className="carpentry-hero-banner">
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

      {/* Placeholder for content */}
      <div className="carpentry-hero-content">
        {/* Example content:
        <h1>Learn Carpentry</h1>
        <p>Book your lesson today!</p> */}
      </div>
    </section>
  );
}

export default CarpentryHeroBanner;
