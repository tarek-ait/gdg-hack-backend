import {
  projectAccepted,
  projectInvitation,
  projectRefuse,
  projectRequest,
} from '../services/projects';
import { sendEmail } from '../mail/send';

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
    const htmlContent = projectRefuse();
    await sendEmail(email, subject, htmlContent);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
