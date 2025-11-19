import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ApplicationModal from '../components/ApplicationModal';
import './Careers.css';

function Careers() {
  const [showModal, setShowModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="careers-page">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <Link to="/" className="logo">
            <span className="logo-icon">✨</span>
            Aurora iLabs
          </Link>
          
          {/* Hamburger Menu Icon - Mobile Only */}
          <button 
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`hamburger ${mobileMenuOpen ? 'active' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>

          {/* Desktop Menu */}
          <ul className="nav-menu">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/#about">About Us</Link>
            </li>
            <li>
              <Link to="/#services">Services</Link>
            </li>
            <li>
              <Link to="/careers" className="active">Careers</Link>
            </li>
            <li>
              <Link to="/#contact">Contact</Link>
            </li>
          </ul>

        </div>
      </nav>

      {/* Mobile Menu Overlay - Outside nav for proper positioning */}
      <div className={`mobile-menu-overlay ${mobileMenuOpen ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>
        <div className="mobile-menu-content" onClick={(e) => e.stopPropagation()}>
          <div className="mobile-menu-header">
            <Link to="/" className="mobile-logo" onClick={() => setMobileMenuOpen(false)}>
              <span className="logo-icon">✨</span>
              Aurora iLabs
            </Link>
            <button 
              className="mobile-menu-close"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              ×
            </button>
          </div>
          <ul className="mobile-nav-menu">
            <li>
              <Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
            </li>
            <li>
              <Link to="/#about" onClick={() => setMobileMenuOpen(false)}>About Us</Link>
            </li>
            <li>
              <Link to="/#services" onClick={() => setMobileMenuOpen(false)}>Services</Link>
            </li>
            <li>
              <Link to="/careers" className="active" onClick={() => setMobileMenuOpen(false)}>Careers</Link>
            </li>
            <li>
              <Link to="/#contact" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Purple Curved Shapes Background */}
      <div className="curved-shapes">
        <svg className="curve-1" viewBox="0 0 200 3000" preserveAspectRatio="none">
          <defs>
            <linearGradient id="careerGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#7C3AED" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#6D28D9" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          <path d="M0,0 Q50,500 0,1000 T0,2000 Q50,2500 0,3000" fill="url(#careerGradient1)" />
        </svg>
        <svg className="curve-2" viewBox="0 0 200 3000" preserveAspectRatio="none">
          <defs>
            <linearGradient id="careerGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.18" />
              <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#9333EA" stopOpacity="0.08" />
            </linearGradient>
          </defs>
          <path d="M200,0 Q150,600 200,1200 T200,2400 Q150,2700 200,3000" fill="url(#careerGradient2)" />
        </svg>
        <svg className="curve-3" viewBox="0 0 200 3000" preserveAspectRatio="none">
          <defs>
            <linearGradient id="careerGradient3" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#6D28D9" stopOpacity="0.15" />
              <stop offset="50%" stopColor="#7C3AED" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.08" />
            </linearGradient>
          </defs>
          <path d="M0,0 Q100,700 0,1400 T0,2800 Q100,2900 0,3000" fill="url(#careerGradient3)" />
        </svg>
      </div>

      {/* Careers Content */}
      <div className="careers-page-content">
        <div className="container">
          <div className="careers-hero">
            <h1 className="section-title">Join Our Team</h1>
            <p className="careers-subtitle">Build the Future with Us</p>
            <div className="careers-badge">
              <span className="badge-icon">🚀</span>
              <span>Early-Stage Startup</span>
            </div>
          </div>

          <div className="careers-content">
            {/* Who We Are */}
            <div className="career-section-card">
              <div className="card-header">
                <div className="card-icon-large">💼</div>
                <h3>Who We Are</h3>
              </div>
              <p className="career-description">
                We are an early-stage startup focused on building impactful, real-time digital products. 
                We're looking for professionals who can take ownership, work independently, and thrive 
                in a fast-paced, zero-bureaucracy environment.
              </p>
            </div>

            {/* Who We're Looking For */}
            <div className="career-section-card highlight-card">
              <div className="card-header">
                <div className="card-icon-large">🎯</div>
                <h3>Who We're Looking For</h3>
              </div>
              <div className="qualities-grid">
                <div className="quality-item">
                  <div className="quality-icon">💻</div>
                  <p>Professionals with strong hands-on skills in software development, design, testing, or product management</p>
                </div>
                <div className="quality-item">
                  <div className="quality-icon">🎨</div>
                  <p>People who can operate independently without micro-management</p>
                </div>
                <div className="quality-item">
                  <div className="quality-icon">🔧</div>
                  <p>Builders who enjoy solving real user problems</p>
                </div>
                <div className="quality-item">
                  <div className="quality-icon">🌟</div>
                  <p>Contributors who want to be part of a product from the ground up</p>
                </div>
                <div className="quality-item">
                  <div className="quality-icon">⚡</div>
                  <p>Individuals comfortable with startup-style decision-making and ambiguity</p>
                </div>
              </div>
            </div>

            {/* What You'll Work On */}
            <div className="career-section-card">
              <div className="card-header">
                <div className="card-icon-large">🛠️</div>
                <h3>What You'll Work On</h3>
              </div>
              <div className="work-list">
                <div className="work-item">
                  <span className="work-bullet">→</span>
                  <span>End-to-end development of real-time product features</span>
                </div>
                <div className="work-item">
                  <span className="work-bullet">→</span>
                  <span>Experimenting with new ideas, technologies, and rapid prototypes</span>
                </div>
                <div className="work-item">
                  <span className="work-bullet">→</span>
                  <span>Creating scalable and efficient architecture</span>
                </div>
                <div className="work-item">
                  <span className="work-bullet">→</span>
                  <span>Collaborating directly with founders and core team</span>
                </div>
                <div className="work-item">
                  <span className="work-bullet">→</span>
                  <span>Improving product experience and performance continuously</span>
                </div>
              </div>
            </div>

            {/* Why Join Us */}
            <div className="benefits-section">
              <h3 className="benefits-title">Why Join Us</h3>
              <div className="benefits-grid">
                <div className="benefit-card">
                  <div className="benefit-icon">🎯</div>
                  <h4>Full Ownership</h4>
                  <p>Work in a role with full ownership and freedom</p>
                </div>
                <div className="benefit-card">
                  <div className="benefit-icon">🌍</div>
                  <h4>Real Impact</h4>
                  <p>Build a real product used by real users</p>
                </div>
                <div className="benefit-card">
                  <div className="benefit-icon">🏠</div>
                  <h4>Flexible Work</h4>
                  <p>Flexible work environment (remote/hybrid)</p>
                </div>
                <div className="benefit-card">
                  <div className="benefit-icon">🚀</div>
                  <h4>Shape Product</h4>
                  <p>Opportunity to shape the product and its direction</p>
                </div>
                <div className="benefit-card">
                  <div className="benefit-icon">📈</div>
                  <h4>Fast Growth</h4>
                  <p>Fast-paced learning and career growth</p>
                </div>
              </div>
            </div>

            {/* Role Expectations */}
            <div className="career-section-card">
              <div className="card-header">
                <div className="card-icon-large">✅</div>
                <h3>Role Expectations</h3>
              </div>
              <div className="expectations-list">
                <div className="expectation-item">
                  <div className="check-icon">✓</div>
                  <p>Ability to independently plan, execute, and deliver work</p>
                </div>
                <div className="expectation-item">
                  <div className="check-icon">✓</div>
                  <p>Strong problem-solving and debugging skills</p>
                </div>
                <div className="expectation-item">
                  <div className="check-icon">✓</div>
                  <p>Comfortable taking responsibility and making technical decisions</p>
                </div>
                <div className="expectation-item">
                  <div className="check-icon">✓</div>
                  <p>Experience with Git, agile workflows, and product thinking</p>
                </div>
              </div>
            </div>

            {/* Engagement Details */}
            <div className="career-section-card engagement-card">
              <div className="card-header">
                <div className="card-icon-large">📋</div>
                <h3>Engagement Details</h3>
              </div>
              <div className="engagement-details">
                <div className="engagement-item">
                  <span className="engagement-icon">⏱️</span>
                  <div>
                    <strong>3–4 month contribution period</strong>
                    <p>Working on real product modules</p>
                  </div>
                </div>
                <div className="engagement-item">
                  <span className="engagement-icon">📜</span>
                  <div>
                    <strong>Experience letter</strong>
                    <p>Provided upon completion</p>
                  </div>
                </div>
                <div className="engagement-item">
                  <span className="engagement-icon">👥</span>
                  <div>
                    <strong>Continuous support</strong>
                    <p>Guidance from industry veterans</p>
                  </div>
                </div>
                <div className="engagement-item">
                  <span className="engagement-icon">💼</span>
                  <div>
                    <strong>Real responsibilities</strong>
                    <p>Work directly on a live, real-time product</p>
                  </div>
                </div>
                <div className="engagement-item">
                  <span className="engagement-icon">🎯</span>
                  <div>
                    <strong>Performance evaluation</strong>
                    <p>Full-time opportunity based on performance</p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="careers-cta">
              <div className="cta-content">
                <h2 className="cta-title">Ready to Build With Us?</h2>
                <p className="cta-subtitle">Apply and tell us why you'd be a great fit.</p>
                <button 
                  className="btn btn-primary btn-large"
                  onClick={openModal}
                >
                  Apply Now
                </button>
              </div>
              <div className="cta-decoration">
                <div className="cta-shape"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Application Modal */}
      {showModal && <ApplicationModal onClose={closeModal} />}
    </div>
  );
}

export default Careers;

