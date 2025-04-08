import nodemailer from 'nodemailer';

// Create a transporter using Brevo SMTP settings
const transporter = nodemailer.createTransport({
  host: 'smtp-relay.brevo.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: '89d402001@smtp-brevo.com', // Brevo SMTP login
    pass: 'f1tE5qcn0xThNBd', // Brevo SMTP password
  },
});

interface EmailParams {
  to: string;
  from: string;
  subject: string;
  text?: string;
  html?: string;
}

export async function sendEmail(params: EmailParams): Promise<boolean> {
  try {
    const msg = {
      from: params.from,
      to: params.to,
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