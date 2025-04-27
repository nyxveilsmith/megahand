
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp-relay.brevo.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_FROM,
    pass: process.env.SENDGRID_API_KEY
  },
});

interface EmailParams {
  to: string;
  from: string;
  replyTo?: string;
  subject: string;
  text?: string;
  html?: string;
}

export async function sendEmail(params: EmailParams): Promise<boolean> {
  try {
    const msg = {
      from: params.from,
      to: params.to,
      replyTo: params.replyTo || params.from,
      subject: params.subject,
      text: params.text || params.subject,
      html: params.html || `<p>${params.subject}</p>`,
    };
    
    const info = await transporter.sendMail(msg);
    console.log('Email sent: %s', info.messageId);
    return true;
  } catch (error) {
    console.error('Email sending error:', error);
    return false;
  }
}
