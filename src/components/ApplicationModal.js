import React, { useState } from 'react';
import './ApplicationModal.css';

function ApplicationModal({ onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    resume: null
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        setMessage({ type: 'error', text: 'Please upload a PDF or Word document (.pdf, .doc, .docx)' });
        return;
      }
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setMessage({ type: 'error', text: 'File size should be less than 5MB' });
        return;
      }
      setFormData({
        ...formData,
        resume: file
      });
      setMessage({ type: '', text: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      setMessage({ type: 'error', text: 'Please enter your name' });
      return;
    }

    if (!formData.resume) {
      setMessage({ type: 'error', text: 'Please upload your resume' });
      return;
    }

    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      // Create a temporary download link for the resume
      const resumeUrl = URL.createObjectURL(formData.resume);
      
      // Create a temporary anchor element to trigger download
      const downloadLink = document.createElement('a');
      downloadLink.href = resumeUrl;
      downloadLink.download = formData.resume.name;
      document.body.appendChild(downloadLink);
      
      // Prepare email details
      const toEmail = 'contactus@aurorailabs.com';
      const subject = `Job Application from ${formData.name}`;
      const body = `Hello Aurora iLabs Team,\n\nI am ${formData.name} and I would like to apply for a position at your organization.\n\nI have attached my resume for your review.\n\nThank you for considering my application.\n\nBest regards,\n${formData.name}`;

      // Encode email parameters
      const mailtoSubject = encodeURIComponent(subject);
      const mailtoBody = encodeURIComponent(body);

      // Create mailto link
      const mailtoLink = `mailto:${toEmail}?subject=${mailtoSubject}&body=${mailtoBody}`;

      // Trigger download of resume file first
      downloadLink.click();
      
      // Clean up
      document.body.removeChild(downloadLink);
      URL.revokeObjectURL(resumeUrl);

      // Small delay to ensure download starts, then open email client
      setTimeout(() => {
        window.location.href = mailtoLink;
        
        setLoading(false);
        setMessage({ 
          type: 'success', 
          text: 'Email client opened! Your resume has been downloaded. Please attach it to the email and send.' 
        });

        // Reset form after showing message
        setTimeout(() => {
          setFormData({ name: '', resume: null });
          setMessage({ type: '', text: '' });
          onClose();
        }, 5000);
      }, 500);

    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
      setMessage({ type: 'error', text: 'Failed to open email client. Please email your resume directly to contactus@aurorailabs.com' });
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        
        <div className="modal-header">
          <h2>Apply for Position</h2>
          <p>Fill in your details and upload your resume. We'll open your email client to send the application.</p>
        </div>

        <form className="application-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="resume">Upload Resume *</label>
            <div className="file-upload-wrapper">
              <input
                type="file"
                id="resume"
                name="resume"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                required
              />
              <label htmlFor="resume" className="file-upload-label">
                <span className="file-upload-icon">📄</span>
                <span className="file-upload-text">
                  {formData.resume ? formData.resume.name : 'Choose file (PDF, DOC, DOCX - Max 5MB)'}
                </span>
              </label>
            </div>
            {formData.resume && (
              <div className="file-info">
                <span className="file-name">✓ {formData.resume.name}</span>
                <span className="file-size">
                  ({(formData.resume.size / 1024).toFixed(2)} KB)
                </span>
              </div>
            )}
          </div>

          {message.text && (
            <div className={`form-message ${message.type}`}>
              {message.text}
            </div>
          )}

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Opening Email...' : 'Open Email Client'}
            </button>
          </div>
          
          <div className="form-note">
            <p>💡 <strong>Note:</strong> Your resume will be downloaded automatically. Please attach it to the email that opens.</p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ApplicationModal;

