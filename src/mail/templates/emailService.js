import nodemailer from "nodemailer";


const transporter = nodemailer.createTransport({
    host: 'live.smtp.mailtrap.io',
    port: 587,
    secure: false,
    auth: {
      user: '1a2b3c4d5e6f7g',
      pass: '1a2b3c4d5e6f7g',
    }
  });

// Function to send an email
export const sendEmail = async (to, subject, htmlContent) => {
    try {
        const mailOptions = {
            from: 'ret79222@gmail.com',
            to,
            subject,
            text: htmlContent,
          };
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
    } catch (error) {
        console.error("❌ Error sending email:", error);
    }
};