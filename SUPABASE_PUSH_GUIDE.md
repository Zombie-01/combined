# Push Database to Supabase Cloud

## Prerequisites

1. **Supabase Account** - Create at https://supabase.com
2. **Supabase CLI** - Install globally
3. **GitHub Account** - For linking (optional but recommended)

---

## Step 1: Install Supabase CLI

```bash
# Install globally
npm install -g supabase

# Or if using npm
npm install supabase --save-dev
```

Verify installation:

```bash
supabase --version
```

---

## Step 2: Login to Supabase

```bash
supabase login
```

This will:

- Open browser to supabase.com
- Ask you to authorize CLI
- Save access token locally

---

## Step 3: Create Supabase Project (if not exists)

Go to https://supabase.com and:

1. Click "New Project"
2. Select organization
3. Enter project name (e.g., "my-admin-platform")
4. Set database password (save this!)
5. Select region (closest to you)
6. Click "Create"

Wait for project to initialize (2-3 minutes)

---

## Step 4: Link Local Project to Remote

```bash
supabase link --project-ref your-project-ref
```

**Where to find project-ref:**

1. Go to https://supabase.com → Your Project
2. Settings → General
3. Copy "Project Reference ID"

Example:

```bash
supabase link --project-ref abcdefghijklmnop
```

---

## Step 5: Scan and Create Migration

Supabase CLI will scan your local database and create a migration:

```bash
supabase db pull
```

This will:

- Compare local schema with remote
- Create a new migration file
- Save changes to `migrations/` folder

---

## Step 6: Push to Cloud

```bash
supabase db push
```

This will:

- Show changes that will be applied
- Ask for confirmation
- Apply all migrations to remote database
- Show success message

---

## Step 7: Verify in Cloud

Go to https://supabase.com → Your Project → SQL Editor

Run this to verify tables exist:

```sql
SELECT tablename FROM pg_tables WHERE schemaname = 'public';
```

You should see:

- users
- portfolio_lessons
- portfolio_registrations
- travel_categories
- travel_items
- travel_bookings
- travel_banners
- yoga_courses
- yoga_bookings

---

## Quick Command Summary

```bash
# 1. Install CLI
npm install -g supabase

# 2. Login
supabase login

# 3. Link to project
supabase link --project-ref YOUR_PROJECT_REF

# 4. Pull/scan schema
supabase db pull

# 5. Push to cloud
supabase db push

# 6. Verify
# Go to https://supabase.com and check SQL Editor
```

---

## If You Get Errors

### Error: "Project not found"

- Check project reference is correct
- Make sure you're logged in: `supabase auth list`

### Error: "Database connection refused"

- Verify project is active in Supabase
- Check network connection

### Error: "Migration already exists"

- If pushing same migration again, it will skip
- This is normal and safe

### Error: "Column already exists"

- Database already has that column
- Migration will be skipped

---

## After Pushing to Cloud

### 1. Get Connection String

Go to Supabase → Project Settings → Database:

```
# You'll find:
Host
Port
Database
User
Password

# Or full URL:
postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres
```

### 2. Update Environment Variables

Create `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

Find these in Supabase → Settings → API

### 3. Create Storage Buckets

In Supabase → Storage:

1. Click "New bucket"
2. Create these buckets:

   - `images`
   - `portfolio-lessons`
   - `travel-banners`
   - `travel-items`
   - `yoga-courses`

3. For each bucket:
   - Click "..." → Edit
   - Enable "Public"
   - Save

### 4. Test Connection

Run your app:

```bash
npm run dev
```

Go to `/admin/login` and try creating content.

---

## Viewing Database

### Via Supabase Dashboard

1. Go to https://supabase.com → Your Project
2. Click "SQL Editor"
3. Select table to view
4. See all data

### Via Your App

1. Go to `http://localhost:3000/admin/dashboard`
2. Should show stats from cloud database

---

## Making Future Changes

When you update database schema:

```bash
# 1. Make changes locally (if using local Supabase)
# 2. Scan changes
supabase db pull

# 3. Review migration file (in migrations/ folder)
# 4. Push to cloud
supabase db push
```

---

## Backup Before Major Changes

```bash
# Download backup from Supabase
supabase db dump --db-url postgresql://... > backup.sql

# Or use Supabase dashboard:
# Settings → Backups → Download backup
```

---

## Useful Commands

```bash
# Check status
supabase status

# View logs
supabase logs

# Push specific migration
supabase db push --version VERSION_NUMBER

# Drop all data (careful!)
supabase db reset

# Push to specific environment
supabase db push --linked  # to linked project
```

---

## Troubleshooting Tips

### Project not showing up?

- Refresh Supabase dashboard
- Make sure you're in correct organization
- Check project status is "Active"

### Can't log in?

- Clear cached credentials: `supabase logout && supabase login`
- Make sure account has project access

### Data not appearing?

- Go to SQL Editor and run: `SELECT * FROM users LIMIT 10;`
- Check if tables exist: `\dt` in SQL Editor

### Images not uploading?

- Check storage buckets are created
- Verify buckets are set to Public
- Check bucket names match exactly

---

## Next Steps

1. ✅ Push database to cloud
2. ✅ Create storage buckets
3. ✅ Update `.env.local`
4. ✅ Test admin login
5. ✅ Create test content
6. ✅ Verify API endpoints
7. Deploy to production

---

## Support

- Supabase CLI Docs: https://supabase.com/docs/guides/cli
- Supabase Studio: https://supabase.com/docs/guides/database/tables
- Migration Docs: https://supabase.com/docs/guides/migrations

---

**Now your database is in the cloud! 🚀**
