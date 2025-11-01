import React, { useState, useEffect } from "react";
import "../../styles/57directive/portfolio57.css";

function Portfolio57() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const portfolioItems = [
    { id: 1, category: "short description", image: "/Images/57Directive/Portfolio/apartment.jpg", title: "Location" },
    { id: 2, category: "short description", image: "/Images/57Directive/Portfolio/office.jpg", title: "Location" },
    { id: 3, category: "short description", image: "/Images/57Directive/Portfolio/condo.jpg", title: "Location" },
    { id: 4, category: "short description", image: "/Images/57Directive/Portfolio/retail.jpg", title: "Location" },
    { id: 5, category: "short description", image: "/Images/57Directive/Portfolio/family.jpg", title: "Location" },
    { id: 6, category: "short description", image: "/Images/57Directive/Portfolio/restaurant.jpg", title: "Location" },
  ];

  const nextSlide = () => setCurrentSlide(prev => prev === portfolioItems.length - 1 ? 0 : prev + 1);
  const prevSlide = () => setCurrentSlide(prev => prev === 0 ? portfolioItems.length - 1 : prev - 1);

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [currentSlide]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => setTouchStart(e.targetTouches[0].clientX);
  const handleTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 50) nextSlide();
    if (distance < -50) prevSlide();
    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <section id="portfolio" className="portfolio-57-section">
      <div className="carousel-container">
        <div
          className="carousel-track"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {portfolioItems.map((item, index) => (
            <div key={item.id} className="carousel-slide">
              <div className="portfolio-item">
                <div className="portfolio-image-wrapper">
                  <img src={item.image} alt={item.title} className="portfolio-image" />

                  <div className="portfolio-overlay">
                    <div className="overlay-content">
                      {/* Show section title/subtitle only on first slide */}
                      {index === 0 && (
                        <div className="section-header-on-slide">
                          <h2 className="section-title">Our Works</h2>
                          <p className="section-subtitle">Discover our latest renovation projects</p>
                        </div>
                      )}

                      <h4 className="portfolio-item-title">{item.title}</h4>
                      <span className="portfolio-item-category">{item.category}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Below */}
        <div className="carousel-navigation-below">
          <button className="nav-arrow nav-prev" onClick={prevSlide}>‹</button>
          <span className="slide-counter">{currentSlide + 1}/{portfolioItems.length}</span>
          <button className="nav-arrow nav-next" onClick={nextSlide}>›</button>
        </div>
      </div>
    </section>
  );
}

export default Portfolio57;
