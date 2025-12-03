# Deployment Checklist & Setup Guide

## Pre-Deployment Setup

### 1. Environment Variables

Create a `.env.local` file in the project root (never commit to git):

```
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# External Integration (Optional)
EXTERNAL_INTEGRATION_URL=https://api.example.com
```

**How to get these values:**

1. Go to your Supabase project settings
2. Find "API" section → Copy the Project URL → `NEXT_PUBLIC_SUPABASE_URL`
3. Find "anon" key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Find "service_role" key → `SUPABASE_SERVICE_ROLE_KEY`

### 2. Database Schema Setup

Run the migration to create the schema:

```bash
cd supabase
# The migration creates all tables with the unified schema
```

### 3. Supabase Storage Buckets

Create the following public storage buckets in Supabase:

- `images` (general images)
- `portfolio-lessons` (lesson images)
- `travel-banners` (banner images)
- `travel-items` (travel item images)
- `yoga-courses` (yoga course images)

## Features Implemented

### Authentication

✅ Admin login/register with Supabase Auth
✅ Session management
✅ Protected admin routes with middleware
✅ Auto-redirect to dashboard on login

### Portfolio Module

✅ Create lessons with image upload
✅ Store lesson title, description, image, and video URL
✅ Public API: `/api/open/portfolio` (list all) and `/api/open/portfolio/[id]` (single)
✅ Admin view: Portfolio registrations table with user details

### Travel Module

✅ Create travel items with image upload
✅ Fields: title, description, country, location, price, category, image
✅ Create travel banners with image upload
✅ Public API: `/api/open/travel` (list all) and `/api/open/travel/[id]` (single)
✅ Admin view: Travel bookings table with dates, status, and user details

### Yoga Module

✅ Create yoga courses with image upload
✅ Fields: title, description, type (dropdown), price, image
✅ Public API: `/api/open/yoga` (list all) and `/api/open/yoga/[id]` (single)
✅ Admin view: Yoga bookings table with course details

### Image Upload System

✅ Supabase Storage integration
✅ Automatic public URL generation
✅ Delete functionality
✅ Multiple bucket support

### Open APIs (No Authentication Required)

- `GET /api/open/portfolio` - List all lessons
- `GET /api/open/portfolio/[id]` - Get single lesson
- `GET /api/open/travel` - List items, categories, banners
- `GET /api/open/travel/[id]` - Get single travel item
- `GET /api/open/yoga` - List all courses
- `GET /api/open/yoga/[id]` - Get single course

## Deployment Steps

### For Vercel (Recommended)

1. **Connect Repository**

   ```bash
   # Push to GitHub/GitLab/Bitbucket
   git push origin main
   ```

2. **Import Project to Vercel**

   - Go to vercel.com → New Project
   - Import your repository
   - Select "Next.js" framework

3. **Configure Environment Variables**

   - Go to Settings → Environment Variables
   - Add all variables from `.env.local`
   - Variables are automatically applied to production

4. **Deploy**
   - Vercel automatically builds and deploys on push to main
   - Check deployment at your-domain.vercel.app

### For Self-Hosted (Node.js Server)

1. **Install Dependencies**

   ```bash
   npm install
   ```

2. **Build Application**

   ```bash
   npm run build
   ```

3. **Set Environment Variables**

   - Create `.env.local` in production environment
   - Or set via system environment variables

4. **Start Server**

   ```bash
   npm start
   ```

5. **Reverse Proxy (Nginx/Apache)**
   - Configure proxy to `localhost:3000`
   - Set up SSL certificate

### For Docker

1. **Create Dockerfile**

   ```dockerfile
   FROM node:18-alpine
   WORKDIR /app
   COPY package*.json ./
   RUN npm install
   COPY . .
   RUN npm run build
   ENV NODE_ENV=production
   EXPOSE 3000
   CMD ["npm", "start"]
   ```

2. **Create .dockerignore**

   ```
   .env.local
   .git
   .gitignore
   node_modules
   .next
   ```

3. **Build & Run**
   ```bash
   docker build -t my-app .
   docker run -e NEXT_PUBLIC_SUPABASE_URL=... -p 3000:3000 my-app
   ```

## Testing Before Deployment

### Admin Panel Tests

- [ ] Login/logout works
- [ ] Can create portfolio lessons with image
- [ ] Can create travel items with all fields
- [ ] Can create travel banners with image
- [ ] Can create yoga courses with dropdown type
- [ ] Bookings tables display correct data
- [ ] Registrations tables display correct data

### API Tests

- [ ] `GET /api/open/portfolio` returns all lessons
- [ ] `GET /api/open/portfolio/[id]` returns single lesson
- [ ] `GET /api/open/travel` returns items, categories, banners
- [ ] `GET /api/open/travel/[id]` returns single item
- [ ] `GET /api/open/yoga` returns all courses
- [ ] `GET /api/open/yoga/[id]` returns single course

### Image Upload Tests

- [ ] Portfolio lesson images upload to Supabase
- [ ] Travel item images upload correctly
- [ ] Travel banner images upload correctly
- [ ] Yoga course images upload correctly
- [ ] Image deletion works

## Security Checklist

- [ ] `.env.local` is in `.gitignore`
- [ ] No secrets committed to repository
- [ ] Supabase Row Level Security (RLS) policies configured
- [ ] Admin routes protected by middleware
- [ ] API keys are environment variables only
- [ ] HTTPS enforced in production
- [ ] CORS configured if needed

## Post-Deployment

1. **Monitor Logs**

   - Check Vercel/server logs for errors
   - Monitor Supabase for queries

2. **Test in Production**

   - Test all features in live environment
   - Verify image uploads work
   - Test API endpoints

3. **Set Up Backups**

   - Enable Supabase automated backups
   - Regular database backups

4. **Monitor Performance**
   - Check Next.js Analytics
   - Monitor Supabase usage
   - Optimize slow queries if needed

## Common Issues & Solutions

### Images not loading

- Check Supabase storage bucket permissions (must be public)
- Verify image URLs in database
- Check CORS settings if accessing from different domain

### Login not working

- Verify Supabase credentials in `.env.local`
- Check Supabase Auth settings
- Ensure Supabase project is active

### API returning errors

- Check environment variables are set
- Verify database tables exist
- Check Supabase service role key has access

## Support

- Supabase Docs: https://supabase.com/docs
- Next.js Docs: https://nextjs.org/docs
- Vercel Docs: https://vercel.com/docs
