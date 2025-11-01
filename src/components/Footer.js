// src/components/Footer.js
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/footer.css";

function Footer() {
  return (
    <footer className="footer-section text-light">
      <div className="container py-5">
        <div className="row">
          {/* Left Column: Logo and Contact Info */}
          <div className="col-md-4 mb-4">
            <img
              src="/Images/Garrison/Logo/garrisonlong.png"
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
              <li><a href="#reserve">Reserve Your Date</a></li>
              <li><a href="#manage">Manage Reservation</a></li>
              <li><a href="#directions">Get Directions</a></li>
              <li><a href="#faq">FAQs</a></li>
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
