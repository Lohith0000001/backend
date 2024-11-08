const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
app.use(bodyParser.json());

const cors = require('cors');
// Enable CORS for all origins
app.use(cors());

// Nodemailer setup
const transporter = nodemailer.createTransport({
    service: 'gmail',  // Use your email provider
    auth: {
        user: 'purebananaindia@gmail.com',        // Your email address
        pass: 'aoqx hhjj vxkc qxhu'          // Your email password or app-specific password
    }
});

// // Route to handle order submission and email confirmation
// app.get('/', (req, res) => {
//     res.send('Server is alive');
// });


// Route to handle order submission and email confirmation
app.post('/send-order-email', (req, res) => {
    const { email, quantity, country, state, city, doorNo, address, phoneNumber } = req.body;

    const mailOptions = {
        from: 'purebananaindia@gmail.com',
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
