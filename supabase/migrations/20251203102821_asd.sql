-- Migration: ensure correct datatypes and defaults for unified admin schema
-- This migration is idempotent: it checks for columns/constraints/indexes before applying changes.

-- Helper: alter column type safely if column exists and type differs

-- USERS
DO $$
BEGIN
	IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='id') THEN
		BEGIN
			ALTER TABLE users ALTER COLUMN id SET DEFAULT gen_random_uuid();
			-- try to cast to uuid if not already
			BEGIN
				ALTER TABLE users ALTER COLUMN id TYPE uuid USING (id::uuid);
			EXCEPTION WHEN others THEN
				-- ignore cast errors; maybe already uuid or non-castable values
				RAISE NOTICE 'Could not cast users.id to uuid - skipping';
			END;
		END;
	END IF;

	IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='created_at') THEN
		EXECUTE 'ALTER TABLE users ALTER COLUMN created_at TYPE timestamptz USING created_at::timestamptz';
		EXECUTE 'ALTER TABLE users ALTER COLUMN created_at SET DEFAULT now()';
	END IF;

	-- ensure role has default and check constraint
	IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='role') THEN
		EXECUTE 'ALTER TABLE users ALTER COLUMN role TYPE text USING role::text';
		EXECUTE 'ALTER TABLE users ALTER COLUMN role SET DEFAULT ''user''';
	END IF;

	-- index on email if column exists
	IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='email') THEN
		IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE tablename='users' AND indexname='idx_users_email') THEN
			EXECUTE 'CREATE INDEX idx_users_email ON users(email)';
		END IF;
	END IF;
END$$;

-- PORTFOLIO LESSONS
DO $$
BEGIN
	IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name='portfolio_lessons') THEN
		BEGIN
			EXECUTE 'ALTER TABLE portfolio_lessons ALTER COLUMN id SET DEFAULT gen_random_uuid()';
			BEGIN
				EXECUTE 'ALTER TABLE portfolio_lessons ALTER COLUMN id TYPE uuid USING id::uuid';
			EXCEPTION WHEN others THEN
				RAISE NOTICE 'Could not cast portfolio_lessons.id to uuid - skipping';
			END;

			EXECUTE 'ALTER TABLE portfolio_lessons ALTER COLUMN title TYPE text USING title::text';
			EXECUTE 'ALTER TABLE portfolio_lessons ALTER COLUMN description TYPE text USING description::text';
			EXECUTE 'ALTER TABLE portfolio_lessons ALTER COLUMN video_url TYPE text USING video_url::text';
			EXECUTE 'ALTER TABLE portfolio_lessons ALTER COLUMN created_at TYPE timestamptz USING created_at::timestamptz';
			EXECUTE 'ALTER TABLE portfolio_lessons ALTER COLUMN created_at SET DEFAULT now()';
		END;
	END IF;
END$$;

-- PORTFOLIO REGISTRATIONS
DO $$
BEGIN
	IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name='portfolio_registrations') THEN
		BEGIN
			EXECUTE 'ALTER TABLE portfolio_registrations ALTER COLUMN id SET DEFAULT gen_random_uuid()';
			BEGIN
				EXECUTE 'ALTER TABLE portfolio_registrations ALTER COLUMN id TYPE uuid USING id::uuid';
			EXCEPTION WHEN others THEN
				RAISE NOTICE 'Could not cast portfolio_registrations.id to uuid - skipping';
			END;

			IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='portfolio_registrations' AND column_name='user_id') THEN
				BEGIN
					EXECUTE 'ALTER TABLE portfolio_registrations ALTER COLUMN user_id TYPE uuid USING user_id::uuid';
				EXCEPTION WHEN others THEN
					RAISE NOTICE 'Could not cast portfolio_registrations.user_id to uuid - skipping';
				END;
			END IF;

			IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='portfolio_registrations' AND column_name='lesson_id') THEN
				BEGIN
					EXECUTE 'ALTER TABLE portfolio_registrations ALTER COLUMN lesson_id TYPE uuid USING lesson_id::uuid';
				EXCEPTION WHEN others THEN
					RAISE NOTICE 'Could not cast portfolio_registrations.lesson_id to uuid - skipping';
				END;
			END IF;

			EXECUTE 'ALTER TABLE portfolio_registrations ALTER COLUMN created_at TYPE timestamptz USING created_at::timestamptz';
			EXECUTE 'ALTER TABLE portfolio_registrations ALTER COLUMN created_at SET DEFAULT now()';
		END;
	END IF;
