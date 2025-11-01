// // src/components/HeroBanner.js
// import React from "react";
// import "../styles/herobanner.css";

// function HeroBanner({
//   videoSrc = "public/Videos/FiftySeven/fiftyseven.mp4",
//   posterImg = "/Images/hero-poster.jpg",
//   bgImage = null, // New prop: background image
//   title = "Welcome to FiftySevenSG",
//   subtitle = "Where timeless elegance meets personalized luxury.",
//   buttonText = "Discover More",
//   buttonLink = "#rooms",
// }) {
//   const heroStyle = bgImage
//     ? { backgroundImage: `url(${bgImage})`, backgroundSize: "cover", backgroundPosition: "center" }
//     : {};

//   return (
//     <section id="home" className="hero-banner position-relative text-white" style={heroStyle}>
//       {/* Video element */}
//       {videoSrc && (
//         <video
//           className="hero-video"
//           src={videoSrc}
//           autoPlay
//           loop
//           muted
//           playsInline
//           poster={posterImg}
//           aria-hidden="true"
//         />
//       )}

//       {/* gradient overlay */}
//       <div className="hero-overlay" aria-hidden="true" />

//       {/* Content */}
//       <div className="container hero-content">
//         <h1 className="hero-title display-5 fw-bold">{title}</h1>
//         <p className="hero-sublead lead mb-4">{subtitle}</p>
//         {buttonText && buttonLink && (
//           <a href={buttonLink} className="btn btn-outline-light btn-lg px-4">
//             {buttonText}
//             <img
//               src="/Images/down-arrow-white.png"
//               alt=""
//               className="ms-2 down-arrow"
//             />
//           </a>
//         )}
//       </div>
//     </section>
//   );
// }

// export default HeroBanner;


import React from "react";
import ".././styles/herobanner.css";

function HeroBanner() {
  return (
    <section className="hero57-banner">
      {/* Scrolling Text */}
      {/* <div className="scrolling-text">
        <div className="scrolling-content">
          57 DIRECTIVE • DESIGN • RENOVATE • BUILD • 57 DIRECTIVE • DESIGN • RENOVATE • BUILD • 57 DIRECTIVE •
        </div>
      </div> */}

      {/* === Video Background === */}
      <div className="video-container">
        <video
          className="hero-video"
          src="/Videos/FiftySeven/fiftyseven.mp4"
          autoPlay
          muted
          loop
          playsInline
          webkit-playsinline="true"
          preload="auto"
          disablePictureInPicture
        />
      </div>

      {/* Optional overlay (slight tint for text contrast) */}
      <div className="video-overlay"></div>

      {/* Placeholder for future text/content */}
      <div className="hero57-content">
        {/* Example (uncomment if needed):
        <h1>57 Directive</h1>
        <p>Renovate. Redefine. Revive.</p> */}
      </div>

      {/* WhatsApp Floating Icon */}
      {/* <div className="whatsapp-float">
        <a
          href="https://wa.me/6592304357"
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-link"
        >
          <img src="/Images/57Directive/whatsapp.png" alt="WhatsApp" />
        </a>
      </div> */}
    </section>
  );
}

export default HeroBanner;
