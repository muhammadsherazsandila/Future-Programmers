const nodemailer = require('nodemailer');
require('dotenv').config();

// Configure transporter
var transporter = nodemailer.createTransport({
    host: "live.smtp.mailtrap.io",
    port: 587,
    auth: {
        user: "api",
        pass: "a6a7bc971a742dc5452b1feb8f3a30f7"
    }
});
// Send email function
const sendVerificationEmail = async (toEmail, verificationCode) => {
    try {
        const mailOptions = {
            from: '<hello@demomailtrap.com>', // Your email
            to: toEmail,
            subject: 'Your Verification Code',
            html: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verification Code</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 5px;
            overflow: hidden;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }
        .header {
            background-color: #007bff;
            color: #ffffff;
            text-align: center;
            padding: 20px;
        }
        .header h1 {
            margin: 0;
            font-size: 22px;
        }
        .content {
            padding: 20px;
            color: #333333;
            text-align: center;
        }
        .verification-code {
            font-size: 24px;
            font-weight: bold;
            color: #007bff;
            margin: 20px 0;
        }
        .footer {
            text-align: center;
            padding: 10px;
            background-color: #f4f4f4;
            font-size: 12px;
            color: #777777;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <!-- Header -->
        <div class="header">
            <h1>Verification Code</h1>
        </div>
        <!-- Content -->
        <div class="content">
            <p>Aslam-O-Alikum,</p>
            <p>Muhammad Sheraz is Here,</p>
            <p>Your verification code is:</p>
            <div class="verification-code">${verificationCode}</div> <!-- Replace 123456 dynamically -->
            <p>Please enter this code to complete your verification process.</p>
            <p>If you didn’t request this code, you can safely ignore this email.</p>
        </div>
        <!-- Footer -->
        <div class="footer">
            <p>&copy; 2025 Future Programmers. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`,
        };

        const info = await transporter.sendMail(mailOptions);
    } catch (error) {
        console.log(error);
    }
};

// Usage
module.exports = sendVerificationEmail;
