import React, { useState } from "react";
import "../../styles/57directive/quotation57.css";

function Quotation57 () {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    budget: "",
    timeline: "",
    description: "",
    designerPreference: "",
    floorPlan: null
  });

  const [currentStep, setCurrentStep] = useState(0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, floorPlan: e.target.files[0] }));
  };

  const handleNext = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  const handlePrev = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const steps = [
    {
      title: "Personal Information",
      content: (
        <div className="form-row">
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required />
          </div>
        </div>
      )
    },
    {
      title: "Project Details",
      content: (
        <div className="form-row">
          <div className="form-group">
            <label>Project Type</label>
            <select name="projectType" value={formData.projectType} onChange={handleInputChange} required>
              <option value="">Select Project Type</option>
              <option value="residential">Residential</option>
              <option value="commercial">Commercial</option>
              <option value="office">Office</option>
              <option value="retail">Retail</option>
            </select>
          </div>
          <div className="form-group">
            <label>Budget Range</label>
            <select name="budget" value={formData.budget} onChange={handleInputChange} required>
              <option value="">Select Budget</option>
              <option value="10-30k">$10,000 - $30,000</option>
              <option value="30-50k">$30,000 - $50,000</option>
              <option value="50-100k">$50,000 - $100,000</option>
              <option value="100k+">$100,000+</option>
            </select>
          </div>
          <div className="form-group">
            <label>Timeline</label>
            <select name="timeline" value={formData.timeline} onChange={handleInputChange} required>
              <option value="">Select Timeline</option>
              <option value="1-3months">1-3 Months</option>
              <option value="3-6months">3-6 Months</option>
              <option value="6-12months">6-12 Months</option>
            </select>
          </div>
          <div className="form-group">
            <label>Project Description</label>
            <textarea name="description" value={formData.description} onChange={handleInputChange} required />
          </div>
        </div>
      )
    },
    {
      title: "Designer Preference",
      content: (
        <div className="designer-preferences">
          {["modern", "traditional", "industrial", "scandinavian", "no-preference"].map((pref) => (
            <label className="preference-option" key={pref}>
              <input
                type="radio"
                name="designerPreference"
                value={pref}
                checked={formData.designerPreference === pref}
                onChange={handleInputChange}
              />
              <span>
                {pref === "modern"
                  ? "Modern & Minimalist"
                  : pref === "traditional"
                  ? "Traditional & Classic"
                  : pref.charAt(0).toUpperCase() + pref.slice(1)}
              </span>
            </label>
          ))}
        </div>
      )
    },
    {
      title: "Upload Floor Plan",
      content: (
        <div className="file-upload-area">
          <input
            type="file"
            id="floorPlan"
            accept=".jpg,.jpeg,.png,.pdf"
            onChange={handleFileChange}
            className="file-input"
          />
          <label htmlFor="floorPlan" className="file-upload-label">
            <div className="upload-icon">📁</div>
            <div className="upload-text">
              {formData.floorPlan ? formData.floorPlan.name : "Click to upload floor plan"}
            </div>
            <div className="upload-hint">JPG, PNG, or PDF (Max 10MB)</div>
          </label>
        </div>
      )
    }
  ];

  return (
    <section className="quotation-57-section py-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 mx-auto">
            <div className="text-center mb-5">
              <h2 className="section-title">Get Your Quotation</h2>
              <p className="section-subtitle">Start your renovation journey with us</p>
            </div>

            <form onSubmit={handleSubmit} className="quotation-form">
              <div className="form-section active">
                <h4 className="form-section-title">{steps[currentStep].title}</h4>
                {steps[currentStep].content}
              </div>

              <div className="form-actions">
                {currentStep > 0 && (
                  <button type="button" className="prev-button" onClick={handlePrev}>
                    ← Previous
                  </button>
                )}
                {currentStep < steps.length - 1 ? (
                  <button type="button" className="next-button" onClick={handleNext}>
                    Next →
                  </button>
                ) : (
                  <button type="submit" className="submit-button">
                    Get Free Quotation
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Quotation57;
