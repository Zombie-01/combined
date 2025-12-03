# Multi-Module Admin & API Platform

A comprehensive Next.js admin platform with three integrated modules: **Portfolio**, **Travel**, and **Yoga**. Includes admin dashboard, content management, booking tracking, and public APIs.

## Features

### 📚 Portfolio Module

- Create and manage portfolio lessons
- Image upload to Supabase storage
- Video URL support
- Track lesson registrations
- Public API for lesson listings

### ✈️ Travel Module

- Create travel destinations with pricing
- Support for locations, countries, and descriptions
- Image upload for travel items
- Manage travel banners with images
- Travel booking management
- Public API for travel items

### 🧘 Yoga Module

- Create yoga courses with multiple types
- Image upload for courses
- Price management
- Track yoga bookings with schedules
- Public API for course listings

### 🔐 Admin Panel

- Secure login authentication via Supabase
- Protected routes with middleware
- Responsive dashboard
- Table views for all bookings and registrations
- CRUD operations for all modules

### 🌐 Public APIs

No authentication required - perfect for external websites:

- Portfolio: `/api/open/portfolio` and `/api/open/portfolio/[id]`
- Travel: `/api/open/travel` and `/api/open/travel/[id]`
- Yoga: `/api/open/yoga` and `/api/open/yoga/[id]`

## Tech Stack

- **Framework:** Next.js 13+ (App Router)
- **Database:** Supabase (PostgreSQL)
- **Storage:** Supabase Storage
- **Authentication:** Supabase Auth
- **UI Components:** Shadcn/ui with Radix UI
- **Styling:** Tailwind CSS
- **Form Validation:** React Hook Form
- **Language:** TypeScript

## Getting Started

### Prerequisites

- Node.js 16+ and npm/yarn
- Supabase project (free tier available)

### Installation

1. **Clone repository**

   ```bash
   git clone <repository-url>
   cd project
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` with your Supabase credentials:

   - `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Public anon key
   - `SUPABASE_SERVICE_ROLE_KEY` - Server-side service role key

4. **Create storage buckets in Supabase**

   - `images`
   - `portfolio-lessons`
   - `travel-banners`
   - `travel-items`
   - `yoga-courses`

5. **Run development server**
   ```bash
   npm run dev
   ```
   Open http://localhost:3000

## Project Structure

```
project/
├── app/
│   ├── admin/                    # Admin dashboard pages
│   │   ├── portfolio/
│   │   ├── travel/
│   │   └── yoga/
│   ├── api/
│   │   ├── admin/               # Admin APIs
│   │   ├── open/                # Public APIs (no auth)
│   │   │   ├── portfolio/
│   │   │   ├── travel/
│   │   │   └── yoga/
│   │   ├── auth/                # Authentication endpoints
│   │   ├── portfolio/           # Portfolio operations
│   │   ├── travel/              # Travel operations
│   │   └── yoga/                # Yoga operations
│   ├── auth/                     # Login/register pages
│   └── layout.tsx
├── components/
│   ├── admin/                    # Admin forms
│   │   ├── banner-form.tsx
│   │   ├── lesson-form.tsx
│   │   ├── travel-item-form.tsx
│   │   └── yoga-course-form.tsx
│   └── ui/                       # UI components
├── lib/
│   ├── supabase/
│   │   ├── actions.ts           # Database operations
│   │   ├── client.ts            # Client-side Supabase
│   │   ├── server.ts            # Server-side Supabase
│   │   └── database.types.ts    # TypeScript types
│   ├── auth.tsx                 # Auth helpers
│   └── utils.ts                 # Utilities
└── DEPLOYMENT.md                # Deployment guide
```

## Usage

### Admin Login

1. Navigate to `/admin/login`
2. Register or sign in with your credentials
3. Access dashboard at `/admin/dashboard`

### Create Content

#### Portfolio Lesson

1. Go to `/admin/portfolio/lessons/create`
2. Fill in title, description, and upload image
3. Optionally add video URL
4. Submit to save

#### Travel Item

1. Go to `/admin/travel/items/create`
2. Select category (required)
3. Fill in title, description, location, country, price
4. Upload item image
5. Submit

#### Yoga Course

1. Go to `/admin/yoga/courses/create`
2. Fill in title, select yoga type
3. Add description and price
4. Upload course image
5. Submit

### View Bookings

- Portfolio: `/admin/portfolio/registrations` - View all registrations
- Travel: `/admin/travel/bookings` - View bookings with status
- Yoga: `/admin/yoga/bookings` - View bookings with schedules

### API Usage

#### Get all portfolio lessons

```bash
curl https://your-domain.com/api/open/portfolio
```

Response:

```json
{
  "success": true,
  "data": {
    "lessons": [...],
    "stats": { "total_lessons": 0, "total_registrations": 0 }
  }
}
```

#### Get single travel item

```bash
curl https://your-domain.com/api/open/travel/item-id
```

#### Get all yoga courses

```bash
curl https://your-domain.com/api/open/yoga
```

See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete API documentation.

## Scripts

```bash
# Development
npm run dev          # Start development server

# Production
npm run build        # Build for production
npm start           # Start production server

# Code Quality
npm run lint        # Run ESLint
npm run typecheck   # Check TypeScript types
```

## Database Schema

### Portfolio Lessons

- `id` - UUID primary key
- `title` - Lesson title (required)
- `description` - Lesson description
- `image_url` - Image URL from Supabase
- `video_url` - Optional video URL
- `created_at` - Timestamp

### Travel Items

- `id` - UUID primary key
- `category_id` - Foreign key to categories
- `title` - Item title (required)
- `description` - Item description
- `location` - City/region
- `country` - Country name
- `price` - Price in currency
- `image_url` - Image URL from Supabase
- `created_at` - Timestamp

### Yoga Courses

- `id` - UUID primary key
- `title` - Course title (required)
- `type` - Yoga type (required)
- `description` - Course description
- `price` - Course price
- `image_url` - Image URL from Supabase
- `created_at` - Timestamp

### Bookings & Registrations

- Portfolio: `portfolio_registrations` (user_id, lesson_id, created_at)
- Travel: `travel_bookings` (user_id, travel_id, date_from, date_to, status)
- Yoga: `yoga_bookings` (user_id, course_id, schedule, created_at)

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy automatically on push

### Self-Hosted

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

## Security

- ✅ Environment variables for sensitive data
- ✅ Protected admin routes with middleware
- ✅ Supabase Auth for authentication
- ✅ Service role key for server operations only
- ✅ Public APIs without authentication
- ✅ Proper error handling and validation

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit pull request

## License

MIT

## Support

For issues or questions:

1. Check [DEPLOYMENT.md](./DEPLOYMENT.md)
2. Review environment variable setup
3. Check Supabase documentation
4. Review application logs

## Roadmap

- [ ] Edit/delete functionality for admin content
- [ ] Advanced filtering and search
- [ ] Payment integration for bookings
- [ ] Email notifications
- [ ] Analytics dashboard
- [ ] Multi-language support
- [ ] Mobile app
