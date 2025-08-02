require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Static assets (CSS, JS)
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Body parser middleware
app.use(express.json()); // Middleware to parse JSON
app.use(express.urlencoded({ extended: true })); // For form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MongoDB connect
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Schema and model
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  subject: String,
  message: String,
  dateSent: { type: Date, default: Date.now }
});

const Contact = mongoose.model('Contact', contactSchema);

// Email transport setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// POST /submit-contact route
app.post('/submit-contact', async (req, res) => {
  const { name, email, subject, message } = req.body;

  console.log("📥 Received form data:", req.body); // Debug log

     if (!name || !email  || !subject || !message) {
    return res.status(400).json({ success: false, message: 'some string.' });
  }    
  try {
    const newContact = new Contact({ name, email, subject, message });
    await newContact.save();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Thanks for contacting me!',
      text: `Hi ${name},\n\nThank you for your message:\n"${message}"\n\nI’ll get back to you soon!\n\nBest,\nShreyash Mate`
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true, message: '✅ Message sent successfully!' });
  } catch (err) {
    console.error("❌ Error saving/sending:", err);
    res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
  }
});

// Serve HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
