import React from "react";
import "../styles/ourbusiness.css";
import { Link } from "react-router-dom";

function OurBusiness({
  subtitle = "Our Business",
  title = "A world of craftsmanship and creativity",
  description = "From bespoke interiors to curated spaces and lifestyle ventures, our businesses share a common thread — an obsession with quality, detail, and timeless character.",
  businessItems = [
    { name: "Garrison", link: "/garrison" },
    { name: "Renovate Space", link: "/57directive/enquirepage" },
    { name: "Book A Carpentry Lesson", link: "/academy" },
    { name: "Sell Your Place", link: "/realestate" },
    // { name: "FiftySeven Market", link: "/fiftyseven-market" },
    // { name: "Events", link: "/events" },
  ],
  highlight = null,
  showOtherBusinesses = true
}) {
  // Filter businesses if highlight is specified and showOtherBusinesses is false
  const displayedBusinesses = highlight && !showOtherBusinesses 
    ? businessItems.filter(item => item.name === highlight)
    : businessItems;

  return (
    <section className="our-business-section">
      <div className="overlay"></div>
      <div className="container position-relative">
        <div className="row align-items-center">
          {/* LEFT SIDE — TEXT */}
          <div className="col-md-6">
            <div className="text-content text-white">
              <h5 className="section-subtitle">{subtitle}</h5>
              <h2 className="section-title">{title}</h2>
              <p className="section-desc">{description}</p>
            </div>
          </div>

          {/* RIGHT SIDE — BUSINESS LIST */}
          <div className="col-md-6">
            <div className="business-list">
              {displayedBusinesses.map((item, index) => (
                <div key={index} className="business-item">
                  <Link to={item.link} className="business-link">
                    <span className="business-name">{item.name}</span>
                    <span className="arrow">→</span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OurBusiness;