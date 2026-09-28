// lib/email.js
import nodemailer from 'nodemailer';
import { StudentCertificate } from "@/lib/data";

interface EnrollmentData {
  name: string;
  email: string;
  courseName: string;
  phone: string;
  paymentScreenshot?: string;
}

interface SupportEmailData {
  name: string;
  budget?:string;
  timeline?:string;
  email?: string; // Agar use ho raha hai
  priority: 'low' | 'normal' | 'high' | 'urgent';
  subject?: string;
  company: string;
  message: string;
  responseTime: string;
  partnershipType:string
  courseName : string
  website:string
}

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendEmail({ to, subject, html }:EmailOptions) {
  try {
    await transporter.sendMail({
      from: `"CodEarnTech" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
    });
    return { success: true };
  } catch (error) {
    console.error('Email sending failed:', error);
    return { success: false, error };
  }
}

// ============== USER EMAIL TEMPLATES ==============

export function generateSupportConfirmationEmail(data : SupportEmailData) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3b82f6; }
        .detail-row { padding: 8px 0; border-bottom: 1px solid #eee; }
        .detail-row:last-child { border-bottom: none; }
        .priority-badge { display: inline-block; padding: 5px 15px; border-radius: 20px; font-size: 12px; font-weight: bold; text-transform: uppercase; }
        .priority-low { background: #10b981; color: white; }
        .priority-normal { background: #3b82f6; color: white; }
        .priority-high { background: #f59e0b; color: white; }
        .priority-urgent { background: #dc2626; color: white; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
        .response-time { background: #dbeafe; padding: 15px; border-radius: 8px; margin: 20px 0; text-align: center; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎧 Support Request Received!</h1>
          <p>We're on it, ${data.name}</p>
        </div>
        <div class="content">
          <p>Hi <strong>${data.name}</strong>,</p>
          <p>Thank you for contacting CodEarnTech Support. We've received your request and our team is already looking into it.</p>
          
          <div class="response-time">
            <strong>⏱️ Expected Response Time: ${data.responseTime}</strong>
          </div>

          <div class="details">
            <h3>Your Request Details</h3>
            <div class="detail-row">
              <strong>Request ID:</strong> #SUP-${Date.now().toString(36).toUpperCase()}
            </div>
            <div class="detail-row">
              <strong>Priority:</strong> 
              <span class="priority-badge priority-${data.priority}">${data.priority}</span>
            </div>
            <div class="detail-row">
              <strong>Subject:</strong> ${data.subject || 'N/A'}
            </div>
            <div class="detail-row">
              <strong>Company:</strong> ${data.company}
            </div>
            <div class="detail-row">
              <strong>Submitted:</strong> ${new Date().toLocaleString()}
            </div>
          </div>

          <div class="details">
            <h3>Your Message</h3>
            <p style="background: #f3f4f6; padding: 15px; border-radius: 5px; font-style: italic;">
              "${data.message}"
            </p>
          </div>

          <p><strong>What's Next?</strong></p>
          <ul>
            <li>Our support team will review your request</li>
            <li>You'll receive a response within ${data.responseTime}</li>
            <li>For urgent issues, call our hotline: +923219515138</li>
          </ul>

          <p style="margin-top: 20px;">Need immediate help? Reply to this email or contact us at <a href="mailto:support@CodEarnTech.com">support@CodEarnTech.com</a></p>
        </div>
        <div class="footer">
          <p>© 2024 CodEarnTech. All rights reserved.</p>
          <p>This is an automated email, please do not reply directly.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}


export function generateAdminNotificationEmail(data: EnrollmentData) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e1e1e1; border-radius: 10px; }
        .header { background: #1e293b; color: #ffffff; padding: 25px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { padding: 30px; background: #ffffff; }
        .stat-card { background: #f8fafc; border-left: 4px solid #3b82f6; padding: 15px; margin: 20px 0; }
        .info-row { margin-bottom: 10px; border-bottom: 1px solid #f1f5f9; padding-bottom: 5px; }
        .label { font-weight: bold; color: #64748b; width: 120px; display: inline-block; }
        .value { color: #0f172a; }
        .footer { text-align: center; font-size: 12px; color: #94a3b8; margin-top: 20px; }
        .btn { display: inline-block; padding: 10px 20px; background: #3b82f6; color: white; text-decoration: none; border-radius: 5px; margin-top: 15px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2> New Enrollment Alert!</h2>
          <p>CodEarn Learning Portal</p>
        </div>
        <div class="content">
          <p>Hello Admin,</p>
          <p>A new student has just submitted an enrollment request. Here are the details:</p>
          
          <div class="stat-card">
            <div class="info-row">
              <span class="label">Student Name:</span>
              <span class="value">${data.name}</span>
            </div>
            <div class="info-row">
              <span class="label">Course:</span>
              <span class="value">${data.courseName}</span>
            </div>
            <div class="info-row">
              <span class="label">Email:</span>
              <span class="value">${data.email}</span>
            </div>
            <div class="info-row">
              <span class="label">Phone:</span>
              <span class="value">${data.phone}</span>
            </div>
          </div>

          <h3>Payment Verification</h3>
          <p>The student has uploaded their payment proof. Please review it in the admin dashboard to approve the enrollment.</p>
          
          <a href="https://codearntech.com/student/dashboard" class="btn">View in Dashboard</a>
        </div>
        <div class="footer">
          <p>© ${new Date().getFullYear()} CodEarn Admin System</p>
          <p>System Generated Notification</p>
        </div>
      </div>
    </body>
    </html>
  `;
}


export function generateStudentEnrollmentEmail(data: SupportEmailData) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #1a202c; margin: 0; padding: 0; }
        .wrapper { background-color: #f4f7fa; padding: 40px 10px; }
        .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
        .header { background: linear-gradient(135deg, #00c6ff 0%, #0072ff 100%); color: white; padding: 40px 20px; text-align: center; }
        .content { padding: 30px; }
        .course-box { background: #ebf8ff; border: 1px solid #bee3f8; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center; }
        .course-name { font-size: 20px; font-weight: bold; color: #2b6cb0; margin: 5px 0; }
        .status-badge { display: inline-block; padding: 6px 16px; background: #feebc8; color: #975a16; border-radius: 20px; font-size: 14px; font-weight: bold; margin-top: 10px; }
        .steps { margin-top: 25px; padding-left: 0; list-style: none; }
        .step-item { display: flex; align-items: flex-start; margin-bottom: 15px; }
        .step-num { background: #3182ce; color: white; width: 24px; height: 24px; border-radius: 50%; text-align: center; line-height: 24px; margin-right: 12px; flex-shrink: 0; font-size: 12px; }
        .footer { text-align: center; padding: 25px; background: #f8fafc; color: #718096; font-size: 13px; }
        .social-link { color: #3182ce; text-decoration: none; font-weight: bold; }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <div class="container">
          <div class="header">
            <h1 style="margin:0;">Welcome to CodEarn! 🎓</h1>
            <p style="opacity: 0.9;">Your journey to becoming a pro starts here.</p>
          </div>
          <div class="content">
            <p>Hi <strong>${data.name}</strong>,</p>
            <p>Great news! We have received your enrollment application. Our team is now verifying your payment details.</p>
            
            <div class="course-box">
              <p style="margin:0; color: #4a5568; text-transform: uppercase; font-size: 12px; letter-spacing: 1px;">Enrolled Course</p>
              <div class="course-name">${data.courseName}</div>
              <span class="status-badge">Verification in Progress</span>
            </div>

            <h3>What happens next?</h3>
            <div class="steps">
              <div class="step-item">
                <div class="step-num">1</div>
                <div><strong>Payment Check:</strong> We'll verify your screenshot within 12-24 hours.</div>
              </div>
              <div class="step-item">
                <div class="step-num">2</div>
                <div><strong>Access Grant:</strong> Once verified, you'll get an email with dashboard login details.</div>
              </div>
              <div class="step-item">
                <div class="step-num">3</div>
                <div><strong>Community:</strong> You'll be added to our private Discord/WhatsApp group.</div>
              </div>
            </div>

            <p style="margin-top: 30px;">If you have any questions, feel free to contact us at <a href="mailto:support@codearntech.com" class="social-link">support@codearntech.com</a>.</p>
          </div>
          <div class="footer">
            <p>Stay Connected with <strong>CodEarn</strong></p>
            <p>© ${new Date().getFullYear()} Samundri, Pakistan. All rights reserved.</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}


export function generateSalesConfirmationEmail(data : SupportEmailData) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #10b981; }
        .detail-row { padding: 8px 0; border-bottom: 1px solid #eee; }
        .badge { display: inline-block; padding: 5px 15px; background: #10b981; color: white; border-radius: 20px; font-size: 12px; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
        .highlight { background: #d1fae5; padding: 15px; border-radius: 8px; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>💼 Inquiry Received!</h1>
          <p>Let's build something great together</p>
        </div>
        <div class="content">
          <p>Hi <strong>${data.name}</strong>,</p>
          <p>Thank you for your interest in CodEarnTech! Our sales team has received your inquiry and will reach out to you soon.</p>
          
          <div class="highlight">
            <strong>🎯 What happens next?</strong><br>
            A solutions expert will contact you within <strong>24 hours</strong> to discuss your requirements.
          </div>

          <div class="details">
            <h3>Inquiry Summary</h3>
            <div class="detail-row">
              <strong>Inquiry ID:</strong> #SAL-${Date.now().toString(36).toUpperCase()}
            </div>
            <div class="detail-row">
              <strong>Company:</strong> ${data.company}
            </div>
            <div class="detail-row">
              <strong>Subject:</strong> ${data.subject || 'Sales Inquiry'}
            </div>
            ${data.budget ? `<div class="detail-row"><strong>Budget Range:</strong> ${data.budget}</div>` : ''}
            ${data.timeline ? `<div class="detail-row"><strong>Timeline:</strong> ${data.timeline}</div>` : ''}
          </div>

          <div class="details">
            <h3>Your Requirements</h3>
            <p style="background: #f3f4f6; padding: 15px; border-radius: 5px; font-style: italic;">
              "${data.message}"
            </p>
          </div>

          <p><strong>While you wait:</strong></p>
          <ul>
            <li>📊 <a href="#">View our pricing plans</a></li>
            <li>🎥 <a href="#">Watch product demo</a></li>
            <li>📚 <a href="#">Read customer case studies</a></li>
          </ul>

          <p style="margin-top: 20px;">Questions? Reply to this email or call us at +923219515138</p>
        </div>
        <div class="footer">
          <p>© 2024 CodEarnTech. All rights reserved.</p>
          <p>Building the future of ISP management.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export function generatePartnershipConfirmationEmail(data : SupportEmailData) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #8b5cf6; }
        .detail-row { padding: 8px 0; border-bottom: 1px solid #eee; }
        .badge { display: inline-block; padding: 5px 15px; background: #8b5cf6; color: white; border-radius: 20px; font-size: 12px; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
        .partnership-types { background: #ede9fe; padding: 15px; border-radius: 8px; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🤝 Partnership Request Received!</h1>
          <p>Exciting opportunities ahead</p>
        </div>
        <div class="content">
          <p>Hi <strong>${data.name}</strong>,</p>
          <p>Thank you for your interest in partnering with CodEarnTech! Our partnership team has received your request and will review it shortly.</p>
          
          <div class="partnership-types">
            <strong>🚀 Partnership Opportunities:</strong>
            <ul style="margin: 10px 0; padding-left: 20px;">
              <li>API Partnerships</li>
              <li>Reseller Programs</li>
              <li>Technology Alliances</li>
              <li>Co-marketing Initiatives</li>
            </ul>
          </div>

          <div class="details">
            <h3>Request Details</h3>
            <div class="detail-row">
              <strong>Request ID:</strong> #PRT-${Date.now().toString(36).toUpperCase()}
            </div>
            <div class="detail-row">
              <strong>Company:</strong> ${data.company}
            </div>
            ${data.partnershipType ? `<div class="detail-row"><strong>Interest:</strong> <span class="badge">${data.partnershipType}</span></div>` : ''}
            ${data.website ? `<div class="detail-row"><strong>Website:</strong> <a href="${data.website}" target="_blank">${data.website}</a></div>` : ''}
          </div>

          <div class="details">
            <h3>Your Proposal</h3>
            <p style="background: #f3f4f6; padding: 15px; border-radius: 5px; font-style: italic;">
              "${data.message}"
            </p>
          </div>

          <p><strong>Next Steps:</strong></p>
          <ul>
            <li>Our partnership team will review your proposal within 48 hours</li>
            <li>We'll schedule a discovery call to explore synergies</li>
            <li>Custom partnership terms will be discussed</li>
          </ul>

          <p style="margin-top: 20px;">Excited to collaborate! Reply to this email for any questions.</p>
        </div>
        <div class="footer">
          <p>© 2024 CodEarnTech. All rights reserved.</p>
          <p>Building partnerships that matter.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

// ============== ADMIN EMAIL TEMPLATES ==============

export function generateAdminSupportNotification(data : SupportEmailData) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #dc2626; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
        .alert { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .detail-row { padding: 10px 0; border-bottom: 1px solid #eee; }
        .priority-urgent { color: #dc2626; font-weight: bold; }
        .priority-high { color: #f59e0b; font-weight: bold; }
        .button { display: inline-block; padding: 12px 30px; background: #dc2626; color: white; text-decoration: none; border-radius: 5px; margin-top: 20px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🚨 New Support Request!</h1>
          <p>Action Required</p>
        </div>
        <div class="content">
          <div class="alert">
            <strong>Priority:</strong> <span class="priority-${data.priority}">${data.priority.toUpperCase()}</span>
          </div>
          
          <div class="details">
            <h3>Customer Information</h3>
            <div class="detail-row"><strong>Name:</strong> ${data.name}</div>
            <div class="detail-row"><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></div>
            <div class="detail-row"><strong>Company:</strong> ${data.company}</div>
            <div class="detail-row"><strong>Submitted:</strong> ${new Date().toLocaleString()}</div>
          </div>

          <div class="details">
            <h3>Request Details</h3>
            <div class="detail-row"><strong>Subject:</strong> ${data.subject || 'N/A'}</div>
            <div class="detail-row"><strong>Priority:</strong> ${data.priority}</div>
          </div>

          <div class="details">
            <h3>Message</h3>
            <p style="background: #f3f4f6; padding: 15px; border-radius: 5px;">
              ${data.message}
            </p>
          </div>

          <center>
            <a href="mailto:${data.email}?subject=Re: ${data.subject || 'Support Request'}" class="button">
              Reply to Customer
            </a>
          </center>
        </div>
      </div>
    </body>
    </html>
  `;
}



export function generateEnrollmentConfirmationEmail(data: { name: string; courseName: string; amount: string }) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 20px auto; border: 1px solid #e1e1e1; border-radius: 10px; overflow: hidden; }
        .header { background: #059669; color: white; padding: 30px; text-align: center; }
        .content { padding: 30px; background: #ffffff; }
        .success-badge { display: inline-block; background: #ecfdf5; color: #059669; padding: 8px 20px; border-radius: 20px; font-weight: bold; margin-bottom: 20px; }
        .course-card { background: #f9fafb; border: 1px solid #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .footer { background: #f3f4f6; padding: 20px; text-align: center; font-size: 12px; color: #6b7280; }
        .button { display: inline-block; padding: 12px 30px; background: #059669; color: white !important; text-decoration: none; border-radius: 6px; font-weight: bold; margin-top: 20px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 style="margin:0;">🎉 Enrollment Confirmed!</h1>
        </div>
        <div class="content">
          <center><div class="success-badge">Payment Verified Successfully</div></center>
          <p>Assalam-o-Alaikum <strong>${data.name}</strong>,</p>
          <p>Congratulations! Your enrollment in <strong>${data.courseName}</strong> has been officially confirmed. We have received your payment of <strong>${data.amount}</strong>.</p>
          
          <div class="course-card">
            <h3 style="margin-top:0; color: #059669;">Course Details:</h3>
            <p style="margin: 5px 0;"><strong>Course:</strong> ${data.courseName}</p>
            <p style="margin: 5px 0;"><strong>Status:</strong> Active / Enrolled</p>
            <p style="margin: 5px 0;"><strong>Access:</strong> Full Lifetime Access</p>
          </div>

          <p>You can now access your dashboard to start learning and join our community of 5,000+ developers.</p>
          
          <center>
            <a href="https://www.codearntech.com" class="button">Go to Dashboard</a>
          </center>
        </div>
        <div class="footer">
          <p>© ${new Date().getFullYear()} CodEarn Pakistan. All rights reserved.</p>
          <p>Samundri, Faisalabad, Pakistan</p>
        </div>
      </div>
    </body>
    </html>
  `;
}




export function generatePaymentRejectionEmail(data: { name: string; courseName: string; reason?: string }) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 20px auto; border: 1px solid #fecaca; border-radius: 10px; overflow: hidden; }
        .header { background: #dc2626; color: white; padding: 30px; text-align: center; }
        .content { padding: 30px; background: #ffffff; }
        .error-box { background: #fff1f2; border-left: 4px solid #dc2626; padding: 20px; margin: 20px 0; border-radius: 4px; }
        .footer { background: #f3f4f6; padding: 20px; text-align: center; font-size: 12px; color: #6b7280; }
        .button { display: inline-block; padding: 12px 30px; background: #dc2626; color: white !important; text-decoration: none; border-radius: 6px; font-weight: bold; margin-top: 20px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 style="margin:0;">⚠️ Payment Update</h1>
        </div>
        <div class="content">
          <p>Dear <strong>${data.name}</strong>,</p>
          <p>We are writing to inform you that your recent payment for <strong>${data.courseName}</strong> could not be verified by our finance department.</p>
          
          <div class="error-box">
            <h3 style="margin-top:0; color: #dc2626;">Reason for Rejection:</h3>
            <p style="margin: 0;">${data.reason || "The provided payment proof was unclear or the transaction ID did not match our records."}</p>
          </div>

          <p>Don't worry, you can re-submit your payment proof by visiting your enrollment status page. Please ensure the screenshot is clear and the Transaction ID is visible.</p>
          
          <center>
            <a href="https://www.codearntech.com" class="button">Re-submit Payment</a>
          </center>
          
          <p style="margin-top:30px; font-size: 0.9em; color: #666;">
            If you believe this is a mistake, please reply to this email or contact our support team immediately.
          </p>
        </div>
        <div class="footer">
          <p>© ${new Date().getFullYear()} CodEarn Pakistan. All rights reserved.</p>
          <p>Support: support@codearntech.com</p>
        </div>
      </div>
    </body>
    </html>
  `;
}





export function generateAdminSalesNotification(data : SupportEmailData) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #059669; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
        .alert { background: #d1fae5; border-left: 4px solid #10b981; padding: 15px; margin: 20px 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .detail-row { padding: 10px 0; border-bottom: 1px solid #eee; }
        .button { display: inline-block; padding: 12px 30px; background: #059669; color: white; text-decoration: none; border-radius: 5px; margin-top: 20px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>💰 New Sales Lead!</h1>
          <p>Hot prospect alert</p>
        </div>
        <div class="content">
          <div class="alert">
            <strong>Lead Score:</strong> HIGH - New Inquiry Received
          </div>
          
          <div class="details">
            <h3>Prospect Information</h3>
            <div class="detail-row"><strong>Name:</strong> ${data.name}</div>
            <div class="detail-row"><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></div>
            <div class="detail-row"><strong>Company:</strong> ${data.company}</div>
            <div class="detail-row"><strong>Submitted:</strong> ${new Date().toLocaleString()}</div>
          </div>

          <div class="details">
            <h3>Requirements</h3>
            ${data.budget ? `<div class="detail-row"><strong>Budget:</strong> ${data.budget}</div>` : ''}
            ${data.timeline ? `<div class="detail-row"><strong>Timeline:</strong> ${data.timeline}</div>` : ''}
            <div class="detail-row"><strong>Subject:</strong> ${data.subject || 'N/A'}</div>
          </div>

          <div class="details">
            <h3>Message</h3>
            <p style="background: #f3f4f6; padding: 15px; border-radius: 5px;">
              ${data.message}
            </p>
          </div>

          <center>
            <a href="mailto:${data.email}?subject=Re: ${data.subject || 'Sales Inquiry'}" class="button">
              Contact Prospect
            </a>
          </center>
        </div>
      </div>
    </body>
    </html>
  `;
}

export function generateAdminPartnershipNotification(data : SupportEmailData) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #7c3aed; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
        .alert { background: #ede9fe; border-left: 4px solid #8b5cf6; padding: 15px; margin: 20px 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .detail-row { padding: 10px 0; border-bottom: 1px solid #eee; }
        .button { display: inline-block; padding: 12px 30px; background: #7c3aed; color: white; text-decoration: none; border-radius: 5px; margin-top: 20px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🤝 New Partnership Request!</h1>
          <p>Strategic opportunity</p>
        </div>
        <div class="content">
          <div class="alert">
            <strong>Type:</strong> ${data.partnershipType || 'General Partnership'}
          </div>
          
          <div class="details">
            <h3>Partner Information</h3>
            <div class="detail-row"><strong>Name:</strong> ${data.name}</div>
            <div class="detail-row"><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></div>
            <div class="detail-row"><strong>Company:</strong> ${data.company}</div>
            ${data.website ? `<div class="detail-row"><strong>Website:</strong> <a href="${data.website}" target="_blank">${data.website}</a></div>` : ''}
            <div class="detail-row"><strong>Submitted:</strong> ${new Date().toLocaleString()}</div>
          </div>

          <div class="details">
            <h3>Partnership Details</h3>
            <div class="detail-row"><strong>Type:</strong> ${data.partnershipType || 'Not specified'}</div>
            <div class="detail-row"><strong>Subject:</strong> ${data.subject || 'N/A'}</div>
          </div>

          <div class="details">
            <h3>Proposal</h3>
            <p style="background: #f3f4f6; padding: 15px; border-radius: 5px;">
              ${data.message}
            </p>
          </div>

          <center>
            <a href="mailto:${data.email}?subject=Re: Partnership Request" class="button">
              Review Proposal
            </a>
          </center>
        </div>
      </div>
    </body>
    </html>
  `;
}


export function getWelcomeEmailTemplate(email: string, unsubscribeToken: string) {
  const unsubscribeUrl = `${process.env.NEXT_PUBLIC_APP_URL}/unsubscribe?token=${unsubscribeToken}`;
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #007bff; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
        .button { display: inline-block; padding: 12px 24px; background: #007bff; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
        .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; text-align: center; }
        .unsubscribe { color: #666; text-decoration: underline; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Welcome to Our Newsletter!</h1>
        </div>
        <div class="content">
          <h2>Thank you for subscribing to CodEarn!</h2>
          <p>Hi there,</p>
          <p>We're excited to have you on board. You'll now receive the latest updates, news, and exclusive content directly in your inbox.</p>
          <p>If you have any questions, feel free to reply to this email.</p>
          <div class="footer">
            <p>You're receiving this because you subscribed to our newsletter.</p>
            <p><a href="${unsubscribeUrl}" class="unsubscribe">Unsubscribe</a> | © ${new Date().getFullYear()} CodEarn</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}

export function getNewsletterTemplate(content: string, unsubscribeToken: string) {
  const unsubscribeUrl = `${process.env.NEXT_PUBLIC_APP_URL}/unsubscribe?token=${unsubscribeToken}`;
  
  // Auto-formatting logic: Paragraphs ko break karke clean spacing dena
  const formattedContent = content
    .split('\n')
    .filter(para => para.trim() !== '')
    .map(para => `<p style="margin-bottom: 20px; line-height: 1.8;">${para.trim()}</p>`)
    .join('');

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body { font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f7f9; color: #1a1a1a; }
        .wrapper { width: 100%; background-color: #f4f7f9; padding: 40px 0; }
        .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
        .header { background: #0f172a; color: #ffffff; padding: 40px 20px; text-align: center; }
        .header h1 { margin: 0; font-size: 24px; letter-spacing: -0.5px; font-weight: 700; }
        .content { padding: 40px 30px; font-size: 16px; color: #334155; }
        .content p { margin: 0 0 20px 0; }
        .cta-box { margin-top: 30px; padding: 20px; background: #f8fafc; border-radius: 8px; text-align: center; border: 1px solid #e2e8f0; }
        .footer { padding: 30px; text-align: center; font-size: 13px; color: #64748b; line-height: 1.5; }
        .unsubscribe { color: #6366f1; text-decoration: none; font-weight: 500; }
        .logo-text { color: #6366f1; font-weight: 800; }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <div class="container">
          <div class="header">
            <h1><span class="logo-text">CodEarn</span> Tech</h1>
            <p style="margin-top: 10px; opacity: 0.8; font-size: 14px;">Building the future of developers</p>
          </div>
          <div class="content">
            <!-- Automatically Formatted Paragraphs -->
            ${formattedContent}
            
            <div class="cta-box">
              <p style="margin-bottom: 10px; font-weight: 600;">Ready to take the next step?</p>
              <a href="${process.env.NEXT_PUBLIC_APP_URL}/courses" 
                 style="background: #6366f1; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: 600;">
                 View New Courses
              </a>
            </div>
          </div>
          <div class="footer">
            <p>Sent with ❤️ from <strong>CodEarn Team</strong></p>
            <p>Samundri, Faisalabad, Pakistan</p>
            <p style="margin-top: 15px; border-top: 1px solid #e2e8f0; padding-top: 15px;">
              Don't want these emails? <a href="${unsubscribeUrl}" class="unsubscribe">Unsubscribe here</a>
            </p>
            <p>© ${new Date().getFullYear()} CodEarn. All rights reserved.</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}







// lib/email.ts - Add this template

export function generateCertificateAwardedEmail(cert: StudentCertificate, user: any) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .certificate-preview { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border: 2px solid #f59e0b; text-align: center; }
        .button { display: inline-block; padding: 12px 30px; background: #f59e0b; color: white; text-decoration: none; border-radius: 5px; margin: 10px 5px; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎉 Congratulations!</h1>
          <p>Your certificate is ready</p>
        </div>
        <div class="content">
          <p>Hi <strong>${user.firstName}</strong>,</p>
          <p>You've successfully completed <strong>${cert.courseTitle}</strong>! Your certificate has been issued.</p>
          
          <div class="certificate-preview">
            <div style="font-size: 48px; margin-bottom: 10px;">🏆</div>
            <h3 style="margin: 0; color: #d97706;">${cert.courseTitle}</h3>
            <p style="margin: 5px 0; color: #666;">Grade: ${cert.grade}</p>
            <p style="margin: 5px 0; color: #666; font-family: monospace; font-size: 12px;">${cert.certificateNumber}</p>
          </div>

          <center>
            <a href="${cert.verificationUrl}" class="button">View Certificate</a>
            <a href="${cert.downloadUrl}" class="button" style="background: #333;">Download PDF</a>
          </center>

          <p style="margin-top: 20px;"><strong>Share your achievement:</strong></p>
          <p>Add this certificate to your LinkedIn profile or share on social media to showcase your expertise.</p>

          <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <strong>Verification URL:</strong><br>
            <a href="${cert.verificationUrl}" style="color: #d97706; word-break: break-all;">${cert.verificationUrl}</a>
          </div>
        </div>
        <div class="footer">
          <p>© 2024 CodeEarn. All rights reserved.</p>
          <p>This is an automated email. Please do not reply.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

// ============== MAIN SEND FUNCTION ==============
type FormType = 'support' | 'sales' | 'partners';

export async function sendFormEmails(type: FormType, data: any) {
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@CodEarnTech.com';
  
  // Variables ko initialize kar diya taake "used before assigned" error na aaye
  let userTemplate: string = ''; 
  let adminTemplate: string = ''; 
  let userSubject: string = ''; 
  let adminSubject: string = '';

  // 1. Logic to select templates based on type
  switch(type) {
    case 'support':
      userTemplate = generateSupportConfirmationEmail(data);
      adminTemplate = generateAdminSupportNotification(data);
      userSubject = '✅ Support Request Received - CodEarnTech';
      const priority = data.priority?.toUpperCase() || 'NORMAL';
      adminSubject = `🚨 New ${priority} Priority Support Request`;
      break;
    
    case 'sales':
      userTemplate = generateSalesConfirmationEmail(data);
      adminTemplate = generateAdminSalesNotification(data);
      userSubject = '✅ Sales Inquiry Received - CodEarnTech';
      adminSubject = '💰 New Sales Lead - Action Required';
      break;
    
    case 'partners':
      userTemplate = generatePartnershipConfirmationEmail(data);
      adminTemplate = generateAdminPartnershipNotification(data);
      userSubject = '✅ Partnership Request Received - CodEarnTech';
      adminSubject = '🤝 New Partnership Request - Review Needed';
      break;
    
    default:
      throw new Error('Invalid form type');
  }

  // 2. Wrap everything in a single try-catch block inside the function
  try {
    const [userResult, adminResult] = await Promise.all([
      // User ko confirmation email
      sendEmail({
        to: data.email,
        subject: userSubject,
        html: userTemplate
      }),
      // Admin ko notification email
      sendEmail({
        to: adminEmail,
        subject: adminSubject,
        html: adminTemplate
      })
    ]);

    // Final Return object
    return {
      userEmail: userResult,
      adminEmail: adminResult,
      success: userResult.success && adminResult.success
    };

  } catch (error: any) {
    console.error("Failed to send form emails:", error);
    return { 
      success: false, 
      error: error.message || "Email service error" 
    };
  }
} // ✅ Function yahan professionaly close ho raha hai
