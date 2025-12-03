/*
  # Unified Admin Database Schema
  
  This migration creates a complete database schema for managing 3 websites:
  Portfolio, Travel, and Yoga through a single admin interface.

  ## 1. Global Tables
  
  ### `users`
  - `id` (uuid, primary key) - Unique user identifier
  - `name` (text) - User's full name
  - `email` (text, unique) - User's email address
  - `role` (text) - User role: 'admin' or 'user'
  - `created_at` (timestamptz) - Record creation timestamp
  
  ## 2. Portfolio Site Tables
  
  ### `portfolio_lessons`
  - `id` (uuid, primary key) - Unique lesson identifier
  - `title` (text) - Lesson title
  - `description` (text) - Lesson description
  - `video_url` (text) - URL to lesson video
  - `created_at` (timestamptz) - Record creation timestamp
  
  ### `portfolio_registrations`
  - `id` (uuid, primary key) - Unique registration identifier
  - `user_id` (uuid, foreign key → users.id) - User who registered
  - `lesson_id` (uuid, foreign key → portfolio_lessons.id) - Registered lesson
  - `created_at` (timestamptz) - Registration timestamp
  
  ## 3. Travel Site Tables
  
  ### `travel_categories`
  - `id` (uuid, primary key) - Unique category identifier
  - `name` (text) - Category name
  - `icon` (text) - Icon identifier or URL
  - `created_at` (timestamptz) - Record creation timestamp
  
  ### `travel_items`
  - `id` (uuid, primary key) - Unique travel item identifier
  - `category_id` (uuid, foreign key → travel_categories.id) - Associated category
  - `title` (text) - Travel item title
  - `price` (decimal) - Item price
  - `location` (text) - Location description
  - `image_url` (text) - Item image URL
  - `created_at` (timestamptz) - Record creation timestamp
  
  ### `travel_bookings`
  - `id` (uuid, primary key) - Unique booking identifier
  - `user_id` (uuid, foreign key → users.id) - User who made booking
  - `travel_id` (uuid, foreign key → travel_items.id) - Booked travel item
  - `date_from` (date) - Booking start date
  - `date_to` (date) - Booking end date
  - `status` (text) - Booking status: 'pending', 'confirmed', 'cancelled'
  - `created_at` (timestamptz) - Booking timestamp
  
  ### `travel_banners`
  - `id` (uuid, primary key) - Unique banner identifier
  - `image_url` (text) - Banner image URL
  - `text` (text) - Banner text content
  - `created_at` (timestamptz) - Record creation timestamp
  
  ## 4. Yoga Site Tables
  
  ### `yoga_courses`
  - `id` (uuid, primary key) - Unique course identifier
  - `title` (text) - Course title
  - `type` (text) - Course type: 'online', 'offline', 'travel', 'free'
  - `price` (decimal) - Course price
  - `description` (text) - Course description
  - `image_url` (text) - Course image URL
  - `created_at` (timestamptz) - Record creation timestamp
  
  ### `yoga_bookings`
  - `id` (uuid, primary key) - Unique booking identifier
  - `user_id` (uuid, foreign key → users.id) - User who made booking
  - `course_id` (uuid, foreign key → yoga_courses.id) - Booked course
  - `schedule` (timestamptz) - Scheduled date/time
  - `created_at` (timestamptz) - Booking timestamp
  
  ## 5. Security
  - Row Level Security (RLS) enabled on all tables
  - Restrictive policies requiring authentication
  - Admin users have full access
  - Regular users can only access their own data
  
  ## 6. Indexes
  - Foreign key columns indexed for query performance
  - Email indexed for user lookups
  - Category and type fields indexed for filtering
*/

-- =====================================================
-- GLOBAL TABLES
-- =====================================================

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  role text NOT NULL DEFAULT 'user' CHECK (role IN ('admin', 'user')),
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);

-- =====================================================
-- PORTFOLIO SITE TABLES
-- =====================================================

-- Portfolio lessons table
CREATE TABLE IF NOT EXISTS portfolio_lessons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL DEFAULT '',
  video_url text NOT NULL DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- Portfolio registrations table
