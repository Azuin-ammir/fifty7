// src/components/Garrison/GarrisonBookNow.js
import React, { useMemo, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../../styles/garrison/garrison-booknow.css";

function GarrisonBookNow() {
  const slides = [
    { content: { title: "Features of Space", image: "/Images/Garrison/Booknow/page1.png" } },
    { content: { title: "Features of Space", image: "/Images/Garrison/Booknow/page2.png" } },
    { content: { title: "Types of Events", image: "/Images/Garrison/Booknow/page3.png", route: "/garrison/events" } },
    { content: { title: "About Us", image: "/Images/Garrison/Booknow/page4.png", route: "/garrison/about" } },
    { content: { title: "Gallery", image: "/Images/Garrison/Booknow/page5.png", route: "/garrison/gallery" } },
    { content: { title: "Gallery", image: "/Images/Garrison/Booknow/page6.png", route: "/garrison/gallery" } },
    { content: { title: "Gallery", image: "/Images/Garrison/Booknow/page7.png", route: "/garrison/gallery" } },
    { content: { title: "Gallery", image: "/Images/Garrison/Booknow/page8.png", route: "/garrison/gallery" } },
    { content: { title: "Gallery", image: "/Images/Garrison/Booknow/page9.png", route: "/garrison/gallery" } },
  ];

  // === Responsive cards per page ===
  const [cardsPerPage, setCardsPerPage] = useState(window.innerWidth <= 920 ? 1 : 2);
  useEffect(() => {
    const handleResize = () => setCardsPerPage(window.innerWidth <= 920 ? 1 : 2);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const groups = useMemo(() => {
    const g = [];
    for (let i = 0; i < slides.length; i += cardsPerPage) {
      g.push(slides.slice(i, i + cardsPerPage));
    }
    return g;
  }, [slides, cardsPerPage]);

  const [pageIndex, setPageIndex] = useState(0);

  const goNext = () => setPageIndex((p) => (p >= groups.length - 1 ? 0 : p + 1));
  const goPrev = () => setPageIndex((p) => (p <= 0 ? groups.length - 1 : p - 1));

  // === Swipe Handling ===
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;

    const distance = touchStartX.current - touchEndX.current;

    // threshold to detect swipe gesture
    const threshold = 50;

    if (distance > threshold) {
      // Swipe Left → Next
      goNext();
    } else if (distance < -threshold) {
      // Swipe Right → Prev
      goPrev();
    }

    // reset refs
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <section className="garrison-booknow-section">
      <div
        className="booknow-viewport"
        aria-roledescription="carousel"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="booknow-track"
          style={{ transform: `translateX(-${pageIndex * 100}%)` }}
        >
          {groups.map((group, gi) => (
            <div className="booknow-page" key={gi}>
              {group.map((slide, si) => (
                <article className="booknow-card" key={si}>
                  {slide.content.route ? (
                    <Link to={slide.content.route}>
                      <img
                        src={slide.content.image}
                        alt={slide.content.title}
                        className="booknow-img"
                        onError={(e) => {
                          e.currentTarget.src =
                            "https://via.placeholder.com/900x600/f8f3e7/63100d?text=Garrison+Image";
                        }}
                      />
                    </Link>
                  ) : (
                    <img
                      src={slide.content.image}
                      alt={slide.content.title}
                      className="booknow-img"
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://via.placeholder.com/900x600/f8f3e7/63100d?text=Garrison+Image";
                      }}
                    />
                  )}
                </article>
              ))}
            </div>
          ))}
        </div>

        <div className="booknow-controls">
          <button className="booknow-btn" onClick={goPrev} aria-label="Previous page">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M15 18L9 12L15 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div className="booknow-dots">
            {groups.map((_, idx) => (
              <button
                key={idx}
                className={`booknow-dot ${idx === pageIndex ? "active" : ""}`}
                onClick={() => setPageIndex(idx)}
                aria-label={`Go to page ${idx + 1}`}
              />
            ))}
          </div>

          <button className="booknow-btn" onClick={goNext} aria-label="Next page">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 18L15 12L9 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

export default GarrisonBookNow;
