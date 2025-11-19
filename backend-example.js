// Example Backend API Endpoint for Handling Resume Submissions
// This is a Node.js/Express example that you can use as a reference
// Install required packages: npm install express multer nodemailer

const express = require('express');
const multer = require('multer');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Configure multer for file uploads
const upload = multer({
  dest: 'uploads/',
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['application/pdf', 'application/msword', 
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF, DOC, and DOCX files are allowed.'));
    }
  }
});

// Configure nodemailer transporter
// Replace with your email service credentials
const transporter = nodemailer.createTransport({
  service: 'gmail', // or use your email service (Outlook, SendGrid, etc.)
  auth: {
    user: process.env.EMAIL_USER, // Your email
    pass: process.env.EMAIL_PASS  // Your email password or app password
  }
});

// API endpoint to handle resume submissions
app.post('/api/submit-application', upload.single('resume'), async (req, res) => {
  try {
    const { name, to_email, subject, message } = req.body;
    const resumeFile = req.file;

    if (!name || !resumeFile) {
      return res.status(400).json({ error: 'Name and resume are required' });
    }

    // Prepare email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: to_email || 'contactus@aurorailabs.com',
      subject: subject || `Job Application from ${name}`,
      text: message || `A new job application has been submitted.\n\nApplicant Name: ${name}`,
      attachments: [
        {
          filename: resumeFile.originalname,
          path: resumeFile.path
        }
      ]
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Clean up uploaded file (optional)
    // fs.unlinkSync(resumeFile.path);

    res.json({ 
      success: true, 
      message: 'Application submitted successfully!' 
    });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ 
      error: 'Failed to send application. Please try again later.' 
    });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// To use this:
// 1. Install dependencies: npm install express multer nodemailer cors
// 2. Set environment variables: EMAIL_USER, EMAIL_PASS
// 3. Update REACT_APP_API_ENDPOINT in your .env file to point to this endpoint
// 4. Run: node backend-example.js