END$$;

-- TRAVEL CATEGORIES
DO $$
BEGIN
	IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name='travel_categories') THEN
		BEGIN
			EXECUTE 'ALTER TABLE travel_categories ALTER COLUMN id SET DEFAULT gen_random_uuid()';
			BEGIN
				EXECUTE 'ALTER TABLE travel_categories ALTER COLUMN id TYPE uuid USING id::uuid';
			EXCEPTION WHEN others THEN
				RAISE NOTICE 'Could not cast travel_categories.id to uuid - skipping';
			END;

			EXECUTE 'ALTER TABLE travel_categories ALTER COLUMN name TYPE text USING name::text';
			EXECUTE 'ALTER TABLE travel_categories ALTER COLUMN icon TYPE text USING icon::text';
			EXECUTE 'ALTER TABLE travel_categories ALTER COLUMN created_at TYPE timestamptz USING created_at::timestamptz';
			EXECUTE 'ALTER TABLE travel_categories ALTER COLUMN created_at SET DEFAULT now()';
		END;
	END IF;
END$$;

-- TRAVEL ITEMS
DO $$
BEGIN
	IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name='travel_items') THEN
		BEGIN
			EXECUTE 'ALTER TABLE travel_items ALTER COLUMN id SET DEFAULT gen_random_uuid()';
			BEGIN
				EXECUTE 'ALTER TABLE travel_items ALTER COLUMN id TYPE uuid USING id::uuid';
			EXCEPTION WHEN others THEN
				RAISE NOTICE 'Could not cast travel_items.id to uuid - skipping';
			END;

			IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='travel_items' AND column_name='category_id') THEN
				BEGIN
					EXECUTE 'ALTER TABLE travel_items ALTER COLUMN category_id TYPE uuid USING category_id::uuid';
				EXCEPTION WHEN others THEN
					RAISE NOTICE 'Could not cast travel_items.category_id to uuid - skipping';
				END;
			END IF;

			EXECUTE 'ALTER TABLE travel_items ALTER COLUMN title TYPE text USING title::text';
			-- price to numeric(10,2)
			IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='travel_items' AND column_name='price') THEN
				BEGIN
					EXECUTE 'ALTER TABLE travel_items ALTER COLUMN price TYPE numeric(10,2) USING price::numeric';
					EXECUTE 'ALTER TABLE travel_items ALTER COLUMN price SET DEFAULT 0';
				EXCEPTION WHEN others THEN
					RAISE NOTICE 'Could not cast travel_items.price to numeric - skipping';
				END;
			END IF;

			EXECUTE 'ALTER TABLE travel_items ALTER COLUMN location TYPE text USING location::text';
			EXECUTE 'ALTER TABLE travel_items ALTER COLUMN image_url TYPE text USING image_url::text';
			-- optional fields
			IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='travel_items' AND column_name='country') THEN
				EXECUTE 'ALTER TABLE travel_items ALTER COLUMN country TYPE text USING country::text';
			END IF;
			IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='travel_items' AND column_name='description') THEN
				EXECUTE 'ALTER TABLE travel_items ALTER COLUMN description TYPE text USING description::text';
			END IF;

			EXECUTE 'ALTER TABLE travel_items ALTER COLUMN created_at TYPE timestamptz USING created_at::timestamptz';
			EXECUTE 'ALTER TABLE travel_items ALTER COLUMN created_at SET DEFAULT now()';
		END;
	END IF;
END$$;

