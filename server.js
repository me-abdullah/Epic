const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/send-email', async (req, res) => {
  const { fullname, email, phone, zipcode, message } = req.body;

  let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  let mailOptions = {
    from: email,
    to: 'epicsteamanddeepcleaning@gmail.com', // Update to your company email
    subject: 'New Form Submission',
    text: `You have received a new message from your website form.\n\nFull Name: ${fullname}\nEmail: ${email}\nPhone: ${phone}\nZip Code: ${zipcode}\nMessage:\n${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send('Message sent successfully!');
  } catch (error) {
    res.status(500).send('Failed to send message. Please try again later.');
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

