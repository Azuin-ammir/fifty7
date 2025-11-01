import React, { useState, useEffect } from "react";
import "../../styles/57directive/features57.css";

function Features57() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const featuresItems = [
    {
      id: 1,
      category: "Short Descriptions",
      image: "/Images/57Directive/Portfolio/apartment.jpg",
      title: "SME500",
    },
    {
      id: 2,
      category: "Short Descriptions",
      image: "/Images/57Directive/Portfolio/office.jpg",
      title: "BLUM",
    },
  ];

  const nextSlide = () =>
    setCurrentSlide((prev) =>
      prev === featuresItems.length - 1 ? 0 : prev + 1
    );

  const prevSlide = () =>
    setCurrentSlide((prev) =>
      prev === 0 ? featuresItems.length - 1 : prev - 1
    );

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [currentSlide]);

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
    <section id="features" className="features57-section">
      <div
        className="carousel-track"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {featuresItems.map((item, index) => (
          <div key={item.id} className="carousel-slide">
            <div className="feature-item">
              <div className="feature-image-wrapper">
                <img
                  src={item.image}
                  alt={item.title}
                  className="feature-image"
                />

                <div className="feature-overlay">
                  <div className="overlay-content">
                    {/* Section title/subtitle on first slide */}
                    {index === 0 && (
                      <div className="section-header-on-slide">
                        <h2 className="feature-section-title">Our Features</h2>
                        <p className="feature-section-subtitle">
                          Explore key highlights of our services
                        </p>
                      </div>
                    )}

                    <h3 className="feature-item-title">{item.title}</h3>
                    <p className="feature-item-category">{item.category}</p>
                  </div>
                </div>
              </div>

              {/* Navigation below the image */}
              <div className="feature-controls desktop-only">
                <button className="nav-arrow" onClick={prevSlide}>
                  &#10094;
                </button>
                <span className="slide-counter">
                  {currentSlide + 1} / {featuresItems.length}
                </span>
                <button className="nav-arrow" onClick={nextSlide}>
                  &#10095;
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features57;
