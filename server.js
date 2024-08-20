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
      to: 'epicsteamanddeepcleaning@gmail.com',
      subject: 'New Form Submission',
      text: `You have received a new message from your website form.\n\nFull Name: ${fullname}\nEmail: ${email}\nPhone: ${phone}\nZip Code: ${zipcode}\nMessage:\n${message}`,
    };
  
    console.log('Sending email with options:', mailOptions); // Debug log
  
    try {
      await transporter.sendMail(mailOptions);
      res.status(200).send('Message sent successfully!');
    } catch (error) {
      console.error('Error sending email:', error); // Log error
      res.status(500).send('Failed to send message. Please try again later.');
    }
  });
  