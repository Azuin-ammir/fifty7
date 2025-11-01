// src/components/GarrisonEnquiryPage.js
import React, { useState, useEffect } from "react";
import "../../styles/garrison/garrison-enquiryform.css";

function GarrisonEnquiryForm() {
  const rates = {
    weekdays: {
      label: "Monday - Thursday",
      items: {
        Full: { time: "9am - 11pm", price: 957 },
        Day: { time: "9am - 3pm", price: 457 },
        Night: { time: "5pm - 11pm", price: 557 },
        Hourly: { time: "Minimum 2-Hour Booking", price: 157 },
      },
    },
    weekends: {
      label: "Friday - Sunday & PH",
      items: {
        Full: { time: "9am - 11pm", price: 1157 },
        Day: { time: "9am - 3pm", price: 657 },
        Night: { time: "5pm - 11pm", price: 757 },
        Hourly: { time: "Minimum 2-Hour Booking", price: 257 },
      },
    },
  };

  const [activeTab, setActiveTab] = useState("weekdays");
  const [selectedRateKey, setSelectedRateKey] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState("");
  const [bookedDates, setBookedDates] = useState([]);
  const [formData, setFormData] = useState({
    fullName: "", email: "", phone: "", eventType: "",
    preferredDate: "", numberOfGuests: "", eventDetails: "",
    selectedRate: "", price: ""
  });

  useEffect(() => {
    const sampleBooked = [
      formatDate(addDays(startOfMonth(currentMonth), 3)),
      formatDate(addDays(startOfMonth(currentMonth), 9)),
      formatDate(addDays(startOfMonth(currentMonth), 17)),
    ];
    setBookedDates(sampleBooked);
  }, [currentMonth]);

  // Helper functions
  function startOfMonth(d) { return new Date(d.getFullYear(), d.getMonth(), 1); }
  function endOfMonth(d) { return new Date(d.getFullYear(), d.getMonth() + 1, 0); }
  function addDays(d, days) { const x = new Date(d); x.setDate(x.getDate() + days); return x; }
  function formatDate(d) { return d.toISOString().split('T')[0]; }
  function isWeekendDate(d) { const day = d.getDay(); return day === 5 || day === 6 || day === 0; }

  function goToPrevMonth() {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  }
  
  function goToNextMonth() {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  }

  function handleSelectRate(key) {
    setSelectedRateKey(key);
    setSelectedDate("");
    setFormData(prev => ({ ...prev, selectedRate: key, price: "" }));
  }

  function handleDateClick(dateStr) {
    if (bookedDates.includes(dateStr)) return;
    if (!selectedRateKey) {
      alert("Please select a rate first.");
      return;
    }
    
    setSelectedDate(dateStr);
    const chosenRateGroup = isWeekendDate(new Date(dateStr)) ? rates.weekends : rates.weekdays;
    const price = chosenRateGroup.items[selectedRateKey].price;
    
    setFormData(prev => ({
      ...prev,
      preferredDate: dateStr,
      selectedRate: selectedRateKey,
      price: price
    }));

    setTimeout(() => {
      document.getElementById("garrison-enquiry-form")?.scrollIntoView({ behavior: "smooth" });
    }, 150);
  }

  const eventTypes = ["Wedding", "Birthday Party", "Corporate Event", "Anniversary", "Family Gathering", "Other"];

  function handleFormChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone) {
      alert("Please fill your name, email and phone.");
      return;
    }
    if (!selectedRateKey || !selectedDate) {
      alert("Please select a rate and preferred date before submitting.");
      return;
    }

    // Prepare message for WhatsApp and email
    const message = `Garrison Enquiry\n\n` +
      `Name: ${formData.fullName}\n` +
      `Email: ${formData.email}\n` +
      `Phone: ${formData.phone}\n` +
      `Event Type: ${formData.eventType || 'Not specified'}\n` +
      `Preferred Date: ${selectedDate}\n` +
      `Number of Guests: ${formData.numberOfGuests || 'Not specified'}\n` +
      `Selected Rate: ${selectedRateKey}\n` +
      `Price: $${formData.price}\n\n` +
      `Event Details:\n${formData.eventDetails || 'No additional details provided'}`;

    // Send via WhatsApp
    const whatsappUrl = `https://wa.me/6591204621?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    // Send via email
    const emailSubject = `Garrison Enquiry - ${formData.fullName}`;
    const emailBody = message;
    const mailtoUrl = `mailto:tim-wild@fiftysevensg.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    
    // Small delay to avoid popup blockers
    setTimeout(() => {
      window.location.href = mailtoUrl;
    }, 500);

    console.log("Enquiry submitted:", formData);

    // Reset form
    setFormData({
      fullName: "", email: "", phone: "", eventType: "",
      preferredDate: "", numberOfGuests: "", eventDetails: "",
      selectedRate: "", price: ""
    });
    setSelectedDate("");
    setSelectedRateKey(null);
  }

  function buildMonthGrid(date) {
    const start = startOfMonth(date);
    const end = endOfMonth(date);
    const startWeekday = start.getDay();
    const totalDays = end.getDate();
    const cells = [];
    for (let i = 0; i < startWeekday; i++) cells.push(null);
    for (let d = 1; d <= totalDays; d++) cells.push(new Date(date.getFullYear(), date.getMonth(), d));
    while (cells.length % 7 !== 0) cells.push(null);
    const rows = [];
    for (let i = 0; i < cells.length; i += 7) rows.push(cells.slice(i, i + 7));
    return rows;
  }

  const monthRows = buildMonthGrid(currentMonth);

  return (
    <div className="garrison-enquiry-container">
      {/* Header */}
      <div className="enquiry-header">
        <h1>Book Garrison</h1>
        <p>Select your package and preferred date</p>
      </div>

      {/* Rate Selection */}
      <div className="rate-section">
        <div className="rate-tabs">
          <button 
            className={`tab ${activeTab === "weekdays" ? "active" : ""}`}
            onClick={() => setActiveTab("weekdays")}
          >
            Weekdays
          </button>
          <button 
            className={`tab ${activeTab === "weekends" ? "active" : ""}`}
            onClick={() => setActiveTab("weekends")}
          >
            Weekends
          </button>
        </div>

        <div className="rate-cards">
          {Object.entries(rates[activeTab].items).map(([key, info]) => (
            <div
              key={key}
              className={`rate-card ${selectedRateKey === key ? "selected" : ""}`}
              onClick={() => handleSelectRate(key)}
            >
              <div className="rate-info">
                <div className="rate-name">{key}</div>
                <div className="rate-time">{info.time}</div>
              </div>
              <div className="rate-price">${info.price}</div>
              {selectedRateKey === key && <div className="selected-indicator">✓</div>}
            </div>
          ))}
        </div>
      </div>

      {/* Calendar */}
      <div className="calendar-section">
        <div className="calendar-header">
          <button onClick={goToPrevMonth} className="nav-button">‹</button>
          <div className="month-display">
            {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
          </div>
          <button onClick={goToNextMonth} className="nav-button">›</button>
        </div>

        <div className="calendar-grid">
          <div className="weekdays">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="weekday">{day}</div>
            ))}
          </div>

          {monthRows.map((row, rowIndex) => (
            <div key={rowIndex} className="calendar-row">
              {row.map((date, cellIndex) => {
                if (!date) return <div key={cellIndex} className="calendar-cell empty" />;
                
                const dateStr = formatDate(date);
                const isBooked = bookedDates.includes(dateStr);
                const isSelected = selectedDate === dateStr;
                const isWeekend = isWeekendDate(date);
                const isToday = formatDate(new Date()) === dateStr;

                return (
                  <div
                    key={cellIndex}
                    className={`calendar-cell ${isBooked ? 'booked' : ''} ${isSelected ? 'selected' : ''} ${isToday ? 'today' : ''}`}
                    onClick={() => !isBooked && handleDateClick(dateStr)}
                  >
                    <div className="date-number">{date.getDate()}</div>
                    {!isBooked && selectedRateKey && (
                      <div className="date-price">
                        ${isWeekend ? rates.weekends.items[selectedRateKey]?.price : rates.weekdays.items[selectedRateKey]?.price}
                      </div>
                    )}
                    {isBooked && <div className="booked-label">Booked</div>}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Selection Summary */}
      {(selectedRateKey || selectedDate) && (
        <div className="selection-summary">
          <h3>Your Selection</h3>
          <div className="summary-details">
            {selectedRateKey && (
              <div className="summary-item">
                <span>Package:</span>
                <strong>{selectedRateKey} ({activeTab === 'weekdays' ? 'Weekday' : 'Weekend'})</strong>
              </div>
            )}
            {selectedDate && (
              <div className="summary-item">
                <span>Date:</span>
                <strong>{new Date(selectedDate).toLocaleDateString()}</strong>
              </div>
            )}
            {selectedRateKey && selectedDate && (
              <div className="summary-item total">
                <span>Total:</span>
                <strong>${formData.price}</strong>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Enquiry Form */}
      {selectedRateKey && selectedDate && (
        <div id="garrison-enquiry-form" className="enquiry-form-section">
          <h2>Your Details</h2>
          <p className="form-description">
            After submitting, your enquiry will be sent via WhatsApp and email automatically.
          </p>
          <form onSubmit={handleSubmit} className="enquiry-form">
            <div className="form-group">
              <label>Full Name *</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleFormChange}
                required
                placeholder="Enter your full name"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  required
                  placeholder="your@email.com"
                />
              </div>
              <div className="form-group">
                <label>Phone *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleFormChange}
                  required
                  placeholder="Phone number"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Event Type</label>
                <select
                  name="eventType"
                  value={formData.eventType}
                  onChange={handleFormChange}
                >
                  <option value="">Select type</option>
                  {eventTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Number of Guests</label>
                <input
                  type="number"
                  name="numberOfGuests"
                  value={formData.numberOfGuests}
                  onChange={handleFormChange}
                  min="1"
                  placeholder="0"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Event Details</label>
              <textarea
                name="eventDetails"
                rows="4"
                value={formData.eventDetails}
                onChange={handleFormChange}
                placeholder="Tell us about your event..."
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="submit-button">
                Send Enquiry via WhatsApp & Email
              </button>
              <p className="submit-note">
                This will open WhatsApp and your email app to send the enquiry
              </p>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default GarrisonEnquiryForm;