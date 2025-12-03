# Supabase Cloud Push - Quick Steps

## 🎯 Goal

Push your local database schema to Supabase cloud

---

## 📋 Checklist

### Before Starting

- [ ] Create Supabase account at https://supabase.com
- [ ] Create a new project in Supabase
- [ ] Note down your Project Reference ID
- [ ] Have Node.js installed

### Step-by-Step

**1️⃣ Install CLI** (2 minutes)

```bash
npm install -g supabase
supabase --version
```

**2️⃣ Login to Supabase** (1 minute)

```bash
supabase login
# Opens browser for authentication
```

**3️⃣ Link to Your Project** (1 minute)

```bash
# Find Project Reference ID from:
# supabase.com → Your Project → Settings → General
supabase link --project-ref YOUR_PROJECT_REF
```

**4️⃣ Scan Database Schema** (30 seconds)

```bash
# This scans your local schema
supabase db pull
```

**5️⃣ Push to Cloud** (1-2 minutes)

```bash
# This pushes to Supabase cloud
supabase db push
# Review changes and confirm
```

**6️⃣ Verify Success** (1 minute)

- Go to supabase.com → Your Project
- Click "SQL Editor"
- See all your tables there ✅

---

## ✨ After Pushing

### Get Your Credentials

Go to Supabase → Your Project → Settings → API:

```
NEXT_PUBLIC_SUPABASE_URL = https://[your-project].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = [copy the anon key]
SUPABASE_SERVICE_ROLE_KEY = [copy the service role key]
```

### Update Your App

Create `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key-here
SUPABASE_SERVICE_ROLE_KEY=your-key-here
```

### Create Storage Buckets

Go to Supabase → Storage → New Bucket:

1. `images` (public)
2. `portfolio-lessons` (public)
3. `travel-banners` (public)
4. `travel-items` (public)
5. `yoga-courses` (public)

### Test It

```bash
npm run dev
# Go to http://localhost:3000/admin/login
# Try creating content - should work!
```

---

## 📊 What Gets Created

Your cloud database will have:

```
Tables Created:
├── users
├── portfolio_lessons
├── portfolio_registrations
├── travel_categories
├── travel_items
├── travel_bookings
├── travel_banners
├── yoga_courses
└── yoga_bookings

Storage Buckets:
├── images
├── portfolio-lessons
├── travel-banners
├── travel-items
└── yoga-courses
```

---

## ⚡ Total Time: ~10 minutes

- Install CLI: 2 min
- Login: 1 min
- Link project: 1 min
- Scan schema: 30 sec
- Push to cloud: 1-2 min
- Get credentials: 1 min
- Create buckets: 2 min
- Test: 1 min

---

## ❌ Common Issues

| Issue                | Solution                                         |
| -------------------- | ------------------------------------------------ |
| "Project not found"  | Check Project Reference ID is correct            |
| "Access denied"      | Make sure you're logged in: `supabase auth list` |
| "Connection refused" | Verify Supabase project is active                |
| Tables not showing   | Refresh page or check SQL Editor                 |

---

## 🎉 You're Done!

Once complete:
✅ Database in cloud  
✅ Credentials configured  
✅ Storage buckets created  
✅ Ready to deploy

Next: Deploy to Vercel or self-hosted!

---

## 📖 Full Guide

For detailed instructions, see: `SUPABASE_PUSH_GUIDE.md`
