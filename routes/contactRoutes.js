const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const nodemailer = require('nodemailer');

// @route   POST /api/contact
// @desc    Submit a contact message
// @access  Public
router.post('/', async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ message: 'Please provide all fields' });
    }

    try {
        // Save to DB
        const newMessage = new Message({ name, email, message });
        await newMessage.save();

        // Optional: Send email to admin
        if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
            const transporter = nodemailer.createTransport({
                service: 'gmail', // You can change this to your email provider
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS
                }
            });

            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: process.env.RECEIVER_EMAIL || process.env.EMAIL_USER, // Send to yourself
                subject: `New Portfolio Message from ${name}`,
                text: `You have received a new message from your portfolio website.\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`
            };

            await transporter.sendMail(mailOptions);
        }

        res.status(201).json({ message: 'Message sent successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
