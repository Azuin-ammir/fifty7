// src/components/57Directive/Enquire57.js
import React, { useState } from "react";
import "../../styles/57directive/enquire57.css";

const Enquire57 = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1
    propertyOwnership: "",
    keyCollectionDate: "",
    propertyType: "",
    
    // Step 2
    renovationAreas: [],
    
    // Step 3 - Area-specific intentions
    livingDiningIntentions: [],
    kitchenIntentions: [],
    serviceYardIntentions: [],
    balconyIntentions: [],
    studyIntentions: [],
    bedroom2Intentions: [],
    bedroom3Intentions: [],
    masterBedroomIntentions: [],
    commonBathroomIntentions: [],
    masterBathroomIntentions: [],
    
    // Step 4
    doors: "",
    windows: "",
    plastering: "",
    painting: "",
    electrical: "",
    
    // Step 5
    budget: "",
    floorplan: null,
    additionalInfo: "",
    visitTime: "",
    name: "",
    email: "",
    phone: "",
  });

  const areaOptions = [
    "Living/Dining", "Kitchen", "Service Yard", "Balcony", "Study",
    "Bedroom 2", "Bedroom 3", "Main/Master Bedroom", "Common Bathroom", "Master Bathroom"
  ];

  const intentionOptions = {
    "Living/Dining": [
      "New floor tiles",
      "Overlay vinyl",
      "False ceiling/L box",
      "Built-in carpentry"
    ],
    "Kitchen": [
      "New wall tiles",
      "New floor tiles with water proofing",
      "Plaster-smooth wall",
      "Built-in carpentry"
    ],
    "Service Yard": [
      "New floor tiles with water proofing",
      "Built-in carpentry",
      "Sliding, folding glass doors",
      "Hack existing wall to extend kitchen"
    ],
    "Balcony": [
      "New floor tiles",
      "Overlay vinyl",
      "Sliding, folding, french glass doors",
      "Built-in carpentry"
    ],
    "Study": [
      "New floor tiles",
      "Overlay vinyl",
      "Built-in carpentry",
      "Convert to new bedroom"
    ],
    "Bedroom 2": [
      "New floor tiles",
      "Overlay vinyl",
      "Built-in carpentry",
      "False ceiling, L box"
    ],
    "Bedroom 3": [
      "New floor tiles",
      "Overlay vinyl",
      "Built-in carpentry",
      "False ceiling, L box"
    ],
    "Main/Master Bedroom": [
      "New floor tiles",
      "Overlay vinyl",
      "Built-in carpentry",
      "False ceiling, L box"
    ],
    "Common Bathroom": [
      "New wall tiles",
      "New floor tiles with water proofing",
      "Vanity cabinet & mirror",
      "Niche, divider etc"
    ],
    "Master Bathroom": [
      "New wall tiles",
      "New floor tiles with water proofing",
      "Vanity cabinet & mirror",
      "Niche, divider etc"
    ]
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    if (type === "checkbox") {
      if (name === "renovationAreas") {
        setFormData(prev => ({
          ...prev,
          renovationAreas: checked 
            ? [...prev.renovationAreas, value]
            : prev.renovationAreas.filter(area => area !== value)
        }));
      } else if (name.includes("Intentions")) {
        setFormData(prev => ({
          ...prev,
          [name]: checked 
            ? [...prev[name], value]
            : prev[name].filter(item => item !== value)
        }));
      }
    } else if (type === "file") {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const validateStep = () => {
    let isValid = true;
    
    switch(step) {
      case 1:
        if (!formData.propertyOwnership || !formData.propertyType) {
          alert("Please fill in all required fields in Step 1.");
          isValid = false;
        }
        break;
      case 2:
        if (formData.renovationAreas.length === 0) {
          alert("Please select at least one area you plan to renovate.");
          isValid = false;
        }
        break;
      case 3:
        // Check if at least one intention is selected for each renovation area
        for (const area of formData.renovationAreas) {
          const intentionField = `${area.toLowerCase().replace(/\/|\s/g, '')}Intentions`;
          if (formData[intentionField].length === 0) {
            alert(`Please select at least one intention for ${area}.`);
            isValid = false;
            break;
          }
        }
        break;
      case 4:
        if (!formData.doors || !formData.windows || !formData.plastering || !formData.painting || !formData.electrical) {
          alert("Please fill in all fields in Step 4.");
          isValid = false;
        }
        break;
      case 5:
        if (!formData.budget || !formData.visitTime || !formData.name || !formData.email || !formData.phone) {
          alert("Please fill in all required fields in Step 5.");
          isValid = false;
        }
        break;
      default:
        break;
    }
    
    return isValid;
  };

  const handleNext = () => {
    if (validateStep()) setStep(prev => prev + 1);
  };

  const handlePrev = () => setStep(prev => prev - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateStep()) return;

    // Prepare WhatsApp message
    let message = "FiftySeven Renovation Enquiry:\n\n";
    
    // Step 1
    message += `Property Ownership: ${formData.propertyOwnership || "-"}\n`;
    message += `Key Collection: ${formData.keyCollectionDate || "-"}\n`;
    message += `Property Type: ${formData.propertyType || "-"}\n\n`;
    
    // Step 2 & 3
    message += "Renovation Plans:\n";
    formData.renovationAreas.forEach(area => {
      const intentionField = `${area.toLowerCase().replace(/\/|\s/g, '')}Intentions`;
      message += `• ${area}: ${formData[intentionField].join(", ") || "-"}\n`;
    });
    message += "\n";
    
    // Step 4
    message += `Doors: ${formData.doors || "-"}\n`;
    message += `Windows: ${formData.windows || "-"}\n`;
    message += `Plastering: ${formData.plastering || "-"}\n`;
    message += `Painting: ${formData.painting || "-"}\n`;
    message += `Electrical: ${formData.electrical || "-"}\n\n`;
    
    // Step 5
    message += `Budget: ${formData.budget || "-"}\n`;
    message += `Additional Info: ${formData.additionalInfo || "-"}\n`;
    message += `Preferred Visit: ${formData.visitTime || "-"}\n`;
    message += `Name: ${formData.name || "-"}\n`;
    message += `Email: ${formData.email || "-"}\n`;
    message += `Phone: ${formData.phone || "-"}\n`;

    const phoneNumber = "6592304357";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const renderCheckboxGroup = (options, name, selectedValues) => (
    <div className="checkbox-group">
      {options.map(option => (
        <label key={option} className="checkbox-label">
          <input
            type="checkbox"
            name={name}
            value={option}
            checked={selectedValues.includes(option)}
            onChange={handleChange}
          />
          <span className="checkmark"></span>
          {option}
        </label>
      ))}
    </div>
  );

  return (
    <div className="reno-form-section">
      <div className="form-header">
        <h2 className="form-title">FiftySeven Renovation Questionnaire</h2>
        <div className="progress-bar">
          <div className="progress-step" data-active={step >= 1}>
            <span>1</span>
            <p>Property Info</p>
          </div>
          <div className="progress-step" data-active={step >= 2}>
            <span>2</span>
            <p>Areas</p>
          </div>
          <div className="progress-step" data-active={step >= 3}>
            <span>3</span>
            <p>Intentions</p>
          </div>
          <div className="progress-step" data-active={step >= 4}>
            <span>4</span>
            <p>Details</p>
          </div>
          <div className="progress-step" data-active={step >= 5}>
            <span>5</span>
            <p>Final</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="renovation-form">
        {/* STEP 1 - Property Information */}
        {step === 1 && (
          <div className="form-step">
            <div className="step-header">
              <h3>Property Information</h3>
              <p>Tell us about your property</p>
            </div>

            <div className="form-group">
              <label className="form-label">What kind of property do you own?*</label>
              <div className="radio-group">
                <label className="radio-label">
                  <input
                    type="radio"
                    name="propertyOwnership"
                    value="New"
                    checked={formData.propertyOwnership === "New"}
                    onChange={handleChange}
                  />
                  <span className="radiomark"></span>
                  New
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="propertyOwnership"
                    value="Resale"
                    checked={formData.propertyOwnership === "Resale"}
                    onChange={handleChange}
                  />
                  <span className="radiomark"></span>
                  Resale
                </label>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">When is your key collection date?</label>
              <input
                type="text"
                name="keyCollectionDate"
                placeholder="Estimated Date / Currently Owned"
                value={formData.keyCollectionDate}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Tell us more about this property*</label>
              <select
                name="propertyType"
                value={formData.propertyType}
                onChange={handleChange}
                className="form-select"
              >
                <option value="">Select property type</option>
                <option value="HDB">HDB</option>
                <option value="CONDOMINIUM">CONDOMINIUM</option>
                <option value="LANDED">LANDED</option>
                <option value="COMMERCIAL">COMMERCIAL</option>
              </select>
            </div>

            <div className="form-nav">
              <button type="button" className="nav-btn prev-btn" onClick={handleNext}>
                Next
              </button>
            </div>
          </div>
        )}

        {/* STEP 2 - Renovation Areas */}
        {step === 2 && (
          <div className="form-step">
            <div className="step-header">
              <h3>Renovation Areas</h3>
              <p>Which areas do you plan to renovate?*</p>
            </div>

            <div className="form-group">
              <div className="areas-grid">
                {areaOptions.map(area => (
                  <label key={area} className="area-checkbox">
                    <input
                      type="checkbox"
                      name="renovationAreas"
                      value={area}
                      checked={formData.renovationAreas.includes(area)}
                      onChange={handleChange}
                    />
                    <span className="area-card">
                      <span className="area-name">{area}</span>
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="form-nav">
              <button type="button" className="nav-btn prev-btn" onClick={handlePrev}>
                Previous
              </button>
              <button type="button" className="nav-btn next-btn" onClick={handleNext}>
                Next
              </button>
            </div>
          </div>
        )}

        {/* STEP 3 - Area Intentions */}
        {step === 3 && (
          <div className="form-step">
            <div className="step-header">
              <h3>Renovation Plans</h3>
              <p>What do you intend to do in each area?</p>
            </div>

            {formData.renovationAreas.map(area => {
              const intentionField = `${area.toLowerCase().replace(/\/|\s/g, '')}Intentions`;
              return (
                <div key={area} className="form-group area-intentions">
                  <label className="form-label">{area} - What do you intend to do?</label>
                  {renderCheckboxGroup(intentionOptions[area], intentionField, formData[intentionField])}
                </div>
              );
            })}

            <div className="form-nav">
              <button type="button" className="nav-btn prev-btn" onClick={handlePrev}>
                Previous
              </button>
              <button type="button" className="nav-btn next-btn" onClick={handleNext}>
                Next
              </button>
            </div>
          </div>
        )}

        {/* STEP 4 - Additional Details */}
        {step === 4 && (
          <div className="form-step">
            <div className="step-header">
              <h3>Additional Details</h3>
              <p>Tell us about doors, windows, and other requirements</p>
            </div>

            {[
              {
                name: "doors",
                label: "Doors",
                options: [
                  "I already have doors",
                  "I want to replace my bedroom doors",
                  "I want to replace my bathroom doors",
                  "I want to replace my main door and gate"
                ]
              },
              {
                name: "windows",
                label: "Windows",
                options: [
                  "I already have windows",
                  "I want to replace all windows",
                  "I want to replace my bathroom/kitchen windows",
                  "I want to replace balcony/yard windows"
                ]
              },
              {
                name: "plastering",
                label: "Plastering (if your walls & ceiling are rough textured)",
                options: ["I am not sure", "Yes, needs plastering", "No"]
              },
              {
                name: "painting",
                label: "Painting",
                options: ["Whole unit", "Partial unit", "Special paint/limewash"]
              },
              {
                name: "electrical",
                label: "Electrical re-wiring",
                options: ["Yes", "No"]
              }
            ].map((item, idx) => (
              <div key={idx} className="form-group">
                <label className="form-label">{item.label}*</label>
                <select
                  name={item.name}
                  value={formData[item.name]}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="">Select an option</option>
                  {item.options.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            ))}

            <div className="form-nav">
              <button type="button" className="nav-btn prev-btn" onClick={handlePrev}>
                Previous
              </button>
              <button type="button" className="nav-btn next-btn" onClick={handleNext}>
                Next
              </button>
            </div>
          </div>
        )}

        {/* STEP 5 - Final Details */}
        {step === 5 && (
          <div className="form-step">
            <div className="step-header">
              <h3>Final Details</h3>
              <p>Almost done! Just a few more details</p>
            </div>

            <div className="form-group">
              <label className="form-label">What is your realistic budget for all the works described?*</label>
              <select name="budget" value={formData.budget} onChange={handleChange} className="form-select">
                <option value="">Select budget range</option>
                <option value="Below $30,000">Below $30,000</option>
                <option value="$30,000 - $50,000">$30,000 - $50,000</option>
                <option value="$50,000 - $80,000">$50,000 - $80,000</option>
                <option value="$80,000 - $120,000">$80,000 - $120,000</option>
                <option value="Above $120,000">Above $120,000</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Please upload your floorplan</label>
              <div className="file-upload">
                <input
                  type="file"
                  name="floorplan"
                  onChange={handleChange}
                  className="file-input"
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                />
                <div className="file-upload-label">
                  {formData.floorplan ? formData.floorplan.name : "Choose file"}
                </div>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Do share with us if you have any other information</label>
              <textarea
                name="additionalInfo"
                rows="3"
                value={formData.additionalInfo}
                onChange={handleChange}
                className="form-textarea"
                placeholder="Any additional details or special requirements..."
              ></textarea>
            </div>

            <div className="form-group">
              <label className="form-label">When would be great for you to visit us?*</label>
              <input
                type="text"
                name="visitTime"
                value={formData.visitTime}
                onChange={handleChange}
                className="form-input"
                placeholder="Preferred date and time"
              />
            </div>

            <div className="contact-details">
              <h4>How can we get in touch</h4>
              <div className="form-group">
                <label className="form-label">My Name is*</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label className="form-label">My Email is*</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Phone Number*</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-nav">
              <button type="button" className="nav-btn prev-btn" onClick={handlePrev}>
                Previous
              </button>
              <button type="submit" className="nav-btn submit-btn">
                Submit via WhatsApp
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default Enquire57;