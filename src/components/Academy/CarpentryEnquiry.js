import React, { useState } from "react";
import "../../styles/academy/carpentry-enquiry.css";

function CarpentryEnquiry() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    experience: "",
    interest: "",
    message: ""
  });

  const [showMobileForm, setShowMobileForm] = useState(false);

  const experienceLevels = [
    "Complete Beginner",
    "Some Experience", 
    "Intermediate",
    "Advanced"
  ];

  const interests = [
    "Beginner Woodworking",
    "Furniture Making",
    "Advanced Joinery",
    "One-on-One Mentorship",
    "Not Sure Yet"
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const message = `Carpentry Lesson Enquiry\n\n` +
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Phone: ${formData.phone}\n` +
      `Experience Level: ${formData.experience}\n` +
      `Interest: ${formData.interest}\n\n` +
      `Message:\n${formData.message}`;

    const whatsappUrl = `https://wa.me/6592304357?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");

    const emailSubject = `Carpentry Lesson Enquiry - ${formData.name}`;
    const mailtoUrl = `mailto:academy@fiftysevensg.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(message)}`;
    
    setTimeout(() => {
      window.location.href = mailtoUrl;
    }, 500);

    setFormData({
      name: "",
      email: "",
      phone: "",
      experience: "",
      interest: "",
      message: ""
    });

    setShowMobileForm(false); // Close modal after submission
  };

  return (
    <>
      {/* Desktop / Tablet Form */}
      <section className="carpentry-enquiry-section">
        <div className="carpentry-enquiry-container">
          <div className="carpentry-enquiry-header">
            <h2>Book Your Carpentry Lesson</h2>
            <p>Start your woodworking journey with expert guidance</p>
          </div>

          <form onSubmit={handleSubmit} className="carpentry-enquiry-form">
            <div className="carpentry-form-row">
              <div className="carpentry-form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your full name"
                />
              </div>
              <div className="carpentry-form-group">
                <label>Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div className="carpentry-form-row">
              <div className="carpentry-form-group">
                <label>Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="Phone number"
                />
              </div>
              <div className="carpentry-form-group">
                <label>Experience Level</label>
                <select
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                >
                  <option value="">Select your level</option>
                  {experienceLevels.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="carpentry-form-group">
              <label>Area of Interest</label>
              <select
                name="interest"
                value={formData.interest}
                onChange={handleChange}
              >
                <option value="">What would you like to learn?</option>
                {interests.map(interest => (
                  <option key={interest} value={interest}>{interest}</option>
                ))}
              </select>
            </div>

            <div className="carpentry-form-group">
              <label>Message</label>
              <textarea
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your goals, any specific projects you have in mind, or questions you'd like to ask..."
              />
            </div>

            <div className="carpentry-form-actions">
              <button type="submit" className="carpentry-submit-button">
                Send Enquiry via WhatsApp & Email
              </button>
              <p className="carpentry-submit-note">
                We'll contact you within 24 hours to discuss your learning journey
              </p>
            </div>
          </form>
        </div>
      </section>

      {/* Mobile Bottom Navbar */}
      <section className="carpentry-bottom-nav">
        <div className="bottom-nav-container">
          <button
            className="bottom-nav-btn"
            onClick={() => setShowMobileForm(true)}
          >
            Enquire Now
          </button>
        </div>
      </section>

      {/* Mobile Form Modal */}
      {showMobileForm && (
        <div className="mobile-form-overlay">
          <div className="mobile-form-container">
            <button className="close-btn" onClick={() => setShowMobileForm(false)}>✕</button>
            <h3>Book Your Carpentry Lesson</h3>
            <form onSubmit={handleSubmit} className="mobile-form">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Full Name *"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Email *"
              />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="Phone Number *"
              />
              <select name="experience" value={formData.experience} onChange={handleChange}>
                <option value="">Experience Level</option>
                {experienceLevels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
              <select name="interest" value={formData.interest} onChange={handleChange}>
                <option value="">Area of Interest</option>
                {interests.map(interest => (
                  <option key={interest} value={interest}>{interest}</option>
                ))}
              </select>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Message"
                rows="4"
              />
              <button type="submit" className="mobile-submit-btn">
                Send Enquiry
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default CarpentryEnquiry;
