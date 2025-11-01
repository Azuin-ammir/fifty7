import React from "react";
import "../../styles/academy/carpentry-classes.css";

function CarpentryClasses() {
  const classes = [
    {
      id: 1,
      title: "Beginner Woodworking",
      description: "Learn fundamental skills and complete your first project",
      duration: "4 weeks",
      level: "Beginner"
    },
    {
      id: 2,
      title: "Furniture Making",
      description: "Design and build custom furniture pieces",
      duration: "6 weeks", 
      level: "Intermediate"
    },
    {
      id: 3,
      title: "Advanced Joinery",
      description: "Master complex woodworking joints and techniques",
      duration: "8 weeks",
      level: "Advanced"
    },
    {
      id: 4,
      title: "One-on-One Mentorship",
      description: "Personalized coaching for your specific projects",
      duration: "Flexible",
      level: "All Levels"
    }
  ];

  return (
    <section className="carpentry-classes-section">
      <div className="carpentry-classes-container">
        <h2>Bespoke Personalized Classes</h2>
        <p className="carpentry-classes-subtitle">
          Founded by the expert craftsmen of 57, our classes cater to all skill levels
        </p>
        
        <div className="carpentry-classes-grid">
          {classes.map(classItem => (
            <div key={classItem.id} className="carpentry-class-card">
              <div className="carpentry-class-icon">⚒</div>
              <h3>{classItem.title}</h3>
              <p>{classItem.description}</p>
              <div className="carpentry-class-meta">
                <span className="carpentry-class-duration">{classItem.duration}</span>
                <span className="carpentry-class-level">{classItem.level}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CarpentryClasses;