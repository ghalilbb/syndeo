import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const TO_EMAIL = process.env.JOB_APPLICATION_EMAIL || 'your@email.com';

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
    const formData = await request.formData();
    
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const position = formData.get('position') as string;
    const experience = formData.get('experience') as string;
    const message = formData.get('message') as string;
    const resumeFile = formData.get('resume') as File;

    // Validate required fields
    if (!name || !email || !phone || !position || !resumeFile) {
      return NextResponse.json(
        { error: 'Missing required fields or CV file' },
        { status: 400 }
      );
    }

    // Convert file to buffer for attachment
    const resumeBuffer = await resumeFile.arrayBuffer();
    const resumeBytes = Buffer.from(resumeBuffer);

    const attachment = {
      filename: resumeFile.name || 'cv.pdf',
      content: resumeBytes,
      contentType: resumeFile.type || 'application/pdf',
    };

    // Send email with attachment to company
    await transporter.sendMail({
      from: `Syndeo Recruitment <${process.env.SMTP_USER}>`,
      to: TO_EMAIL,
      subject: `New Job Application: ${position}`,
      replyTo: email,
      text: `
        New job application received:

        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        Position: ${position}
        Experience: ${experience}
        
        Message:
        ${message}
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #2563eb; margin: 0;">Syndeo</h1>
            <p style="color: #6b7280; margin: 5px 0 0 0; font-size: 14px;">Infrastructure Solutions</p>
          </div>
          
          <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
            New Job Application
          </h2>
          
          <div style="background-color: #dbeafe; padding: 15px; border-left: 4px solid #2563eb; margin: 20px 0;">
            <p style="margin: 0; color: #1e40af; font-weight: bold;">Position Applied For: ${position}</p>
            <p style="margin: 5px 0 0 0; font-size: 14px; color: #3730a3;">CV attachment included in this email</p>
          </div>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin: 0 0 15px 0;">Candidate Information</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #374151; width: 120px;">Full Name:</td>
                <td style="padding: 8px 0; color: #1f2937;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #374151;">Email:</td>
                <td style="padding: 8px 0; color: #1f2937;">
                  <a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #374151;">Phone:</td>
                <td style="padding: 8px 0; color: #1f2937;">
                  <a href="tel:${phone}" style="color: #2563eb; text-decoration: none;">${phone}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #374151;">Position:</td>
                <td style="padding: 8px 0; color: #1f2937; font-weight: 600;">${position}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #374151;">Experience:</td>
                <td style="padding: 8px 0; color: #1f2937;">${experience || 'Not specified'}</td>
              </tr>
            </table>
          </div>
          
          ${message ? `
          <div style="margin: 20px 0;">
            <h3 style="color: #374151; margin-bottom: 10px;">Cover Letter / Additional Message:</h3>
            <div style="background-color: #ffffff; padding: 15px; border: 1px solid #e5e7eb; border-radius: 6px; white-space: pre-wrap; line-height: 1.6; font-size: 14px;">
${message}
            </div>
          </div>
          ` : ''}
          
          <div style="background-color: #fef3c7; padding: 15px; border-left: 4px solid #f59e0b; margin: 25px 0;">
            <p style="margin: 0; color: #92400e; font-weight: bold;">📎 CV/Resume Attached</p>
            <p style="margin: 5px 0 0 0; font-size: 14px; color: #a16207;">Please review the attached CV for detailed qualifications and experience.</p>
          </div>
          
          <div style="background-color: #f0f9ff; padding: 15px; border-radius: 6px; margin: 25px 0;">
            <h4 style="margin: 0 0 10px 0; color: #0369a1;">Next Steps:</h4>
            <ul style="margin: 0; padding-left: 20px; color: #0c4a6e; font-size: 14px; line-height: 1.5;">
              <li>Review the candidate's CV and application</li>
              <li>Schedule initial screening if qualified</li>
              <li>Update candidate status in recruitment system</li>
              <li>Respond within 5-7 business days as committed</li>
            </ul>
          </div>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
          <p style="font-size: 12px; color: #6b7280;">
            This application was submitted through the Syndeo careers page. 
            You can reply directly to this email to contact the candidate.
          </p>
        </div>
      `,
      attachments: [attachment],
    });

    // Send confirmation email to candidate
    await transporter.sendMail({
      from: `Syndeo HR Team <${process.env.SMTP_USER}>`,
      to: email,
      subject: `Application Received - ${position} Position at Syndeo`,
      text: `
        Dear ${name},

        Thank you for your interest in the ${position} position at Syndeo Infrastructure Solutions.

        We have successfully received your application and CV. Our recruitment team will review your qualifications and experience carefully.

        What happens next:
        - Our HR team will review your application within 5-7 business days
        - If your profile matches our requirements, we will contact you to schedule an interview
        - We will keep you updated on the status of your application throughout the process

        If you have any questions about this position or the application process, please don't hesitate to contact us.

        Best regards,
        Syndeo HR Team
        Syndeo Infrastructure Solutions
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #2563eb; margin: 0;">Syndeo</h1>
            <p style="color: #6b7280; margin: 5px 0 0 0; font-size: 14px;">Infrastructure Solutions</p>
          </div>
          
          <div style="background-color: #dcfce7; padding: 20px; border-left: 4px solid #16a34a; margin: 20px 0; border-radius: 0 6px 6px 0;">
            <h2 style="color: #166534; margin: 0 0 10px 0;">✅ Application Received Successfully</h2>
            <p style="margin: 0; color: #15803d;">Thank you for applying to the <strong>${position}</strong> position</p>
          </div>
          
          <p style="line-height: 1.6; color: #374151;">Dear <strong>${name}</strong>,</p>
          
          <p style="line-height: 1.6; color: #374151;">
            Thank you for your interest in the <strong style="color: #2563eb;">${position}</strong> position at Syndeo Infrastructure Solutions.
          </p>
          
          <p style="line-height: 1.6; color: #374151;">
            We have successfully received your application and CV. Our recruitment team will review your qualifications and experience carefully.
          </p>
          
          <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin: 25px 0;">
            <h3 style="color: #0369a1; margin: 0 0 15px 0;">What happens next:</h3>
            <ul style="margin: 0; padding-left: 20px; color: #0c4a6e; line-height: 1.8;">
              <li>Our HR team will review your application within <strong>5-7 business days</strong></li>
              <li>If your profile matches our requirements, we will contact you to schedule an interview</li>
              <li>We will keep you updated on the status of your application throughout the process</li>
            </ul>
          </div>
          
          <div style="background-color: #fefce8; padding: 15px; border-left: 4px solid #eab308; margin: 25px 0; border-radius: 0 6px 6px 0;">
            <p style="margin: 0; color: #a16207;">
              <strong>💡 Next Steps:</strong> Keep an eye on your email for updates. We typically respond within 5-7 business days with next steps.
            </p>
          </div>
          
          <p style="line-height: 1.6; color: #374151;">
            If you have any questions about this position or the application process, please don't hesitate to contact us.
          </p>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 25px 0; border-top: 3px solid #2563eb;">
            <p style="margin: 0 0 10px 0; color: #374151;">Best regards,</p>
            <p style="margin: 0; color: #2563eb; font-weight: bold;">Syndeo HR Team</p>
            <p style="margin: 5px 0 0 0; color: #6b7280; font-size: 14px;">Syndeo Infrastructure Solutions</p>
          </div>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
          <p style="font-size: 12px; color: #6b7280; text-align: center;">
            This is an automated confirmation email. Please do not reply to this email directly.<br>
            For questions, please use our contact form or call our office.
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Email sending error:', error);
    return NextResponse.json(
      { error: 'Failed to send email', details: error },
      { status: 500 }
    );
  }
}
