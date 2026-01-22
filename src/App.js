import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import emailjs from 'emailjs-com';

function HomePage() {
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [contactLoading, setContactLoading] = useState(false);
  const [contactMessage, setContactMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'services', 'contact'];
      const scrollPosition = window.scrollY + 200;
      setScrolled(window.scrollY > 50);

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navHeight = 60; // Approximate navbar height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      // Close mobile menu after navigation
      setMobileMenuOpen(false);
    }
  };

  const handleContactInputChange = (e) => {
    setContactForm({
      ...contactForm,
      [e.target.name]: e.target.value
    });
    // Clear message when user starts typing
    if (contactMessage.text) {
      setContactMessage({ type: '', text: '' });
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!contactForm.name.trim()) {
      setContactMessage({ type: 'error', text: 'Please enter your name' });
      return;
    }
    if (!contactForm.email.trim()) {
      setContactMessage({ type: 'error', text: 'Please enter your email' });
      return;
    }
    if (!contactForm.message.trim()) {
      setContactMessage({ type: 'error', text: 'Please enter your message' });
      return;
    }

    setContactLoading(true);
    setContactMessage({ type: '', text: '' });

    // EmailJS configuration - Get values from environment variables
    const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
    const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

    // Check if EmailJS is configured
    if (!serviceId || !templateId || !publicKey || 
        serviceId === 'your_service_id_here' || 
        templateId === 'your_template_id_here' || 
        publicKey === 'your_public_key_here') {
      setContactMessage({ 
        type: 'error', 
        text: 'EmailJS is not configured. Please set up your EmailJS credentials in the .env file. See EMAILJS_SETUP.md for instructions.' 
      });
      setContactLoading(false);
      return;
    }

    // Prepare message with email contact information appended
    const messageWithEmail = `${contactForm.message}\n\nPlease contact this person: ${contactForm.email}`;

    // Prepare template parameters matching EmailJS template variables
    const templateParams = {
      name: contactForm.name,
      email: contactForm.email,
      title: contactForm.subject || 'Contact Form Submission',
      message: messageWithEmail,
      time: new Date().toLocaleString()
    };

    // Send email using EmailJS
    emailjs.send(serviceId, templateId, templateParams, publicKey)
      .then((response) => {
        setContactMessage({ 
          type: 'success', 
          text: 'Thank you! Your message has been sent successfully. We will get back to you soon.' 
        });
        
        // Reset form
        setContactForm({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
        setContactLoading(false);
      })
      .catch((error) => {
        console.error('EmailJS Error:', error);
        setContactMessage({ 
          type: 'error', 
          text: 'Sorry, there was an error sending your message. Please try again later or email us directly at hello@vectrax.in' 
        });
        setContactLoading(false);
      });
  };

  return (
    <div className="App">
      {/* Navigation */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <Link to="/" className="logo">
            <div className="vectrax-logo">
              <img 
                src="/vx_logo-removebg-preview.png" 
                alt="vectraX Technologies Logo" 
                className="vectrax-logo-img"
              />
            </div>
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
              <a 
                href="#home" 
                className={activeSection === 'home' ? 'active' : ''}
                onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}
              >
                Home
              </a>
            </li>
            <li>
              <a 
                href="#about" 
                className={activeSection === 'about' ? 'active' : ''}
                onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}
              >
                About Us
              </a>
            </li>
            <li>
              <a 
                href="#services" 
                className={activeSection === 'services' ? 'active' : ''}
                onClick={(e) => { e.preventDefault(); scrollToSection('services'); }}
              >
                Services
              </a>
            </li>
            <li>
              <a 
                href="#contact" 
                className={activeSection === 'contact' ? 'active' : ''}
                onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}
              >
                Contact
              </a>
            </li>
          </ul>

        </div>
      </nav>

      {/* Mobile Menu Overlay - Outside nav for proper positioning */}
      <div className={`mobile-menu-overlay ${mobileMenuOpen ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>
        <div className="mobile-menu-content" onClick={(e) => e.stopPropagation()}>
          <div className="mobile-menu-header">
            <Link to="/" className="mobile-logo" onClick={() => setMobileMenuOpen(false)}>
              <div className="vectrax-logo">
                <img 
                  src="/vx_logo-removebg-preview.png" 
                  alt="vectraX Technologies Logo" 
                  className="vectrax-logo-img"
                />
              </div>
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
              <a 
                href="#home" 
                className={activeSection === 'home' ? 'active' : ''}
                onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}
              >
                Home
              </a>
            </li>
            <li>
              <a 
                href="#about" 
                className={activeSection === 'about' ? 'active' : ''}
                onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}
              >
                About Us
              </a>
            </li>
            <li>
              <a 
                href="#services" 
                className={activeSection === 'services' ? 'active' : ''}
                onClick={(e) => { e.preventDefault(); scrollToSection('services'); }}
              >
                Services
              </a>
            </li>
            <li>
              <a 
                href="#contact" 
                className={activeSection === 'contact' ? 'active' : ''}
                onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Purple Curved Shapes Background - Extending across 3 pages */}
      <div className="curved-shapes">
        <svg className="curve-1" viewBox="0 0 200 3000" preserveAspectRatio="none">
          <defs>
            <linearGradient id="curveGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#7C3AED" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#6D28D9" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          <path d="M0,0 Q50,500 0,1000 T0,2000 Q50,2500 0,3000" fill="url(#curveGradient1)" />
        </svg>
        <svg className="curve-2" viewBox="0 0 200 3000" preserveAspectRatio="none">
          <defs>
            <linearGradient id="curveGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.18" />
              <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#9333EA" stopOpacity="0.08" />
            </linearGradient>
          </defs>
          <path d="M200,0 Q150,600 200,1200 T200,2400 Q150,2700 200,3000" fill="url(#curveGradient2)" />
        </svg>
        <svg className="curve-3" viewBox="0 0 200 3000" preserveAspectRatio="none">
          <defs>
            <linearGradient id="curveGradient3" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#6D28D9" stopOpacity="0.15" />
              <stop offset="50%" stopColor="#7C3AED" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.08" />
            </linearGradient>
          </defs>
          <path d="M0,0 Q100,700 0,1400 T0,2800 Q100,2900 0,3000" fill="url(#curveGradient3)" />
        </svg>
      </div>

      {/* Home Section - Enhanced Hero */}
      <section id="home" className="section home-section">
        <div className="hero-background">
          <div className="hero-gradient"></div>
          <div className="floating-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
          </div>
        </div>
        <div className="container">
          <div className="home-content">
            <div className="hero-badge">
              <span className="badge-icon">🚀</span>
              <span>Innovation at Your Fingertips</span>
            </div>
            <h1 className="home-title">
              Transform Your Business with
              <span className="highlight"> vectraX Technologies</span>
            </h1>
            <p className="home-subtitle">
              Cutting-Edge Software Solutions & Digital Products
            </p>
            <p className="home-description">
              We build powerful software products and deliver exceptional services that drive 
              digital transformation. From enterprise applications to cloud solutions, 
              we create technology that scales with your business.
            </p>
          </div>
          <div className="home-visual">
            <div className="hero-image-container">
              <img 
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&q=80" 
                alt="Digital Transformation" 
                className="hero-image"
              />
              <div className="image-overlay"></div>
            </div>
            <div className="visual-cards-grid">
              <div className="visual-card card-1">
                <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200&h=200&fit=crop&q=80" alt="Product Development" className="visual-card-image" />
                <h4>Product Development</h4>
              </div>
              <div className="visual-card card-2">
                <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=200&h=200&fit=crop&q=80" alt="e-Commerce/Websites" className="visual-card-image" />
                <h4>e-Commerce/Websites</h4>
              </div>
              <div className="visual-card card-3">
                <img src="https://images.unsplash.com/photo-1561070791-2526d30994b5?w=200&h=200&fit=crop&q=80" alt="Digital Solutions" className="visual-card-image" />
                <h4>Digital Solutions</h4>
              </div>
              <div className="visual-card card-4">
                <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=200&h=200&fit=crop&q=80" alt="Internship" className="visual-card-image" />
                <h4>Internship</h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="section about-section">
        <div className="container">
          <h2 className="section-title">About Us</h2>
          <div className="about-content">
            <div className="about-image-wrapper">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop&q=80" 
                alt="vectraX Technologies Team" 
                className="about-image"
              />
              <div className="about-image-overlay"></div>
            </div>
            <div className="about-text">
              <p>
                vectraX Technologies is a forward-thinking software products and services company focused on helping businesses unlock their digital potential. We design and build simple, scalable, and impactful technology solutions—from custom applications and system modernization to user-centric experiences and digital transformation initiatives. Driven by innovation, quality, and a strong customer focus, we use modern technologies to solve real business challenges. We believe technology should feel effortless, and we work as long-term partners to help our clients operate better, grow faster, and stay future-ready.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="section services-section">
        <div className="container">
          <h2 className="section-title">Our Services</h2>
          <p className="section-subtitle">Comprehensive solutions tailored to unlock your digital potential</p>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-image-wrapper">
                <img src="https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=300&fit=crop&q=80" alt="Product Development" className="service-image" />
                <div className="service-image-overlay"></div>
              </div>
              <div className="service-card-content">
              <h3>Product Development</h3>
              <p>
                End-to-end product development from concept to launch. We build modern digital 
                solutions that enhance business performance and streamline operations.
              </p>
              </div>
            </div>
            <div className="service-card">
              <div className="service-image-wrapper">
                <img src="https://images.unsplash.com/photo-1556740758-90de374c12ad?w=400&h=300&fit=crop&q=80" alt="e-Commerce/Websites" className="service-image" />
                <div className="service-image-overlay"></div>
              </div>
              <div className="service-card-content">
              <h3>e-Commerce/Websites</h3>
              <p>
                Custom e-commerce platforms and professional websites. Full-featured solutions with 
                payment integration, inventory management, and responsive design.
              </p>
              </div>
            </div>
            <div className="service-card">
              <div className="service-image-wrapper">
                <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop&q=80" alt="Digital Solutions" className="service-image" />
                <div className="service-image-overlay"></div>
              </div>
              <div className="service-card-content">
              <h3>Digital Solutions</h3>
              <p>
                Comprehensive digital transformation solutions. Tailored software and systems 
                that perfectly fit your business needs and drive digital innovation.
              </p>
              </div>
            </div>
            <div className="service-card">
              <div className="service-image-wrapper">
                <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop&q=80" alt="Internship" className="service-image" />
                <div className="service-image-overlay"></div>
              </div>
              <div className="service-card-content">
              <h3>Internship</h3>
              <p>
                Hands-on learning opportunities for aspiring developers. Gain real-world experience 
                working on live projects and develop skills in modern technologies.
              </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section contact-section">
        <div className="container">
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle">We'd love to hear from you. Send us a message!</p>
          <div className="contact-content">
            <div className="contact-info">
              <div className="info-item">
                <div className="info-icon">📍</div>
                <div>
                  <h4>Address</h4>
                  <p>605, Block 2,
My Home Krishe,
TNGOs Colony,
Gachibowli, Hyderabad - 500046,
Telangana, India
                  </p>
                </div>
              </div>
              <div className="info-item">
                <div className="info-icon">📧</div>
                <div>
                  <h4>Email</h4>
                  <p>hello@vectrax.in<br /></p>
                </div>
              </div>
            </div>
            <form className="contact-form" onSubmit={handleFormSubmit}>
              <div className="form-group">
                <input 
                  type="text" 
                  name="name"
                  placeholder="Your Name" 
                  value={contactForm.name}
                  onChange={handleContactInputChange}
                  required 
                />
              </div>
              <div className="form-group">
                <input 
                  type="email" 
                  name="email"
                  placeholder="Your Email" 
                  value={contactForm.email}
                  onChange={handleContactInputChange}
                  required 
                />
              </div>
              <div className="form-group">
                <input 
                  type="text" 
                  name="subject"
                  placeholder="Subject" 
                  value={contactForm.subject}
                  onChange={handleContactInputChange}
                />
              </div>
              <div className="form-group">
                <textarea 
                  name="message"
                  placeholder="Your Message" 
                  rows="6" 
                  value={contactForm.message}
                  onChange={handleContactInputChange}
                  required
                ></textarea>
              </div>
              {contactMessage.text && (
                <div className={`form-message ${contactMessage.type}`} style={{
                  padding: '12px',
                  borderRadius: '4px',
                  marginBottom: '16px',
                  backgroundColor: contactMessage.type === 'success' ? '#d4edda' : '#f8d7da',
                  color: contactMessage.type === 'success' ? '#155724' : '#721c24',
                  border: `1px solid ${contactMessage.type === 'success' ? '#c3e6cb' : '#f5c6cb'}`
                }}>
                  {contactMessage.text}
                </div>
              )}
              <button type="submit" className="btn btn-primary" disabled={contactLoading}>
                {contactLoading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>vectraX Technologies</h3>
              <p>Direction, speed, precision</p>
            </div>
            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul>
                <li><a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>Home</a></li>
                <li><a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>About Us</a></li>
                <li><a href="#services" onClick={(e) => { e.preventDefault(); scrollToSection('services'); }}>Services</a></li>
                <li><a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>Contact</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Follow Us</h4>
              <div className="social-media">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 vectraX Technologies. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
}

export default App;
