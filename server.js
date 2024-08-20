const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

// Create an Express application
const app = express();

// Middleware to parse JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define the route to handle form submissions
app.post('/send-email', async (req, res) => {
  const { fullname, email, phone, zipcode, message } = req.body;

  // Create a transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Set up email data
  let mailOptions = {
    from: email,
    to: 'epicsteamanddeepcleaning@gmail.com', // Update to your company email
    subject: 'New Form Submission',
    text: `You have received a new message from your website form.\n\nFull Name: ${fullname}\nEmail: ${email}\nPhone: ${phone}\nZip Code: ${zipcode}\nMessage:\n${message}`,
  };

  // Send email
  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send('Message sent successfully!');
  } catch (error) {
    console.error('Error sending email:', error); // Log error
    res.status(500).send('Failed to send message. Please try again later.');
  }
});

// Define the port
const PORT = process.env.PORT || 10000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
