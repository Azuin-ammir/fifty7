import React from "react";
import "../../styles/academy/carpentry-profile.css";

function CarpentryProfile() {
  return (
    <section className="carpentry-profile-section">
      <div className="carpentry-profile-content">
        <div className="carpentry-profile-image-container">
          <img 
            src="/Images/Academy/luqman.jpg" 
            // alt="Lugman - Master Carpenter"
            className="carpentry-profile-image"
            // onError={(e) => {
            //   e.currentTarget.src = "https://via.placeholder.com/400x500/f8f3e7/63100d?text=Lugman+Profile";
            // }}
          />
        </div>
        <div className="carpentry-profile-info">
          <h2>Meet Luqman</h2>
          <p className="carpentry-profile-bio">
            With over 15 years of experience in fine woodworking and carpentry, 
            Lugman brings exceptional craftsmanship and passion to every lesson. 
            As the founder of 57, he has trained hundreds of students in the art 
            of traditional and modern carpentry techniques.
          </p>
          <div className="carpentry-expertise">
            <h3>Areas of Expertise:</h3>
            <ul>
              <li>Fine Woodworking & Joinery</li>
              <li>Furniture Making & Restoration</li>
              <li>Cabinetry & Built-ins</li>
              <li>Wood Turning & Carving</li>
              <li>Project Planning & Design</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CarpentryProfile;