require('dotenv').config();  // Import dotenv to use environment variables

const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
app.use(bodyParser.json());

const cors = require('cors');
// Enable CORS for all origins
app.use(cors());
console.log(process.env.email);  // Check if this logs the correct email address
console.log(process.env.password); // Check if this logs the correct password

// Nodemailer setup using environment variables
const transporter = nodemailer.createTransport({
    service: 'gmail',  // Use your email provider
    auth: {
        user: process.env.email,        // Get email address from environment variable
        pass: process.env.password         // Get email password from environment variable
    }
});

// Route to handle order submission and email confirmation
app.post('/send-order-email', (req, res) => {
    const { email, quantity, country, state, city, doorNo, address, phoneNumber } = req.body;

    const mailOptions = {
        from: process.env.email,  // Use email address from environment variable
        to: email,
        subject: 'Your Order Confirmation from Pure Banana India',
        text: `
        Thank you for your order of Banana Powder!
        
        Order Details:
        - Quantity: ${quantity}
        - Address: ${doorNo}, ${address}, ${city}, ${state}, ${country}
        - Phone Number: ${phoneNumber}
        
        Your order will be processed and delivered soon!
        `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            res.json({ success: false, message: 'Error sending email' });
        } else {
            console.log('Email sent:', info.response);
            res.json({ success: true, message: 'Order confirmation email sent' });
        }
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
