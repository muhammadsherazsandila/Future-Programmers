const nodemailer = require('nodemailer');

// Create a transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'msd.sheraz046@gmail.com',
        pass: 'jmlzowwxnmabshup'
    }
});

// Email details
const sendNotification = async (toEmail , name , programLink) => {
    const mailOptions = {
        from: '"Future-programmers" <msd.sheraz046@gmail.com>',
        to : toEmail,
        subject : "Hello , From Future-programmers",
        html : `
        <p>${name} Uploaded A New Program!<p>
        <a href="${programLink}"> ${programLink} </a>`
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.error('Error:', error);
        }
        console.log('Email sent:', info.response);
    });

}

module.exports = sendNotification