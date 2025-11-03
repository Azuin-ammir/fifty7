// src/components/Footer.js
import React from "react";
import { Link, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import ".././styles/footer.css";

function Footer({ logo }) { // Accept a logo prop (can be overridden)
  const location = useLocation();

  const getLogoForPage = () => {
    // If logo prop is provided, use it (allows page-specific overrides)
    if (logo) return logo;
    // Otherwise, determine logo based on current route (matches Navbar logic)
    if (location.pathname.startsWith("/garrison"))
      return "/Images/Garrison/Logo/garrisonlong.png";
    if (location.pathname.startsWith("/57directive"))
      return "/Images/57Directive/directive.png";
    if (location.pathname.startsWith("/academy"))
      return "/Images/Academy/logo.png";
    if (location.pathname.startsWith("/realestate"))
      return "/Images/RealEstate/logo.png";
    return "/Images/Academy/logo.png"; // Default logo
  };

  const currentLogo = getLogoForPage();

  const handleLinkClick = () => {
    // Force scroll to top when footer link is clicked
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
  };

  return (
    <footer className="footer-section text-light">
      <div className="container py-5">
        <div className="row">
          {/* Left Column: Logo and Contact Info */}
          <div className="col-md-4 mb-4">
            <img
              src={currentLogo}
              alt="Company logo"
              className="footer-logo mb-3"
            />
            <p className="footer-address mb-2">
              No. 6 Jalan Pinang, Singapore 199138
            </p>
            <p className="footer-contact mb-1">
              <strong>Tel:</strong> +65 6337 1886
            </p>
            <p className="footer-contact mb-1">
              <strong>Email:</strong> enquiries@fiftyseven.com
            </p>
          </div>

          {/* Middle Column: Quick Links */}
          <div className="col-md-4 mb-4">
            <h5 className="footer-title">Stay With Us</h5>
            <ul className="footer-links list-unstyled">
              <li><Link to="/garrison/enquiry" onClick={handleLinkClick}>Reserve Your Date</Link></li>
              <li><Link to="/garrison" onClick={handleLinkClick}>Manage Reservation</Link></li>
              <li><Link to="/garrison/location" onClick={handleLinkClick}>Get Directions</Link></li>
              <li><Link to="/contact" onClick={handleLinkClick}>Contact Us</Link></li>
            </ul>
          </div>

          {/* Right Column: Keep In Touch */}
          <div className="col-md-4 mb-4">
            <h5 className="footer-title">Keep In Touch</h5>
            <p className="footer-desc">
              Subscribe to our newsletter and follow us on social media for
              the latest updates and events.
            </p>
            <form className="footer-form d-flex">
              <input
                type="email"
                className="form-control me-2"
                placeholder="Your email"
              />
              <button className="btn btn-subscribe" type="submit">
                Subscribe
              </button>
            </form>
            <div className="social-icons mt-3">
              <a href="#" className="me-3"><i className="bi bi-facebook"></i></a>
              <a href="#" className="me-3"><i className="bi bi-instagram"></i></a>
              <a href="#" className="me-3"><i className="bi bi-twitter-x"></i></a>
            </div>
          </div>
        </div>

        <hr className="footer-divider" />

        <div className="text-center small">
          © {new Date().getFullYear()} FiftySeven. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
