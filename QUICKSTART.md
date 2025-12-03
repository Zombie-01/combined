# Quick Start Guide

**📌 First Time?** Start here: [SUPABASE_QUICK_PUSH.md](./SUPABASE_QUICK_PUSH.md) to push database to cloud!

## 5-Minute Setup

### Step 0: Push Database to Cloud (Required First) ⭐

Before doing anything, you need to set up your Supabase project in the cloud:

1. **See:** [SUPABASE_QUICK_PUSH.md](./SUPABASE_QUICK_PUSH.md)
2. **Run these commands:**

   ```bash
   npm install -g supabase
   supabase login
   supabase link --project-ref YOUR_PROJECT_REF
   supabase db pull
   supabase db push
   ```

3. **Get your credentials** from Supabase Dashboard (Settings → API)

### Step 1: Get Supabase Credentials (2 min)

1. Go to [supabase.com](https://supabase.com)
2. Create new project or use existing one
3. Go to Settings → API
4. Copy these values:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - anon key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - service_role key → `SUPABASE_SERVICE_ROLE_KEY`

### Step 2: Create Storage Buckets (1 min)

In Supabase, go to Storage and create these public buckets:

- `images`
- `portfolio-lessons`
- `travel-banners`
- `travel-items`
- `yoga-courses`

### Step 3: Configure Environment (1 min)

```bash
cp .env.example .env.local
```

Edit `.env.local` and paste your Supabase credentials

### Step 4: Start Development (1 min)

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`

---

## First Time Usage

### 1. Create Admin Account

- Go to `/admin/login`
- Click "Create account"
- Sign up with email/password

### 2. Access Dashboard

- You'll auto-redirect to `/admin/dashboard`
- See stats for all modules

### 3. Create Sample Content

#### Portfolio Lesson

1. Click "Portfolio" → "Lessons"
2. Click "Create Lesson"
3. Fill in:
   - Title: "My First Lesson"
   - Description: "This is a test lesson"
   - Upload an image
   - (Optional) Add video URL
4. Click "Create Lesson"

#### Travel Item

1. Click "Travel" → "Items"
2. Click "Create Item"
3. Fill in:
   - Title: "Paris Trip"
   - Category: Select one (or create category first)
   - Description: "Amazing city"
   - Location: "Paris"
   - Country: "France"
   - Price: "2500"
   - Upload image
4. Click "Create Item"

#### Yoga Course

1. Click "Yoga" → "Courses"
2. Click "Create Course"
3. Fill in:
   - Title: "Morning Yoga"
   - Type: "Hatha"
   - Description: "Start your day with yoga"
   - Price: "50"
   - Upload image
4. Click "Create Course"

### 4. Test APIs

```bash
# Portfolio API
curl http://localhost:3000/api/open/portfolio

# Travel API
curl http://localhost:3000/api/open/travel

# Yoga API
curl http://localhost:3000/api/open/yoga
```

---

## Deployment Checklist

Before deploying to production:

- [ ] All environment variables set
- [ ] Storage buckets created
- [ ] Test admin login works
- [ ] Test content creation works
- [ ] Test API endpoints return data
- [ ] Database tables have data
- [ ] Images upload correctly
- [ ] Read full [DEPLOYMENT.md](./DEPLOYMENT.md)

---

## Common Issues

### "NEXT_PUBLIC_SUPABASE_URL is not set"

**Fix:** Check `.env.local` file exists and has correct values

### "Can't upload images"

**Fix:** Make sure storage buckets are public (set permissions)

### "Login not working"

**Fix:** Verify Supabase Auth is enabled and credentials are correct

### Images not showing in API

**Fix:** Check image URLs are correct in database

---

## Next Steps

1. **Test everything locally** - Create content, upload images, check APIs
2. **Deploy to Vercel** - See [DEPLOYMENT.md](./DEPLOYMENT.md)
3. **Configure custom domain** - Point DNS to Vercel
4. **Set up backups** - Enable Supabase backups
5. **Monitor production** - Check logs and performance

---

## Need Help?

1. Check [README.md](./README.md) - Full feature documentation
2. Read [DEPLOYMENT.md](./DEPLOYMENT.md) - Deployment guide
3. Visit [Supabase Docs](https://supabase.com/docs)
4. Visit [Next.js Docs](https://nextjs.org/docs)

---

**Happy coding! 🚀**
