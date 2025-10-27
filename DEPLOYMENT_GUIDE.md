# T.S Plumbing Contact Form - Deployment Guide

## 🚀 Complete Setup Instructions

This guide will walk you through setting up your new professional contact form system with email notifications and database storage.

---

## **Step 1: Set Up Vercel Postgres Database**

### 1.1 Add Postgres to Your Project

1. Go to your Vercel Dashboard: https://vercel.com/dashboard
2. Select your project: `my-tailwind-react-app`
3. Click on the **"Storage"** tab
4. Click **"Create Database"**
5. Select **"Postgres"**
6. Choose a database name: `ts-plumbing-db` (or any name you prefer)
7. Select region: Choose closest to Israel (Europe - Frankfurt recommended)
8. Click **"Create"**

### 1.2 Initialize Database Schema

After creating the database, you need to create the table:

1. In Vercel Dashboard, go to **Storage** → **Your Postgres Database**
2. Click on the **"Query"** tab
3. Copy the contents of `/api/init-db.sql` from your project
4. Paste it into the query editor
5. Click **"Run Query"**
6. You should see: `CREATE TABLE`, `CREATE INDEX` confirmations

**OR** use the Vercel CLI:

```bash
# Install Vercel CLI if you haven't
npm i -g vercel

# Login to Vercel
vercel login

# Link your project
vercel link

# Pull environment variables (this will also pull DB credentials)
vercel env pull .env.local

# Run the initialization script using psql (you'll need PostgreSQL client installed)
psql $(grep POSTGRES_URL .env.local | cut -d '=' -f2) -f api/init-db.sql
```

---

## **Step 2: Configure Resend API Key**

### 2.1 Add API Key to Vercel Environment Variables

1. You already have your Resend API key: `re_47jSkyDi_HaUKR37qomP8TVcv6a7yNPWt`
2. Go to your Vercel project → **Settings** → **Environment Variables**
3. Add a new variable:
   - **Name**: `RESEND_API_KEY`
   - **Value**: `re_47jSkyDi_HaUKR37qomP8TVcv6a7yNPWt`
   - **Environments**: Select all (Production, Preview, Development)
4. Click **"Save"**

### 2.2 Local Development (Optional)

If you want to test locally:

1. Create a `.env.local` file in your project root (already in .gitignore)
2. Add:
   ```
   RESEND_API_KEY=re_47jSkyDi_HaUKR37qomP8TVcv6a7yNPWt
   ```
3. Pull database credentials:
   ```bash
   vercel env pull .env.local
   ```

---

## **Step 3: Deploy to Production**

### 3.1 Commit and Push Changes

```bash
# Stage all changes
git add .

# Commit
git commit -m "Migrate from Formspree to Vercel Functions + Resend with database storage"

# Push to your repository
git push origin master
```

### 3.2 Trigger the Production Deployment

- Vercel automatically creates a deployment for every push to `master`
- To publish immediately after a successful preview, run:

```bash
# Requires Vercel CLI to be linked to this project
vercel deploy --prebuilt --prod
```

- Track the deployment progress in the Vercel dashboard

### 3.3 Verify Deployment

After deployment completes:

1. Visit your live website
2. Navigate to the contact section
3. Fill out and submit the form
4. You should receive an email at: `z.segal.pro@gmail.com`

---

## **Step 4: Test Your Contact Form**

### Test Checklist

- [ ] Form validation works (try submitting empty fields)
- [ ] Phone validation works (Israeli format: 050-1234567)
- [ ] Privacy consent checkbox is required
- [ ] Form submits successfully
- [ ] Success message appears
- [ ] Email arrives at `z.segal.pro@gmail.com`
- [ ] Email contains all form details (name, phone, project type, description)
- [ ] Submission is saved in database

### View Database Submissions

**Option 1: Vercel Dashboard**
1. Go to **Storage** → **Your Database**
2. Click **"Query"** tab
3. Run: `SELECT * FROM contact_submissions ORDER BY submitted_at DESC LIMIT 10;`

**Option 2: Using Vercel CLI**
```bash
vercel env pull .env.local
psql $(grep POSTGRES_URL .env.local | cut -d '=' -f2)
```

Then in psql:
```sql
-- View all submissions
SELECT id, name, phone, project_type, submitted_at
FROM contact_submissions
ORDER BY submitted_at DESC;

-- View full details of a submission
SELECT * FROM contact_submissions WHERE id = 1;
```

### Accessibility Regression Check (new)

After each production deploy, confirm the following quick checks so שהשינויים האחרונים בנושא נגישות אכן חיים:

