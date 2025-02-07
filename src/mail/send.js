import dotenv from "dotenv";

dotenv.config();


import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(to,subject,htmlContent) {
    await resend.emails.send({
        from: 'onboarding@resend.dev',
        to:"na_hadim@esi.dz",
        subject,
        html:htmlContent,
    });
}
