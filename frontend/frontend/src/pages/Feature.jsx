


import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { featureData } from "../utils/featureData";
import SectionHeader from "../components/SectionHeader";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

import { FaRegHeart } from "react-icons/fa";
import { BsBarChart, BsJournalBookmark } from "react-icons/bs";
import { AiOutlineThunderbolt, AiOutlineSound, AiOutlinePlayCircle, AiOutlineCalculator } from "react-icons/ai";

const iconMap = {
  AiOutlinePlayCircle: <AiOutlinePlayCircle />,
  BsJournalBookmark: <BsJournalBookmark />,
  AiOutlineSound: <AiOutlineSound />,
  AiOutlineThunderbolt: <AiOutlineThunderbolt />,
  FaRegHeart: <FaRegHeart />,
  BsBarChart: <BsBarChart />,
  AiOutlineCalculator: <AiOutlineCalculator />
};

function Features() {
  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const { user } = useContext(AuthContext);


  useEffect(() => {}, [user]);

  return (
    <div className="container-fluid features-page">
      <SectionHeader
        title="Features That Transform Your Mental Wellness Journey"
        subtitle={
          <span style={{ color: "white" }}>
            Discover tools and features designed to support your mental health and emotional well-being
          </span>
        }
      />
      <div className="row justify-content-center g-4">
        {featureData.map((feature, index) => (
          <div key={index} className="col-12 col-md-6 col-lg-4">
            <div
              className="card h-100 border-0 rounded-4 feature-card-modern hover-card"
              style={{ cursor: "pointer" }}
              data-aos="fade-up"
              data-aos-delay={index * 50}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => navigate(feature.url)}
            >
              <div className="card-body p-4">
                <div className="d-flex align-items-center mb-3">
                  {iconMap[feature.icon] && (
                    <div className={`feature-icon me-3 fs-5 ${feature.color}`}>
                      {iconMap[feature.icon]}
                    </div>
                  )}
                  <h5 className="card-title mb-0 fw-bold">{feature.title}</h5>
                </div>
                <p className="card-text opacity-90">{feature.description}</p>
                <div className="mt-auto">
                  <small className="feature-meta">Click to explore →</small>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Features;