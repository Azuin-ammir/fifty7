import React, { useState } from "react";
import "../../styles/realestate/estate_enquiry.css";

function RealEstateEnquiry() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    propertyType: "",
    enquiryType: "",
    budget: "",
    message: ""
  });

  const [showMobileForm, setShowMobileForm] = useState(false);

  const propertyTypes = [
    "HDB",
    "Condominium",
    "Landed",
    "Commercial",
    "Others"
  ];

  const enquiryTypes = [
    "Selling",
    "Renting",
    "Buying",
    "Investment",
    "Others"
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const message = `Real Estate Enquiry\n\n` +
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Phone: ${formData.phone}\n` +
      `Property Type: ${formData.propertyType}\n` +
      `Enquiry Type: ${formData.enquiryType}\n` +
      `Budget / Price Expectation: ${formData.budget}\n\n` +
      `Message:\n${formData.message}`;

    const whatsappUrl = `https://wa.me/6592304357?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");

    const emailSubject = `Real Estate Enquiry - ${formData.name}`;
    const mailtoUrl = `mailto:academy@fiftysevensg.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(message)}`;
    
    setTimeout(() => {
      window.location.href = mailtoUrl;
    }, 500);

    setFormData({
      name: "",
      email: "",
      phone: "",
      propertyType: "",
      enquiryType: "",
      budget: "",
      message: ""
    });

    setShowMobileForm(false);
  };

  return (
    <>
      {/* Desktop / Tablet Form */}
      <section className="realestate-enquiry-section">
        <div className="realestate-enquiry-container">
          <div className="realestate-enquiry-header">
            <h2>Real Estate Enquiry</h2>
            <p>Let us help you sell, rent, or buy your property</p>
          </div>

          <form onSubmit={handleSubmit} className="realestate-enquiry-form">
            <div className="realestate-form-row">
              <div className="realestate-form-group">
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
              <div className="realestate-form-group">
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

            <div className="realestate-form-row">
              <div className="realestate-form-group">
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
              <div className="realestate-form-group">
                <label>Property Type</label>
                <select 
                  name="propertyType" 
                  value={formData.propertyType} 
                  onChange={handleChange}
                >
                  <option value="">Select property type</option>
                  {propertyTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="realestate-form-row">
              <div className="realestate-form-group">
                <label>Enquiry Type</label>
                <select 
                  name="enquiryType" 
                  value={formData.enquiryType} 
                  onChange={handleChange}
                >
                  <option value="">Select enquiry type</option>
                  {enquiryTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div className="realestate-form-group">
                <label>Budget / Price Expectation</label>
                <input 
                  type="text" 
                  name="budget" 
                  value={formData.budget} 
                  onChange={handleChange} 
                  placeholder="e.g. $1.2M"
                />
              </div>
            </div>

            <div className="realestate-form-group">
              <label>Message</label>
              <textarea 
                name="message" 
                value={formData.message} 
                onChange={handleChange} 
                placeholder="Additional details, timeline, location preferences..." 
                rows="5"
              />
            </div>

            <div className="realestate-form-actions">
              <button type="submit" className="realestate-submit-button">
                Send Enquiry via WhatsApp & Email
              </button>
              <p className="realestate-submit-note">
                We'll contact you within 24 hours to discuss your property needs
              </p>
            </div>
          </form>
        </div>
      </section>

      {/* Mobile Bottom Navbar */}
      <section className="realestate-bottom-nav">
        <div className="realestate-bottom-nav-container">
          <button 
            className="realestate-bottom-nav-btn" 
            onClick={() => setShowMobileForm(true)}
          >
            Enquire Now
          </button>
        </div>
      </section>

      {/* Mobile Form Modal */}
      {showMobileForm && (
        <div className="realestate-mobile-form-overlay">
          <div className="realestate-mobile-form-container">
            <button 
              className="realestate-close-btn" 
              onClick={() => setShowMobileForm(false)}
            >
              ✕
            </button>
            <h3>Real Estate Enquiry</h3>
            <form onSubmit={handleSubmit} className="realestate-mobile-form">
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
              <select 
                name="propertyType" 
                value={formData.propertyType} 
                onChange={handleChange}
              >
                <option value="">Property Type</option>
                {propertyTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              <select 
                name="enquiryType" 
                value={formData.enquiryType} 
                onChange={handleChange}
              >
                <option value="">Enquiry Type</option>
                {enquiryTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              <input 
                type="text" 
                name="budget" 
                value={formData.budget} 
                onChange={handleChange} 
                placeholder="Budget / Price Expectation"
              />
              <textarea 
                name="message" 
                value={formData.message} 
                onChange={handleChange} 
                placeholder="Additional details..." 
                rows="4"
              />
              <button type="submit" className="realestate-mobile-submit-btn">
                Send Enquiry
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default RealEstateEnquiry;