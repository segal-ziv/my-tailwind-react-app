import { Resend } from 'resend';
import { sql } from '@vercel/postgres';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const resend = new Resend(process.env.RESEND_API_KEY);

// Rate limiting store (in-memory for serverless)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Rate limit: 5 requests per 15 minutes per IP
const RATE_LIMIT = 5;
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes in milliseconds

interface ContactFormData {
  name: string;
  phone: string;
  projectType: string;
  description: string;
}

// Hebrew translations for project types
const projectTypeMap: Record<string, string> = {
  residential: 'פרויקט מגורים',
  commercial: 'פרויקט מסחרי',
  institutional: 'פרויקט ציבורי',
  contractor: 'קבלן / יזם',
  emergency: 'שירות חירום',
  other: 'אחר',
};

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitStore.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (record.count >= RATE_LIMIT) {
    return false;
  }

  record.count++;
  return true;
}

function validateFormData(data: any): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!data.name || typeof data.name !== 'string' || data.name.trim().length < 2) {
    errors.push('שם מלא חייב להכיל לפחות 2 תווים');
  }

  if (!data.phone || typeof data.phone !== 'string') {
    errors.push('מספר טלפון חסר');
  } else {
    const phoneRegex = /^0\d(?:[- ]?\d){7,8}$/;
    if (!phoneRegex.test(data.phone)) {
      errors.push('מספר טלפון לא תקין');
    }
  }

  if (!data.projectType || typeof data.projectType !== 'string') {
    errors.push('נא לבחור סוג פרויקט');
  }

  if (!data.description || typeof data.description !== 'string' || data.description.trim().length < 10) {
    errors.push('תיאור הפרויקט חייב להכיל לפחות 10 תווים');
  }

  return { valid: errors.length === 0, errors };
}

async function saveToDatabase(data: ContactFormData): Promise<number> {
  try {
    const result = await sql`
      INSERT INTO contact_submissions (name, phone, project_type, description, submitted_at)
      VALUES (${data.name}, ${data.phone}, ${data.projectType}, ${data.description}, NOW())
      RETURNING id
    `;
    return result.rows[0].id;
  } catch (error) {
    console.error('Database error:', error);
    throw new Error('Failed to save to database');
  }
}

async function sendEmail(data: ContactFormData, submissionId: number): Promise<void> {
  const projectTypeHebrew = projectTypeMap[data.projectType] || data.projectType;

  const emailHtml = `
<!DOCTYPE html>
<html dir="rtl" lang="he">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f4f4f4; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px 20px; text-align: center; }
    .header h1 { margin: 0; font-size: 24px; }
    .header p { margin: 5px 0 0 0; font-size: 14px; opacity: 0.9; }
    .content { padding: 30px 20px; }
    .field { margin-bottom: 20px; }
    .label { font-weight: bold; color: #667eea; font-size: 14px; margin-bottom: 5px; display: block; }
    .value { background: #f8f9fa; padding: 12px 15px; border-right: 4px solid #667eea; border-radius: 4px; font-size: 15px; }
    .description { white-space: pre-wrap; line-height: 1.8; }
    .footer { background: #f8f9fa; padding: 20px; text-align: center; font-size: 12px; color: #666; border-top: 1px solid #e0e0e0; }
    .badge { display: inline-block; background: #667eea; color: white; padding: 4px 12px; border-radius: 12px; font-size: 11px; margin-top: 10px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🔧 בקשה חדשה מאתר T.S אינסטלציה</h1>
      <p>התקבלה פנייה חדשה מלקוח פוטנציאלי</p>
      <div class="badge">מזהה פנייה: #${submissionId}</div>
    </div>
    <div class="content">
      <div class="field">
        <span class="label">👤 שם מלא</span>
        <div class="value">${data.name}</div>
      </div>
      <div class="field">
        <span class="label">📱 טלפון</span>
        <div class="value"><a href="tel:${data.phone}" style="color: #667eea; text-decoration: none;">${data.phone}</a></div>
      </div>
      <div class="field">
        <span class="label">🏗️ סוג פרויקט</span>
        <div class="value">${projectTypeHebrew}</div>
      </div>
      <div class="field">
        <span class="label">📝 תיאור הפרויקט</span>
        <div class="value description">${data.description}</div>
      </div>
    </div>
    <div class="footer">
      <p><strong>T.S Plumbing</strong> - מערכת ניהול פניות לקוחות</p>
      <p>פנייה זה נשמרה במאגר הנתונים ונשלחה אליך במייל</p>
    </div>
  </div>
</body>
</html>
  `.trim();

  try {
    await resend.emails.send({
      from: 'T.S Plumbing <onboarding@resend.dev>',
      to: 'z.segal.pro@gmail.com',
      replyTo: data.phone.includes('@') ? data.phone : undefined,
      subject: `בקשה חדשה מאתר T.S אינסטלציה - ${data.name}`,
      html: emailHtml,
    });
  } catch (error) {
    console.error('Email error:', error);
    throw new Error('Failed to send email');
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Rate limiting
  const ip = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || 'unknown';
  const ipString = Array.isArray(ip) ? ip[0] : ip;

  if (!checkRateLimit(ipString)) {
    return res.status(429).json({
      error: 'יותר מדי בקשות. נא לנסות שוב בעוד 15 דקות.',
    });
  }

  // Validate form data
  const validation = validateFormData(req.body);
  if (!validation.valid) {
    return res.status(400).json({
      error: 'נתונים לא תקינים',
      details: validation.errors,
    });
  }

  const formData: ContactFormData = {
    name: req.body.name.trim(),
    phone: req.body.phone.trim(),
    projectType: req.body.projectType,
    description: req.body.description.trim(),
  };

  try {
    // Save to database
    const submissionId = await saveToDatabase(formData);

    // Send email
    await sendEmail(formData, submissionId);

    return res.status(200).json({
      success: true,
      message: 'הפנייה נשלחה בהצלחה',
      submissionId,
    });
  } catch (error) {
    console.error('Contact form error:', error);

    return res.status(500).json({
      error: 'אירעה שגיאה בשליחת הטופס. נא לנסות שוב או ליצור קשר טלפונית.',
    });
  }
}
