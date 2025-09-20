

import { IoPlayCircleOutline } from "react-icons/io5";
import { GoArrowRight } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { benefits } from "../utils/benefitsData";
import SectionHeader from "../components/SectionHeader";

function Home() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  return (
    <>
    
      <div className="hero-banner d-flex justify-content-center align-items-center text-center text-white">
        <div data-aos="fade-up" data-aos-delay="60">
          <h1 className="display-4 fw-bold">Find Inner Peace with MindBloom</h1>

          <p className="lead mt-3 fw-semibold text-white">
            Your personal companion for mental wellness. Meditation,
            <br />
            mindfulness, and emotional support - all in one place.
          </p>

     
          <div className="d-flex justify-content-center gap-3 mt-4">
            {!user && (
              <button
                onClick={() => navigate("/signUp")}
                className="btn btn-lg d-flex align-items-center gap-2 btn-gradient"
              >
                Get Started Free <GoArrowRight size={22} />
              </button>
            )}
            <button
              className="btn btn-lg d-flex align-items-center gap-2 btn-gradient"
              onClick={() => navigate("/features")}
            >
              Explore Features <IoPlayCircleOutline size={22} />
            </button>
          </div>
        </div>
      </div>


      <section className="py-5">
        <div className="container">
          <SectionHeader
            title="Why Choose MindBloom?"
            subtitle="Discover the science-backed benefits of mental wellness"
          />

          <div className="row g-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="col-md-6 col-lg-3">
                <div
                  className="card h-100 border-0 shadow-sm text-center benefit-card"
                  data-aos="fade-up"
                  data-aos-delay={index * 80}
                >
                  <div className="card-body">
                    <div className={`mb-3 fs-1 ${benefit.color}`}>
                      <i className={benefit.icon}></i>
                    </div>
                    <h5 className="card-title fw-bold">{benefit.title}</h5>
                    <p className="card-text">{benefit.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

     
      <section className="py-5 bg-dark text-center">
        <div className="container">
          <h2 className="text-white mb-4">
            Relax Your Mind with Calming Music
          </h2>
          <div className="ratio ratio-16x9">
            <iframe
              src="https://www.youtube.com/embed/HkHIdvNUKCM?si=j5v7Y8KwmZWNqkLy"
              title="Relaxing Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;