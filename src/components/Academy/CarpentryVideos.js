import React from "react";
import "../../styles/academy/carpentry-videos.css";

function CarpentryVideos() {
  const videos = [
    {
      id: 1,
      title: "Asia One Project Showcase",
      description: "Complete furniture transformation",
      thumbnail: "/Images/Academy/video1-thumb.jpg"
    },
    {
      id: 2,
      title: "Advanced Joinery Techniques",
      description: "Master traditional woodworking methods",
      thumbnail: "/Images/Academy/video2-thumb.jpg"
    },
    {
      id: 3,
      title: "Custom Cabinet Making",
      description: "From design to installation",
      thumbnail: "/Images/Academy/video3-thumb.jpg"
    }
  ];

  return (
    <section className="carpentry-videos-section">
      <div className="carpentry-videos-container">
        <h2>Project Showcase</h2>
        <p className="carpentry-videos-subtitle">
          Watch our featured projects and learn about the craftsmanship we teach
        </p>
        
        <div className="carpentry-videos-grid">
          {videos.map(video => (
            <div key={video.id} className="carpentry-video-card">
              <div className="carpentry-video-thumbnail">
                <img 
                  src={video.thumbnail} 
                  alt={video.title}
                  onError={(e) => {
                    e.currentTarget.src = "https://via.placeholder.com/400x250/f8f3e7/63100d?text=Video+Thumbnail";
                  }}
                />
                <div className="carpentry-play-button">▶</div>
              </div>
              <div className="carpentry-video-info">
                <h3>{video.title}</h3>
                <p>{video.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CarpentryVideos;