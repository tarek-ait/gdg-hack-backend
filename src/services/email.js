import { projectAccepted } from '../mail/templates/projectAccept.js';
import { projectInvitation } from '../mail/templates/projectInvitation.js';
import { projectRequest } from '../mail/templates/projectRequest.js';
import { projectRefused } from '../mail/templates/projectRefuse.js';
import { sendEmail } from '../mail/send.js';

export const accepted = async (req, res) => {
  try {
    const { email } = req.body;
    const subject = 'Accepted';
    const htmlContent = projectAccepted();
    await sendEmail(email, subject, htmlContent);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const invitation = async (req, res) => {
  try {
    const { email } = req.body;
    const subject = 'Invitation';
    const htmlContent = projectInvitation();
    await sendEmail(email, subject, htmlContent);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const request = async (req, res) => {
  try {
    const { email } = req.body;
    const subject = 'Request';
    const htmlContent = projectRequest();
    await sendEmail(email, subject, htmlContent);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const refused = async (req, res) => {
  try {
    const { email } = req.body;
    const subject = 'Refused';
    const htmlContent = projectRefused();
    await sendEmail(email, subject, htmlContent);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
