import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/garrison/garrison-more.css";

function GarrisonMore() {
  const slides = [
    {
      title: "Opening ceremony",
      description:
        "Our versatile space offers 5,000 sqft of premium event area with capacity for up to 200 guests. Features include AV, lighting and a commercial pantry.",
      image: "/Images/Garrison/opening.JPG",
      route: "/garrison/features",
    },
    {
      title: "Boxing Events",
      description:
        "Perfect for corporate events, weddings, galas and product launches. Flexible layout for theater, banquet or classroom setups.",
      image: "/Images/Garrison/boxing.jpg",
      route: "/garrison/events",
    },
    {
      title: "Cigar Gatherings",
      description:
        "Celebrate your special moments with elegance and curated experiences crafted to perfection.",
      image: "/Images/Garrison/cigar.jpg",
      route: "/garrison/about",
    },
  ];

  const [pageIndex, setPageIndex] = useState(0);

  const goNext = () => setPageIndex((prev) => (prev + 1) % slides.length);
  const goPrev = () => setPageIndex((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="garrison-services-section">
      <div className="garrison-services-inner">
        {/* LEFT TEXT COLUMN */}
        <div className="services-text">
          <h2>EVENTS & GALLERIES</h2>
          <p>
            Elevating occasions with refined event rentals for both social and corporate gatherings.
          </p>
          <Link to="/garrison/gallery" className="discover-all">
            Discover All
          </Link>
        </div>

        {/* RIGHT CAROUSEL */}
        <div className="services-carousel">
          <div className="carousel-track" style={{ transform: `translateX(-${pageIndex * 100}%)` }}>
            {slides.map((slide, index) => (
              <article key={index} className="carousel-card">
                <div className="carousel-image">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    onError={(e) =>
                      (e.currentTarget.src =
                        "https://via.placeholder.com/900x600/f8f3e7/63100d?text=Garrison+Image")
                    }
                  />
                </div>
                <div className="carousel-content">
                  <h3>{slide.title}</h3>
                  <p>{slide.description}</p>
                  <Link to={slide.route} className="discover-link">
                    Discover
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* CONTROLS */}
          <div className="carousel-controls">
            <button onClick={goPrev} aria-label="Previous">
              ‹
            </button>
            <div className="dots">
              {slides.map((_, idx) => (
                <span
                  key={idx}
                  className={`dot ${idx === pageIndex ? "active" : ""}`}
                  onClick={() => setPageIndex(idx)}
                />
              ))}
            </div>
            <button onClick={goNext} aria-label="Next">
              ›
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default GarrisonMore;
