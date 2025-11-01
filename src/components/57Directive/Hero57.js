import React from "react";
import "../../styles/57directive/hero57.css";

function Hero57() {
  return (
    <section className="hero-57 position-relative text-white">
      {/* Video Background */}
      <div className="video-container">
        <video
          className="hero-video"
          src="/Videos/57Directive/directive.mp4" // Update with your actual video path
          autoPlay
          muted
          loop
          playsInline
          webkit-playsinline="true"
          preload="auto"
          disablePictureInPicture
        />
      </div>

      {/* Gradient Overlay */}
      <div className="hero-57-overlay" aria-hidden="true" />

      {/* Content */}
      <div className="container hero-57-content">
        {/* <h1 className="hero-57-title display-4 fw-bold">Renovate Space</h1>
        <p className="hero-57-subtitle lead mb-4">
          Transform your space with our 57 Directive expertise
        </p>
        <a href="#portfolio" className="btn btn-outline-light btn-lg px-4">
          Explore Our Work
          <img
            src="/Images/down-arrow-white.png"
            alt=""
            className="ms-2 down-arrow"
          />
        </a> */}
      </div>

      {/* Optional: WhatsApp Floating Icon */}
      <div className="whatsapp-float">
        <a 
          href="https://wa.me/6512345678" 
          target="_blank" 
          rel="noopener noreferrer"
          className="whatsapp-link"
        >
          <img src="/Images/57Directive/whatsapp.png" alt="WhatsApp" />
        </a>
      </div>
    </section>
  );
}

export default Hero57;