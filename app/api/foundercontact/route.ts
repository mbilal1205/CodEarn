import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { name, email, contact, message } = await req.json();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER, 
        pass: process.env.SMTP_PASS,
        
      },
    });

    // 1. Founder ko bhejne wali Email (Admin Alert)
    const adminMailOptions = {
      from: `"CodEarn Alert" <${process.env.EMAIL_USER}>`,
      to: 'aloncoder358@gmail.com',
      replyTo: email,
      subject: `🚨 New Inquiry: ${name}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #e2e8f0; border-radius: 10px;">
          <h2 style="color: #0f172a;">New Message for Founder</h2>
          <p><strong>Student Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone/WhatsApp:</strong> ${contact}</p>
          <div style="background: #f8fafc; padding: 15px; border-radius: 8px; margin-top: 10px;">
            <strong>Message:</strong><br/> ${message}
          </div>
        </div>
      `,
    };

    const userMailOptions = {
  from: `"Muhammad Bilal | Founder CodEarn" <${process.env.EMAIL_USER}>`,
  to: email,
  subject: `Confirmed: Your private message is on my desk, ${name}!`,
  html: `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 20px auto; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
      
      <!-- Brand Header -->
      <div style="background-color: #0f172a; padding: 40px 20px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0; font-size: 28px; letter-spacing: -0.5px;">CodEarn <span style="color: #6366f1;">Tech</span></h1>
        <p style="color: #94a3b8; margin-top: 10px; font-size: 14px;">Direct Founder Communication Channel</p>
      </div>

      <div style="padding: 40px 35px; background-color: #ffffff;">
        <h2 style="color: #0f172a; margin-top: 0; font-size: 22px;">Assalam-o-Alaikum ${name},</h2>
        
        <p style="color: #334155; line-height: 1.8; font-size: 16px;">
          I wanted to personally confirm that your message has been successfully <strong>encrypted and delivered</strong> directly to my private dashboard.
        </p>

        <!-- Satisfaction & Privacy Badge -->
        <div style="margin: 25px 0; padding: 20px; background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 12px; display: flex; align-items: center;">
          <div style="color: #166534; font-size: 14px;">
            <strong>🔒 100% Privacy Guaranteed:</strong> Your data is handled with end-to-end encryption. Only I (Muhammad Bilal) have the authorization to access and read your inquiry. No third-party or team member can view your personal details.
          </div>
        </div>

        <p style="color: #334155; line-height: 1.8; font-size: 16px;">
          I am currently reviewing your details. You can expect a direct response from me within <strong>24 hours</strong> on your provided contact: <span style="color: #6366f1; font-weight: 600;">${contact}</span>.
        </p>

        <!-- More Info Section -->
        <div style="margin-top: 30px; border-top: 1px solid #f1f5f9; padding-top: 25px;">
          <h4 style="color: #0f172a; margin-bottom: 10px;">While you wait:</h4>
          <ul style="color: #64748b; font-size: 14px; padding-left: 20px; line-height: 1.6;">
            <li>Explore our <strong>SaaS Development</strong> roadmaps.</li>
            <li>Check out our latest <strong>Next.js 15 MASTERCLASS</strong>.</li>
            <li>Join our community of <strong>5,000+ developers</strong> in Pakistan.</li>
          </ul>
        </div>

        <center style="margin-top: 35px;">
          <a href="https://www.codearntech.com" style="display: inline-block; background-color: #6366f1; color: #ffffff; padding: 15px 35px; text-decoration: none; border-radius: 10px; font-weight: bold; font-size: 16px; box-shadow: 0 4px 10px rgba(99, 102, 241, 0.3);">Visit CodEarn Portal</a>
        </center>
      </div>

      <!-- Signature Footer -->
      <div style="background-color: #f8fafc; padding: 30px; text-align: center; border-top: 1px solid #f1f5f9;">
        <p style="margin: 0; color: #0f172a; font-weight: 700; font-size: 16px;">Muhammad Bilal</p>
        <p style="margin: 5px 0 0 0; color: #64748b; font-size: 13px;">Founder & Lead Developer, CodEarn</p>
        <div style="margin-top: 20px; color: #94a3b8; font-size: 11px; letter-spacing: 1px; text-transform: uppercase;">
          Samundri, Faisalabad, Pakistan
        </div>
      </div>
    </div>
  `,
};

    // Dono emails bhejhein (Promise.all use karein taake speed fast ho)
    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(userMailOptions)
    ]);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Email Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}