CREATE TABLE IF NOT EXISTS portfolio_registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  lesson_id uuid NOT NULL REFERENCES portfolio_lessons(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, lesson_id)
);

CREATE INDEX IF NOT EXISTS idx_portfolio_registrations_user_id ON portfolio_registrations(user_id);
CREATE INDEX IF NOT EXISTS idx_portfolio_registrations_lesson_id ON portfolio_registrations(lesson_id);

-- =====================================================
-- TRAVEL SITE TABLES
-- =====================================================

-- Travel categories table
CREATE TABLE IF NOT EXISTS travel_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  icon text NOT NULL DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- Travel items table
CREATE TABLE IF NOT EXISTS travel_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id uuid NOT NULL REFERENCES travel_categories(id) ON DELETE CASCADE,
  title text NOT NULL,
  price decimal(10,2) NOT NULL DEFAULT 0,
  location text NOT NULL DEFAULT '',
  image_url text NOT NULL DEFAULT '',
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_travel_items_category_id ON travel_items(category_id);

-- Travel bookings table
CREATE TABLE IF NOT EXISTS travel_bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  travel_id uuid NOT NULL REFERENCES travel_items(id) ON DELETE CASCADE,
  date_from date NOT NULL,
  date_to date NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_travel_bookings_user_id ON travel_bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_travel_bookings_travel_id ON travel_bookings(travel_id);
CREATE INDEX IF NOT EXISTS idx_travel_bookings_status ON travel_bookings(status);

-- Travel banners table
CREATE TABLE IF NOT EXISTS travel_banners (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url text NOT NULL DEFAULT '',
  text text NOT NULL DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- =====================================================
-- YOGA SITE TABLES
-- =====================================================

-- Yoga courses table
CREATE TABLE IF NOT EXISTS yoga_courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  type text NOT NULL DEFAULT 'online' CHECK (type IN ('online', 'offline', 'travel', 'free')),
  price decimal(10,2) NOT NULL DEFAULT 0,
  description text NOT NULL DEFAULT '',
  image_url text NOT NULL DEFAULT '',
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_yoga_courses_type ON yoga_courses(type);

-- Yoga bookings table
CREATE TABLE IF NOT EXISTS yoga_bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  course_id uuid NOT NULL REFERENCES yoga_courses(id) ON DELETE CASCADE,
  schedule timestamptz NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_yoga_bookings_user_id ON yoga_bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_yoga_bookings_course_id ON yoga_bookings(course_id);

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE travel_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE travel_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE travel_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE travel_banners ENABLE ROW LEVEL SECURITY;
ALTER TABLE yoga_courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE yoga_bookings ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- RLS POLICIES - USERS TABLE
-- =====================================================

CREATE POLICY "Admins can view all users"
  ON users FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid() AND users.role = 'admin'
    )
  );

CREATE POLICY "Users can view own profile"
  ON users FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Admins can insert users"
  ON users FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid() AND users.role = 'admin'
    )
  );

CREATE POLICY "Admins can update all users"
  ON users FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid() AND users.role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid() AND users.role = 'admin'
    )
  );

CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id AND role = 'user');

CREATE POLICY "Admins can delete users"
  ON users FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid() AND users.role = 'admin'
    )
  );

-- =====================================================
-- RLS POLICIES - PORTFOLIO LESSONS
-- =====================================================

CREATE POLICY "Anyone can view portfolio lessons"
  ON portfolio_lessons FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can insert portfolio lessons"
  ON portfolio_lessons FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid() AND users.role = 'admin'
    )
  );

CREATE POLICY "Admins can update portfolio lessons"
  ON portfolio_lessons FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid() AND users.role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid() AND users.role = 'admin'
    )
  );

CREATE POLICY "Admins can delete portfolio lessons"
  ON portfolio_lessons FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid() AND users.role = 'admin'
    )
  );

-- =====================================================
-- RLS POLICIES - PORTFOLIO REGISTRATIONS
-- =====================================================

