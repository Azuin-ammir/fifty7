// src/components/57Directive/Renovate57.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/57directive/renovate57.css";

function Renovate57() {
  const navigate = useNavigate();

  const handleMakeEnquiry = () => {
    navigate('/57Directive/EnquirePage');
  };

  return (
    <section className="garrison-enquire-now-section">
      <div className="container">
        <div className="section-header">
          <h2>GET YOUR FREE QUOTATIONS</h2>
          <p>Drop a message now!</p>
        </div>

        <div className="enquire-cta-container">
          <button 
            className="enquire-btn"
            onClick={handleMakeEnquiry}
          >
            Renovate Space
          </button>
        </div>
      </div>
    </section>
  );
}

export default Renovate57;
