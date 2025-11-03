import React, { useEffect, useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/navbar.css";
import { Link, useLocation } from "react-router-dom";

function Navbar({ logo }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [businessOpen, setBusinessOpen] = useState(false);
  const [prevScroll, setPrevScroll] = useState(0);
  const [hideNav, setHideNav] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const topBarRef = useRef(null);
  const navRef = useRef(null);
  const businessDropdownRef = useRef(null);
  const businessTimeoutRef = useRef(null);
  const location = useLocation();

  const getLogoForPage = () => {
    if (logo) return logo;
    if (location.pathname.startsWith("/garrison"))
      return "/Images/Garrison/Logo/garrisonlong.png";
    if (location.pathname.startsWith("/57directive"))
      return "/Images/57Directive/directive.png";
    if (location.pathname.startsWith("/academy"))
      return "/Images/Academy/logo.png";
    if (location.pathname.startsWith("/realestate"))
      return "/Images/RealEstate/logo.png";
    return "/Images/Academy/logo.png";
  };

  const currentLogo = getLogoForPage();

  useEffect(() => {
    // Handle window resize to update isMobile state
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      // Close mobile menu if switching to desktop
      if (window.innerWidth > 768) {
        setMobileOpen(false);
      }
    };

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      if (isMobile) {
        if (window.scrollY > prevScroll && window.scrollY > 50) {
          setHideNav(true);
          setMobileOpen(false);
        } else {
          setHideNav(false);
        }
        setPrevScroll(window.scrollY);
      }
    };

    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) setMobileOpen(false);
      if (topBarRef.current && !topBarRef.current.contains(e.target)) {
        setLanguageOpen(false);
        setCurrencyOpen(false);
        setAccountOpen(false);
      }
      if (businessDropdownRef.current && !businessDropdownRef.current.contains(e.target)) {
        setBusinessOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);
    document.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("click", handleClickOutside);
      if (businessTimeoutRef.current) clearTimeout(businessTimeoutRef.current);
    };
  }, [prevScroll, isMobile]);

  const toggleLanguage = () => {
    setLanguageOpen(!languageOpen);
    setCurrencyOpen(false);
    setAccountOpen(false);
    setBusinessOpen(false);
  };
  const toggleCurrency = () => {
    setCurrencyOpen(!currencyOpen);
    setLanguageOpen(false);
    setAccountOpen(false);
    setBusinessOpen(false);
  };
  const toggleAccount = () => {
    setAccountOpen(!accountOpen);
    setLanguageOpen(false);
    setCurrencyOpen(false);
    setBusinessOpen(false);
  };
  const toggleBusiness = () => setBusinessOpen(!businessOpen);
  const toggleMobileNav = () => {
    setMobileOpen(!mobileOpen);
    setBusinessOpen(false);
  };
  const closeMobileMenu = () => {
    setMobileOpen(false);
    setBusinessOpen(false);
  };

  const handleBusinessMouseEnter = () => {
    if (!isMobile) {
      if (businessTimeoutRef.current) clearTimeout(businessTimeoutRef.current);
      setBusinessOpen(true);
    }
  };
  const handleBusinessMouseLeave = () => {
    if (!isMobile) {
      businessTimeoutRef.current = setTimeout(() => setBusinessOpen(false), 300);
    }
  };
  const handleDropdownMouseEnter = () => {
    if (!isMobile && businessTimeoutRef.current) clearTimeout(businessTimeoutRef.current);
  };
  const handleDropdownMouseLeave = () => {
    if (!isMobile) {
      businessTimeoutRef.current = setTimeout(() => setBusinessOpen(false), 300);
    }
  };
  const handleNavigation = () => {
    // Scroll to top when navigation link is clicked
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
    closeMobileMenu();
  };

  return (
    <header className={`main-header ${scrolled ? "scrolled" : ""}`} ref={navRef}>
      <nav className={`navbar ${scrolled ? "scrolled" : "initial"} ${hideNav ? "hide-on-scroll" : ""}`}>
        <div className="nav-container">
          <ul className={`navbar-nav nav-links ${isMobile ? (scrolled ? "visible" : "hidden") : "visible"} ${mobileOpen ? "show" : ""}`}>
            <li className="nav-item"><Link to="/" onClick={handleNavigation}>Home</Link></li>
            {/* TODO: Create About, Inquiries, and Gallery pages or add corresponding sections with IDs to Home page */}
            {/* <li className="nav-item"><Link to="/about" onClick={handleNavigation}>About</Link></li> */}
            {/* <li className="nav-item"><Link to="/inquiries" onClick={handleNavigation}>Inquiries</Link></li> */}
            {/* <li className="nav-item"><Link to="/gallery" onClick={handleNavigation}>Gallery</Link></li> */}

            <li
              className={`nav-item dropdown-parent ${businessOpen ? "open" : ""}`}
              ref={businessDropdownRef}
              onMouseEnter={handleBusinessMouseEnter}
              onMouseLeave={handleBusinessMouseLeave}
            >
              <a
                href="#our-business"
                onClick={(e) => { e.preventDefault(); toggleBusiness(); }}
                className="dropdown-toggle"
              >
                Our Business <span className="dropdown-arrow">▼</span>
              </a>
              <ul
                className="business-dropdown"
                onMouseEnter={handleDropdownMouseEnter}
                onMouseLeave={handleDropdownMouseLeave}
              >
                <li><Link to="/garrison" onClick={handleNavigation}>Garrison</Link></li>
                <li><Link to="/57directive/enquirepage" onClick={handleNavigation}>Renovate Space</Link></li>
                <li><Link to="/academy" onClick={handleNavigation}>Book A Carpentry Lesson</Link></li>
                <li><Link to="/realestate" onClick={handleNavigation}>Sell Your Place</Link></li>
                <li><Link to="/fiftyseven-market" onClick={handleNavigation}>FiftySeven Market</Link></li>
                <li><Link to="/events" onClick={handleNavigation}>Events</Link></li>
              </ul>
            </li>

            <li className="nav-item"><Link to="/contact" onClick={handleNavigation}>Contact Us</Link></li>
          </ul>

          <Link
            className={`navbar-brand ${scrolled ? "logo-left" : "logo-center"}`}
            to="/"
            onClick={closeMobileMenu}
          >
            <img src={currentLogo} alt="Logo" />
          </Link>

          <div className="top-bar-items" ref={topBarRef}>
            <div className={`top-item ${languageOpen ? "open" : ""}`}>
              <button className="top-button" onClick={toggleLanguage}>EN</button>
              <ul className="dropdown">
                <li>English</li>
                <li>中文</li>
                <li>Bahasa</li>
                <li>日本語</li>
              </ul>
            </div>

            <div className={`top-item ${currencyOpen ? "open" : ""}`}>
              <button className="top-button" onClick={toggleCurrency}>SGD</button>
              <ul className="dropdown">
                <li>SGD</li>
                <li>USD</li>
                <li>EUR</li>
                <li>JPY</li>
              </ul>
            </div>

            <div className="top-item">
              <Link to="/contact" onClick={handleNavigation}>Contact</Link>
            </div>

            <div className={`top-item ${accountOpen ? "open" : ""}`}>
              <button className="top-button" onClick={toggleAccount}>Account</button>
              <ul className="dropdown">
                <li><Link to="/login" onClick={handleNavigation}>Login</Link></li>
                <li><Link to="/create-account" onClick={handleNavigation}>Create Account</Link></li>
                <li className="account-note">
                  Create an account to take advantage of the member rate.
                </li>
              </ul>
            </div>
          </div>

          <button className="navbar-toggler" type="button" onClick={toggleMobileNav}>☰</button>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
