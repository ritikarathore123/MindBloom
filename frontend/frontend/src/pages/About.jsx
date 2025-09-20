


import React from "react";
import "../App.css";
import SectionHeader from "../components/SectionHeader";

const About = () => {
  return (
    <div className="about-container">
      <SectionHeader
        title="About MindBloom"
        subtitle="Your journey to mental wellness starts here 🌱"
        align="center"
      />

      <div className="about-content container">
        <div className="row align-items-center">
          <div className="col-md-6 text-center">
            <img
              src="https://images.unsplash.com/photo-1551836022-4c4c79ecde51?auto=format&fit=crop&w=800&q=80"
              alt="About MindBloom"
              className="about-image"
            />
          </div>

          <div className="col-md-6">
            <h2>Who We Are</h2>
            <p>
              <strong>MindBloom</strong> is a digital companion for mental wellness, self-reflection, and personal growth. We combine technology with care to make your experience meaningful.
            </p>
            <p>
              Our platform offers personalized insights and secure tools to help you stay balanced and motivated.
            </p>

            <div className="row mt-4">
              <div className="col-sm-6 mb-3">
                <div className="card hover-card highlight-card">
                  <div className="card-body">
                    <h5 className="card-title">Our Mission</h5>
                    <p className="card-text text-white">
                      Empower users with smart, secure, and easy-to-use tools for mental wellness.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 mb-3">
                <div className="card hover-card highlight-card">
                  <div className="card-body">
                    <h5 className="card-title">Our Vision</h5>
                    <p className="card-text text-white">
                      Create a digital ecosystem where emotional growth and self-care never stop.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div className="why-section mt-5 text-center">
          <h2>🌟 Why MindBloom?</h2>
          <p className="text-center">        In today’s fast-paced digital world, mental health often takes a back
          seat. MindBloom provides a private, user-friendly space to reflect,
             track, and improve your emotional well-being — blending empathy with
            technology.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;