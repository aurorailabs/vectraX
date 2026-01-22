# EmailJS Setup Guide

This guide will help you set up EmailJS to handle contact form submissions on your Hostinger-hosted website.

## Step 1: Create EmailJS Account (Free)

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click **"Sign Up"** (it's free)
3. Create an account using your email address
4. Verify your email address

## Step 2: Add Email Service

1. After logging in, go to **"Email Services"** in the left sidebar
2. Click **"Add New Service"**
3. Choose your email provider:
   - **Gmail** (recommended - easiest)
   - **Outlook**
   - **Yahoo**
   - Or any other provider
4. Follow the instructions to connect your email account
5. **Copy the Service ID** (you'll need this later)

## Step 3: Create Email Template

1. Go to **"Email Templates"** in the left sidebar
2. Click **"Create New Template"**
3. Use this template:

```
Subject: {{subject}} - Contact Form Submission

From: {{from_name}}
Email: {{from_email}}

Message:
{{message}}
```

4. Set **"To Email"** to: `hello@vectrax.in`
5. Set **"From Name"** to: `{{from_name}}`
6. Click **"Save"**
7. **Copy the Template ID** (you'll need this later)

## Step 4: Get Your Public Key

1. Go to **"Account"** → **"General"** in the left sidebar
2. Find **"Public Key"** (also called API Key)
3. **Copy the Public Key** (you'll need this later)

## Step 5: Add Environment Variables

1. In your project root, create a file named `.env`
2. Add these lines (replace with your actual values):

```
REACT_APP_EMAILJS_SERVICE_ID=your_service_id_here
REACT_APP_EMAILJS_TEMPLATE_ID=your_template_id_here
REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key_here
```

3. Save the file

## Step 6: Test the Form

1. Run `npm start` to start your development server
2. Fill out the contact form on your website
3. Submit the form
4. Check your email inbox (`hello@vectrax.in`) for the submission

## Step 7: Deploy to Hostinger

1. Build your app: `npm run build`
2. Upload the `build` folder contents to your Hostinger hosting
3. **Important**: Create a `.env` file on Hostinger with the same values, OR
4. Update the code in `src/App.js` to use your actual keys directly (not recommended for production, but works)

## Troubleshooting

### Form not sending emails?
- Check that all three environment variables are set correctly
- Verify your EmailJS service is connected and active
- Check the browser console for any error messages
- Make sure your email service in EmailJS is verified

### Getting "Invalid API Key" error?
- Double-check your Public Key in EmailJS account settings
- Make sure there are no extra spaces in your `.env` file

### Emails going to spam?
- This is normal for automated emails. Check your spam folder
- Consider setting up SPF/DKIM records for your domain (advanced)

## Free Tier Limits

- **200 emails per month** (free tier)
- Perfect for small to medium websites
- Upgrade available if you need more

## Need Help?

- EmailJS Documentation: [https://www.emailjs.com/docs/](https://www.emailjs.com/docs/)
- EmailJS Support: Check their website for support options

