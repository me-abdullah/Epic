const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

router.post('/send-email', async (req, res) => {
    const { fullname, email, phone, zipcode, message } = req.body;

    // Replace with your company's email and password
    let transporter = nodemailer.createTransport({
        host: 'https://epic-mp3e.onrender.com', // Replace with Render's SMTP host if needed
        port: 587,
        secure: false,
        auth: {
            user: 'epicsteamanddeepcleaning@gmail.com', // Your company email
            pass: 'campcamp12345' // Your company email password
        }
    });

    // Sending form submissions to the company email
    let mailOptions = {
        from: `"Website Contact Form" <support@epicsteamanddeepcleaning.com>`, // Sender address
        to: 'epicsteamanddeepcleaning@gmail.com', // Receiver's email address (company email)
        subject: 'New Contact Form Submission',
        text: `You have a new contact form submission:\n\nFull Name: ${fullname}\nEmail: ${email}\nPhone: ${phone}\nZip Code: ${zipcode}\nMessage: ${message}`,
        html: `<p>You have a new contact form submission:</p>
               <p><strong>Full Name:</strong> ${fullname}</p>
               <p><strong>Email:</strong> ${email}</p>
               <p><strong>Phone:</strong> ${phone}</p>
               <p><strong>Zip Code:</strong> ${zipcode}</p>
               <p><strong>Message:</strong> ${message}</p>`
    };

    try {
        let info = await transporter.sendMail(mailOptions);
        console.log('Message sent: %s', info.messageId);
        res.status(200).json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false });
    }
});

module.exports = router;