-- TRAVEL BOOKINGS
DO $$
BEGIN
	IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name='travel_bookings') THEN
		BEGIN
			EXECUTE 'ALTER TABLE travel_bookings ALTER COLUMN id SET DEFAULT gen_random_uuid()';
			BEGIN
				EXECUTE 'ALTER TABLE travel_bookings ALTER COLUMN id TYPE uuid USING id::uuid';
			EXCEPTION WHEN others THEN
				RAISE NOTICE 'Could not cast travel_bookings.id to uuid - skipping';
			END;

			IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='travel_bookings' AND column_name='user_id') THEN
				EXECUTE 'ALTER TABLE travel_bookings ALTER COLUMN user_id TYPE uuid USING user_id::uuid';
			END IF;
			IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='travel_bookings' AND column_name='travel_id') THEN
				EXECUTE 'ALTER TABLE travel_bookings ALTER COLUMN travel_id TYPE uuid USING travel_id::uuid';
			END IF;

			IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='travel_bookings' AND column_name='date_from') THEN
				EXECUTE 'ALTER TABLE travel_bookings ALTER COLUMN date_from TYPE date USING date_from::date';
			END IF;
			IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='travel_bookings' AND column_name='date_to') THEN
				EXECUTE 'ALTER TABLE travel_bookings ALTER COLUMN date_to TYPE date USING date_to::date';
			END IF;

			IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='travel_bookings' AND column_name='status') THEN
				EXECUTE 'ALTER TABLE travel_bookings ALTER COLUMN status TYPE text USING status::text';
				-- add default if missing
				BEGIN
					EXECUTE 'ALTER TABLE travel_bookings ALTER COLUMN status SET DEFAULT ''pending''';
				EXCEPTION WHEN others THEN
					NULL;
				END;
			END IF;

			EXECUTE 'ALTER TABLE travel_bookings ALTER COLUMN created_at TYPE timestamptz USING created_at::timestamptz';
			EXECUTE 'ALTER TABLE travel_bookings ALTER COLUMN created_at SET DEFAULT now()';
		END;
	END IF;
END$$;

-- TRAVEL BANNERS
DO $$
BEGIN
	IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name='travel_banners') THEN
		BEGIN
			EXECUTE 'ALTER TABLE travel_banners ALTER COLUMN id SET DEFAULT gen_random_uuid()';
			BEGIN
				EXECUTE 'ALTER TABLE travel_banners ALTER COLUMN id TYPE uuid USING id::uuid';
			EXCEPTION WHEN others THEN
				RAISE NOTICE 'Could not cast travel_banners.id to uuid - skipping';
			END;

			EXECUTE 'ALTER TABLE travel_banners ALTER COLUMN image_url TYPE text USING image_url::text';
			EXECUTE 'ALTER TABLE travel_banners ALTER COLUMN text TYPE text USING text::text';
			EXECUTE 'ALTER TABLE travel_banners ALTER COLUMN created_at TYPE timestamptz USING created_at::timestamptz';
			EXECUTE 'ALTER TABLE travel_banners ALTER COLUMN created_at SET DEFAULT now()';
		END;
	END IF;
END$$;

-- YOGA COURSES
DO $$
BEGIN
	IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name='yoga_courses') THEN
		BEGIN
			EXECUTE 'ALTER TABLE yoga_courses ALTER COLUMN id SET DEFAULT gen_random_uuid()';
			BEGIN
				EXECUTE 'ALTER TABLE yoga_courses ALTER COLUMN id TYPE uuid USING id::uuid';
			EXCEPTION WHEN others THEN
				RAISE NOTICE 'Could not cast yoga_courses.id to uuid - skipping';
			END;

			EXECUTE 'ALTER TABLE yoga_courses ALTER COLUMN title TYPE text USING title::text';
			EXECUTE 'ALTER TABLE yoga_courses ALTER COLUMN type TYPE text USING type::text';
			BEGIN
				EXECUTE 'ALTER TABLE yoga_courses ALTER COLUMN price TYPE numeric(10,2) USING price::numeric';
				EXECUTE 'ALTER TABLE yoga_courses ALTER COLUMN price SET DEFAULT 0';
			EXCEPTION WHEN others THEN
				RAISE NOTICE 'Could not cast yoga_courses.price to numeric - skipping';
			END;
			EXECUTE 'ALTER TABLE yoga_courses ALTER COLUMN description TYPE text USING description::text';
			EXECUTE 'ALTER TABLE yoga_courses ALTER COLUMN image_url TYPE text USING image_url::text';
			EXECUTE 'ALTER TABLE yoga_courses ALTER COLUMN created_at TYPE timestamptz USING created_at::timestamptz';
			EXECUTE 'ALTER TABLE yoga_courses ALTER COLUMN created_at SET DEFAULT now()';
		END;
	END IF;
END$$;

