# Newsletter Setup Guide

## Local Development

Environment variable `BREVO_API_KEY` is already configured in `.env.local`

To test locally:
```bash
npm install -g vercel
vercel dev
```

Then test the newsletter form.

---

## Vercel Deployment

### Step 1: Add Environment Variable to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add:
   - **Name**: `BREVO_API_KEY`
   - **Value**: `xsmtpsib-[your-api-key-here]`
5. Click **Save**

### Step 2: Verify List ID in Brevo

1. Go to [Brevo.com](https://brevo.com)
2. Go to **Contacts** → **Lists**
3. Find or create "Quarx AI Newsletter" list
4. Copy the **List ID** (currently set to `2` in `/api/newsletter.js`)
5. If different, update `/api/newsletter.js` line 40 with correct ID

### Step 3: Deploy

```bash
git add .
git commit -m "Add Brevo newsletter integration"
git push
```

Vercel will automatically deploy the changes.

---

## Newsletter Features

✅ **Automatic Subscription** - Emails added to Brevo list on form submission
✅ **Email Validation** - Basic validation on client & server side
✅ **Error Handling** - Bilingual error messages (EN/AR)
✅ **Analytics Tracking** - Google Analytics events for subscriptions
✅ **CORS Enabled** - Works from any domain

---

## Brevo Pro Tips

- **Create Campaign**: In Brevo, go to **Campaigns** → **Create** to send weekly emails
- **Automation**: Set up triggered emails when contacts are added
- **Segmentation**: Segment contacts by language (add a custom field during subscription)
- **Templates**: Create bilingual email templates for newsletters

---

## Troubleshooting

- **"Error - Try again"**: Check Brevo API key in Vercel environment variables
- **Emails not appearing in Brevo**: Check the List ID matches in `/api/newsletter.js`
- **CORS errors**: The API endpoint allows all origins (you may want to restrict this in production)
