import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const TO_EMAIL = process.env.CONTACT_EMAIL || 'info@syndeoinfra.nl';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT) || 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json();

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Send email to company
    await transporter.sendMail({
      from: `Syndeo Contact Form <${process.env.SMTP_USER}>`,
      to: TO_EMAIL,
      subject: `Contact Form: ${subject}`,
      replyTo: email,
      text: `
        New contact form submission:

        Name: ${name}
        Email: ${email}
        Subject: ${subject}
        
        Message:
        ${message}
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
          <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #374151; width: 80px;">Name:</td>
                <td style="padding: 8px 0; color: #1f2937;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #374151;">Email:</td>
                <td style="padding: 8px 0; color: #1f2937;">
                  <a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #374151;">Subject:</td>
                <td style="padding: 8px 0; color: #1f2937;">${subject}</td>
              </tr>
            </table>
          </div>
          
          <div style="margin: 20px 0;">
            <h3 style="color: #374151; margin-bottom: 10px;">Message:</h3>
            <div style="background-color: #ffffff; padding: 15px; border: 1px solid #e5e7eb; border-radius: 6px; white-space: pre-wrap; line-height: 1.6;">
${message}
            </div>
          </div>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
          <p style="font-size: 12px; color: #6b7280;">
            This email was sent from the Syndeo website contact form. 
            You can reply directly to this email to respond to ${name}.
          </p>
        </div>
      `,
    });

    // Send confirmation email to the person who contacted
    await transporter.sendMail({
      from: `Syndeo <${process.env.SMTP_USER}>`,
      to: email,
      subject: 'Thank you for contacting Syndeo',
      text: `
        Dear ${name},

        Thank you for reaching out to Syndeo. We have received your message regarding "${subject}" and appreciate you taking the time to contact us.

        Our team will review your inquiry and respond within 1-2 business days. If your matter is urgent, please feel free to call us directly at +31 (0)20 123 4567.

        Here's a copy of your message for your records:
        
        Subject: ${subject}
        Message: ${message}

        We look forward to assisting you.

        Best regards,
        The Syndeo Team

        ---
        Syndeo Infrastructure Solutions
        Email: info@syndeoinfra.nl
        Phone: +31 (0)20 123 4567
        Web: www.syndeoinfra.nl
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #2563eb; margin: 0;">Syndeo</h1>
            <p style="color: #6b7280; margin: 5px 0 0 0; font-size: 14px;">Infrastructure Solutions</p>
          </div>
          
          <h2 style="color: #1f2937;">Thank you for contacting us!</h2>
          
          <p>Dear <strong>${name}</strong>,</p>
          
          <p>Thank you for reaching out to Syndeo. We have received your message regarding <strong>"${subject}"</strong> and appreciate you taking the time to contact us.</p>
          
          <div style="background-color: #dbeafe; padding: 15px; border-left: 4px solid #2563eb; margin: 20px 0;">
            <p style="margin: 0; color: #1e40af;"><strong>✓ Message Received</strong></p>
            <p style="margin: 5px 0 0 0; font-size: 14px; color: #3730a3;">Our team will review your inquiry and respond within 1-2 business days.</p>
          </div>
          
          <p>If your matter is urgent, please feel free to call us directly at <a href="tel:+31201234567" style="color: #2563eb; text-decoration: none;"><strong>+31 (0)20 123 4567</strong></a>.</p>
          
          <div style="background-color: #f9fafb; padding: 15px; border-radius: 6px; margin: 25px 0;">
            <h3 style="margin: 0 0 10px 0; color: #374151; font-size: 16px;">Your Message Summary:</h3>
            <p style="margin: 5px 0; color: #6b7280;"><strong>Subject:</strong> ${subject}</p>
            <p style="margin: 10px 0 0 0; color: #6b7280;"><strong>Message:</strong></p>
            <div style="background-color: #ffffff; padding: 10px; border: 1px solid #e5e7eb; border-radius: 4px; margin-top: 5px; white-space: pre-wrap; font-size: 14px; line-height: 1.5;">
${message}
            </div>
          </div>
          
          <p>We look forward to assisting you.</p>
          
          <p style="margin-top: 30px;">
            Best regards,<br>
            <strong>The Syndeo Team</strong>
          </p>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
          <div style="text-align: center; color: #6b7280; font-size: 12px;">
            <p style="margin: 5px 0;"><strong>Syndeo Infrastructure Solutions</strong></p>
            <p style="margin: 5px 0;">
              Email: <a href="mailto:info@syndeoinfra.nl" style="color: #2563eb;">info@syndeoinfra.nl</a> | 
              Phone: <a href="tel:+31201234567" style="color: #2563eb;">+31 (0)20 123 4567</a>
            </p>
            <p style="margin: 5px 0;">Web: <a href="https://www.syndeoinfra.nl" style="color: #2563eb;">www.syndeoinfra.nl</a></p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Contact form email error:', error);
    return NextResponse.json(
      { error: 'Failed to send message', details: error },
      { status: 500 }
    );
  }
}
