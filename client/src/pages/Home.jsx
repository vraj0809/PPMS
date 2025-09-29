import React from 'react';
import '../css/Home.css';
import { NavLink } from 'react-router-dom';

export const Home = () => {
  const features = [
    {
      title: "Therapy Scheduling",
      description: "Practitioners and patients can modify or cancel therapy sessions"
    },
    {
      title: "Pre-Post Care Notifications",
      description: "Automated reminders for precautions before and after therapy"
    },
    {
      title: "Visualized Reports",
      description: "Track patient progress with graphs and charts"
    },
    {
      title: "Feedback System",
      description: "Real-time communication between patient and practitioner"
    }
  ];

  const benefits = [
    { title: "For Patients", items: ["No need to remember pre/post precautions", "Visual progress tracking", "Direct feedback to doctors"] },
    { title: "For Doctors", items: ["Manage multiple patients", "Visual patient reports", "Efficient scheduling"] },
    { title: "For Centers", items: ["Reduced paperwork", "Increased efficiency", "Better patient satisfaction"] }
  ];

  return (
    <div className="ayursutra-homepage">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Smart <span>Panchakarma</span> Management Software</h1>
          <p>
            Increases efficiency of managing patient's healthcare with automated scheduling, 
            pre-post care management, and real-time feedback system.
          </p>
          <div className="hero-buttons">
            <NavLink to="/register">
              <button className="btn-primary">Get Started</button>
            </NavLink>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-header">
          <h2>Core Features</h2>
          <p>Complete solution for Panchakarma therapy management</p>
        </div>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">★</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section">
        <div className="section-header">
          <h2>Benefits</h2>
        </div>
        <div className="benefits-grid">
          {benefits.map((benefit, index) => (
            <div key={index} className="benefit-card">
              <h3>{benefit.title}</h3>
              <ul>
                {benefit.items.map((item, i) => (
                  <li key={i}>✔ {item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-brand">
          <div className="logo-circle">A</div>
          <span>AyurSutra</span>
        </div>
        <p>Smart India Hackathon 2025 - Panchakarma Management Solution</p>
      </footer>
    </div>
  );
};