CREATE POLICY "Users can view own registrations"
  ON portfolio_registrations FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all registrations"
  ON portfolio_registrations FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid() AND users.role = 'admin'
    )
  );

CREATE POLICY "Users can create own registrations"
  ON portfolio_registrations FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own registrations"
  ON portfolio_registrations FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can delete any registration"
  ON portfolio_registrations FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid() AND users.role = 'admin'
    )
  );

-- =====================================================
-- RLS POLICIES - TRAVEL CATEGORIES
-- =====================================================

CREATE POLICY "Anyone can view travel categories"
  ON travel_categories FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can insert travel categories"
  ON travel_categories FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid() AND users.role = 'admin'
    )
  );

CREATE POLICY "Admins can update travel categories"
  ON travel_categories FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid() AND users.role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid() AND users.role = 'admin'
    )
  );

CREATE POLICY "Admins can delete travel categories"
  ON travel_categories FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid() AND users.role = 'admin'
    )
  );

-- =====================================================
-- RLS POLICIES - TRAVEL ITEMS
-- =====================================================

CREATE POLICY "Anyone can view travel items"
  ON travel_items FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can insert travel items"
  ON travel_items FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid() AND users.role = 'admin'
    )
  );

CREATE POLICY "Admins can update travel items"
  ON travel_items FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid() AND users.role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid() AND users.role = 'admin'
    )
  );

CREATE POLICY "Admins can delete travel items"
  ON travel_items FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid() AND users.role = 'admin'
    )
  );

-- =====================================================
-- RLS POLICIES - TRAVEL BOOKINGS
-- =====================================================

CREATE POLICY "Users can view own travel bookings"
  ON travel_bookings FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all travel bookings"
  ON travel_bookings FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid() AND users.role = 'admin'
    )
  );

CREATE POLICY "Users can create own travel bookings"
  ON travel_bookings FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own travel bookings"
  ON travel_bookings FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can update any travel booking"
  ON travel_bookings FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid() AND users.role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid() AND users.role = 'admin'
    )
  );

CREATE POLICY "Users can delete own travel bookings"
  ON travel_bookings FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can delete any travel booking"
  ON travel_bookings FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid() AND users.role = 'admin'
    )
  );

-- =====================================================
-- RLS POLICIES - TRAVEL BANNERS
-- =====================================================

CREATE POLICY "Anyone can view travel banners"
  ON travel_banners FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can insert travel banners"
  ON travel_banners FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid() AND users.role = 'admin'
    )
  );

CREATE POLICY "Admins can update travel banners"
  ON travel_banners FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid() AND users.role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid() AND users.role = 'admin'
    )
  );

CREATE POLICY "Admins can delete travel banners"
  ON travel_banners FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid() AND users.role = 'admin'
    )
  );

-- =====================================================
-- RLS POLICIES - YOGA COURSES
-- =====================================================

CREATE POLICY "Anyone can view yoga courses"
  ON yoga_courses FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can insert yoga courses"
  ON yoga_courses FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid() AND users.role = 'admin'
    )
  );

CREATE POLICY "Admins can update yoga courses"
  ON yoga_courses FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid() AND users.role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid() AND users.role = 'admin'
    )
  );

CREATE POLICY "Admins can delete yoga courses"
  ON yoga_courses FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid() AND users.role = 'admin'
    )
  );

-- =====================================================
-- RLS POLICIES - YOGA BOOKINGS
-- =====================================================

CREATE POLICY "Users can view own yoga bookings"
  ON yoga_bookings FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all yoga bookings"
  ON yoga_bookings FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid() AND users.role = 'admin'
    )
  );

CREATE POLICY "Users can create own yoga bookings"
  ON yoga_bookings FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own yoga bookings"
  ON yoga_bookings FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can update any yoga booking"
  ON yoga_bookings FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid() AND users.role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid() AND users.role = 'admin'
    )
  );

CREATE POLICY "Users can delete own yoga bookings"
  ON yoga_bookings FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can delete any yoga booking"
  ON yoga_bookings FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid() AND users.role = 'admin'
    )
  );