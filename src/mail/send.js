import dotenv from 'dotenv';

dotenv.config();

import nodemailer from 'nodemailer';

var transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

export async function sendEmail(to, subject, htmlContent) {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL,
      to,
      subject,
      html: htmlContent,
    });
    console.log('Email sent successfully');
  } catch (error) {
    console.error(error);
  }
}