- `Tab` פותח את כפתור הנגישות, ו־Shift+Tab מחזיר אליו לאחר סגירת הפאנל  
- כפתורי הטוגל בלוח הנגישות ניתנים להפעלה באמצעות מקשי Enter/Space  
- מודאל העוגיות אוסר יציאה עם המקלדת ומגיב ל־Escape  
- כרטיסים "לחיצים" מגיבים ללחיצה על Enter/Space מהפוקוס  
- בסעיף המומחיות, משתמש שמפעיל העדפת reduced motion מקבל וידאו ללא autoplay וללא loop  
- מצב "מיקוד קריאה" מדגיש פסקאות/כותרות ללא קפיצות לייאאוט

---

## **Step 5: Upgrade Resend Email (Optional)**

Currently, emails are sent from: `onboarding@resend.dev`

### To Use Your Own Domain:

1. Go to https://resend.com/domains
2. Click **"Add Domain"**
3. Enter your domain (e.g., `tsplumbing.co.il`)
4. Add the DNS records shown to your domain provider:
   - SPF Record
   - DKIM Record
   - DMARC Record (optional but recommended)
5. Wait for verification (usually 5-30 minutes)
6. Update `/api/contact.ts` line 125:
   ```typescript
   from: 'T.S Plumbing <contact@tsplumbing.co.il>',
   ```
7. Commit and deploy

**Benefits:**
- Professional sender email
- Better deliverability (less spam)
- Build trust with customers

---

## **📊 Features You Now Have**

### ✅ Email Notifications
- Professional HTML email template
- Sent to: `z.segal.pro@gmail.com`
- Contains all form details
- Unique submission ID for tracking

### ✅ Database Storage
- Permanent record of all submissions
- Searchable and exportable
- Timestamps for every submission
- Status tracking (new, contacted, completed)

### ✅ Security & Rate Limiting
- Rate limit: 5 submissions per 15 minutes per IP
- Server-side validation
- XSS protection
- CORS configured

### ✅ Professional Error Handling
- Hebrew error messages
- Field-level validation
- Network error handling
- User-friendly feedback

---

## **🔧 Maintenance & Management**

### View All Submissions

```sql
SELECT
  id,
  name,
  phone,
  project_type,
  submitted_at,
  status
FROM contact_submissions
ORDER BY submitted_at DESC;
```

### Update Submission Status

```sql
UPDATE contact_submissions
SET status = 'contacted'
WHERE id = 1;
```

### Export to CSV

```sql
COPY (
  SELECT * FROM contact_submissions
  ORDER BY submitted_at DESC
) TO STDOUT WITH CSV HEADER;
```

### Monthly Statistics

```sql
SELECT
  project_type,
  COUNT(*) as total_submissions,
  DATE_TRUNC('month', submitted_at) as month
FROM contact_submissions
GROUP BY project_type, month
ORDER BY month DESC, total_submissions DESC;
```

---

## **📈 Upgrade Limits**

### Current Free Tier Limits:

**Resend:**
- 3,000 emails/month
- 100 emails/day
- Perfect for small-medium business

**Vercel Postgres:**
- 256 MB storage
- ~10,000 submissions capacity
- 60 hours compute time/month

### When to Upgrade:

If you exceed these limits, both services offer affordable paid tiers:
- **Resend Pro**: $20/month (50,000 emails)
- **Vercel Postgres Pro**: $0.06/GB storage

---

## **🆘 Troubleshooting**

### Form Submission Fails

1. Check browser console for errors
2. Verify environment variables are set in Vercel
3. Check API logs in Vercel Dashboard → Functions → Logs

### Email Not Received

1. Check spam folder
2. Verify Resend API key is correct
3. Check Resend dashboard for delivery logs: https://resend.com/emails

### Database Error

1. Verify table was created (run init-db.sql)
2. Check Vercel Postgres connection
3. View database logs in Vercel Dashboard

### Rate Limit Issues

If legitimate users are being rate-limited:
- Update `RATE_LIMIT` in `/api/contact.ts`
- Redeploy

---

## **📞 Support**

- **Vercel Docs**: https://vercel.com/docs
- **Resend Docs**: https://resend.com/docs
- **Vercel Postgres Docs**: https://vercel.com/docs/storage/vercel-postgres

---

## **🎉 You're All Set!**

Your professional contact form is now:
- ✅ Independent (no third-party form services)
- ✅ Backed by a database
- ✅ Sending beautiful emails
- ✅ Production-ready
- ✅ Scalable

Congratulations! 🚀