-- YOGA BOOKINGS
DO $$
BEGIN
	IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name='yoga_bookings') THEN
		BEGIN
			EXECUTE 'ALTER TABLE yoga_bookings ALTER COLUMN id SET DEFAULT gen_random_uuid()';
			BEGIN
				EXECUTE 'ALTER TABLE yoga_bookings ALTER COLUMN id TYPE uuid USING id::uuid';
			EXCEPTION WHEN others THEN
				RAISE NOTICE 'Could not cast yoga_bookings.id to uuid - skipping';
			END;

			IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='yoga_bookings' AND column_name='user_id') THEN
				EXECUTE 'ALTER TABLE yoga_bookings ALTER COLUMN user_id TYPE uuid USING user_id::uuid';
			END IF;
			IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='yoga_bookings' AND column_name='course_id') THEN
				EXECUTE 'ALTER TABLE yoga_bookings ALTER COLUMN course_id TYPE uuid USING course_id::uuid';
			END IF;

			IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='yoga_bookings' AND column_name='schedule') THEN
				EXECUTE 'ALTER TABLE yoga_bookings ALTER COLUMN schedule TYPE timestamptz USING schedule::timestamptz';
			END IF;

			EXECUTE 'ALTER TABLE yoga_bookings ALTER COLUMN created_at TYPE timestamptz USING created_at::timestamptz';
			EXECUTE 'ALTER TABLE yoga_bookings ALTER COLUMN created_at SET DEFAULT now()';
		END;
	END IF;
END$$;

-- Indexes: create commonly used indexes if missing
DO $$
BEGIN
	IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name='portfolio_registrations') THEN
		IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE tablename='portfolio_registrations' AND indexname='idx_portfolio_registrations_user_id') THEN
			EXECUTE 'CREATE INDEX idx_portfolio_registrations_user_id ON portfolio_registrations(user_id)';
		END IF;
		IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE tablename='portfolio_registrations' AND indexname='idx_portfolio_registrations_lesson_id') THEN
			EXECUTE 'CREATE INDEX idx_portfolio_registrations_lesson_id ON portfolio_registrations(lesson_id)';
		END IF;
	END IF;

	IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name='travel_items') THEN
		IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE tablename='travel_items' AND indexname='idx_travel_items_category_id') THEN
			EXECUTE 'CREATE INDEX idx_travel_items_category_id ON travel_items(category_id)';
		END IF;
	END IF;

	IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name='travel_bookings') THEN
		IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE tablename='travel_bookings' AND indexname='idx_travel_bookings_user_id') THEN
			EXECUTE 'CREATE INDEX idx_travel_bookings_user_id ON travel_bookings(user_id)';
		END IF;
		IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE tablename='travel_bookings' AND indexname='idx_travel_bookings_travel_id') THEN
			EXECUTE 'CREATE INDEX idx_travel_bookings_travel_id ON travel_bookings(travel_id)';
		END IF;
		IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE tablename='travel_bookings' AND indexname='idx_travel_bookings_status') THEN
			EXECUTE 'CREATE INDEX idx_travel_bookings_status ON travel_bookings(status)';
		END IF;
	END IF;

	IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name='yoga_courses') THEN
		IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE tablename='yoga_courses' AND indexname='idx_yoga_courses_type') THEN
			EXECUTE 'CREATE INDEX idx_yoga_courses_type ON yoga_courses(type)';
		END IF;
	END IF;
END$$;

-- Add check constraints for enums if missing
DO $$
BEGIN
	-- users.role
	IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'users_role_check') THEN
		BEGIN
			EXECUTE 'ALTER TABLE users ADD CONSTRAINT users_role_check CHECK (role IN (''admin'',''user''))';
		EXCEPTION WHEN others THEN
			RAISE NOTICE 'Could not add users_role_check constraint - it may already exist or conflict';
		END;
	END IF;

	-- travel_bookings.status
	IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'travel_bookings_status_check') THEN
		BEGIN
			EXECUTE 'ALTER TABLE travel_bookings ADD CONSTRAINT travel_bookings_status_check CHECK (status IN (''pending'',''confirmed'',''cancelled''))';
		EXCEPTION WHEN others THEN
			RAISE NOTICE 'Could not add travel_bookings_status_check constraint - it may already exist or conflict';
		END;
	END IF;

	-- yoga_courses.type
	IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'yoga_courses_type_check') THEN
		BEGIN
			EXECUTE 'ALTER TABLE yoga_courses ADD CONSTRAINT yoga_courses_type_check CHECK (type IN (''online'',''offline'',''travel'',''free''))';
		EXCEPTION WHEN others THEN
			RAISE NOTICE 'Could not add yoga_courses_type_check constraint - it may already exist or conflict';
		END;
	END IF;
END$$;

-- End of migration
