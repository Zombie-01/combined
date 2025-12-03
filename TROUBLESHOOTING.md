# Deployment Tips & Troubleshooting

## Pre-Deployment Verification

Run these commands before deploying:

```bash
# Check for TypeScript errors
npm run typecheck

# Build the project
npm run build

# Run linter
npm run lint
```

All should complete without errors.

---

## Common Deployment Issues & Solutions

### Issue: "NEXT_PUBLIC_SUPABASE_URL is not set"

**Cause:** Environment variables not configured

**Solution:**

1. Check `.env.local` exists in project root
2. Verify all 3 variables are present:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
3. Restart development server or redeployment

### Issue: "Images not uploading"

**Cause:** Storage bucket not public or doesn't exist

**Solution:**

1. Go to Supabase Storage
2. Create these 5 public buckets:
   - `images`
   - `portfolio-lessons`
   - `travel-banners`
   - `travel-items`
   - `yoga-courses`
3. Verify each bucket is set to public
4. Check bucket names match exactly in forms

### Issue: "Admin login not working"

**Cause:** Supabase Auth not enabled or credentials wrong

**Solution:**

1. Go to Supabase → Authentication → Providers
2. Ensure Email provider is enabled
3. Verify Supabase credentials in `.env.local`
4. Check Supabase project is active (not paused)
5. Test signup on `/admin/login` page

### Issue: "API endpoints return 500 error"

**Cause:** Database tables don't exist or wrong field names

**Solution:**

1. Run database migration
2. Check field names match in `database.types.ts`
3. Verify Supabase service role key is correct
4. Check database logs in Supabase dashboard

### Issue: "Bookings/registrations tables show 'N/A'"

**Cause:** Related table data not joining correctly

**Solution:**

1. Verify foreign key relationships in database
2. Check data exists in related tables
3. Review SQL query in `lib/supabase/actions.ts`
4. Test database query directly in Supabase SQL editor

---

## Performance Optimization

### For Images

```javascript
// Images are automatically optimized by Next.js
// Configure in next.config.js (already done):
images: {
  unoptimized: true,  // For Vercel
  domains: ["*"],     // Allow any domain
}
```

### For Database

- Queries already include specific field selects
- Joins are optimized
- Indexes on foreign keys recommended

### For Build

```bash
# Analyze bundle size
npx next-bundle-analyzer

# Build with optimizations
npm run build
```

---

## Monitoring in Production

### Vercel Dashboard

1. Go to vercel.com → your project
2. Check "Deployments" for build status
3. Monitor "Analytics" for performance
4. Review "Logs" for errors

### Supabase Dashboard

1. Go to supabase.com → your project
2. Check "API" for request counts
3. Monitor "Logs" for database issues
4. Review "Storage" for image usage

### Manual Monitoring

```bash
# Check production logs
curl https://your-domain.com/api/health

# Monitor API endpoints
curl https://your-domain.com/api/open/portfolio

# Check admin dashboard
https://your-domain.com/admin/dashboard
```

---

## Backup & Recovery

### Database Backups

1. Supabase → Settings → Backups
2. Enable automatic backups
3. Set backup frequency (daily recommended)

### Manual Backup

```bash
# Export database (via Supabase SQL editor)
SELECT * FROM portfolio_lessons;
SELECT * FROM travel_items;
SELECT * FROM yoga_courses;
```

### Recovery

If needed, restore from Supabase backup:

1. Go to Supabase → Settings → Backups
2. Click restore on desired backup
3. Confirm recovery

---

## Scaling Considerations

### When you get more traffic:

**Database**

- Supabase scales automatically
- Monitor usage in dashboard
- Upgrade plan if needed

**Images**

- Current setup handles 1000s of images
- Consider CDN if massive scale
- Monitor storage usage

**API Calls**

- Supabase has rate limiting
- Monitor API logs
- Optimize queries if needed

---

## Security Hardening

### Before Going Live

```bash
# 1. Check no secrets in code
git grep -i "password\|secret\|key" -- '*.env*'

# 2. Verify .gitignore includes .env.local
cat .gitignore | grep env

# 3. Set up CORS if needed
# In next.config.js or API routes
```

### After Deployment

1. **Enable HTTPS** (automatic on Vercel)
2. **Set security headers** (already configured)
3. **Enable rate limiting** (Supabase)
4. **Monitor auth logs** (Supabase)
5. **Regular security updates** (npm audit)

---

## Update Dependencies

```bash
# Check for updates
npm outdated

# Update safely
npm update

# Major version updates (more risky)
npm install next@latest

# After updates, test thoroughly
npm run build
npm run typecheck
```

---

## Rollback Procedure

If something breaks:

### Via Git

```bash
# Identify last working commit
git log --oneline

# Revert to working version
git revert <commit-hash>
git push origin main

# Vercel auto-redeploys
```

### Via Vercel

1. Go to vercel.com → Deployments
2. Find last successful deployment
3. Click "Rollback" button
4. Confirm rollback

### Via Database

1. Go to Supabase → Backups
2. Restore from backup before issue
3. Test thoroughly before re-deploying

---

## Monitoring Checklist

### Daily

- [ ] Check deployment status
- [ ] Review error logs
- [ ] Monitor API response times

### Weekly

- [ ] Check performance metrics
- [ ] Review storage usage
- [ ] Monitor user activity

### Monthly

- [ ] Update dependencies
- [ ] Review security logs
- [ ] Optimize slow queries
- [ ] Plan capacity needs

---

## Getting Help

### For Supabase Issues

1. Check Supabase status page
2. Review Supabase documentation
3. Check Supabase Discord community
4. Contact Supabase support

### For Next.js Issues

1. Check Next.js documentation
2. Search GitHub issues
3. Ask on Stack Overflow
4. Check Vercel community

### For Deployment Issues

1. Check Vercel status page
2. Review deployment logs
3. Check environment variables
4. Contact platform support

---

## Useful Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run typecheck        # Check TypeScript
npm run lint             # Run linter

# Database
# Access Supabase SQL editor for direct queries

# Images
# Monitor Supabase Storage usage

# APIs
curl https://your-domain.com/api/open/portfolio
curl https://your-domain.com/api/open/travel
curl https://your-domain.com/api/open/yoga

# Logs
# Vercel: vercel.com → Logs
# Supabase: supabase.com → Logs
```

---

## Success Indicators

After deployment, verify:

✅ Admin login works
✅ Can create content
✅ Images upload to storage
✅ Bookings/registrations display
✅ All API endpoints respond
✅ Pages load quickly
✅ No errors in logs
✅ Users can access platform

---

## Final Checklist Before Going Live

- [ ] `.env.local` configured with real values
- [ ] All environment variables set
- [ ] Database migrations completed
- [ ] Storage buckets created (5 total)
- [ ] Build succeeds locally
- [ ] TypeScript has no errors
- [ ] Tested locally completely
- [ ] Read DEPLOYMENT.md
- [ ] Followed QUICKSTART.md
- [ ] Reviewed PRE_DEPLOYMENT_CHECKLIST.md
- [ ] Ready to deploy!

---

**You're ready to go live! 🚀**

If you encounter any issues, reference this guide or the full documentation.
