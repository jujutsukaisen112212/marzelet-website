/*
  # Enhance existing tables with additional features

  1. Enhancements to existing tables
    - Add view count and likes to blogs
    - Add helpful votes to reviews
    - Add profile enhancements
    - Add indexes for better performance

  2. New features
    - Blog categories and tags
    - Review moderation
    - User preferences
*/

-- Enhance blogs table
DO $$
BEGIN
  -- Add new columns to blogs if they don't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'blogs' AND column_name = 'view_count'
  ) THEN
    ALTER TABLE public.blogs ADD COLUMN view_count integer DEFAULT 0;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'blogs' AND column_name = 'likes_count'
  ) THEN
    ALTER TABLE public.blogs ADD COLUMN likes_count integer DEFAULT 0;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'blogs' AND column_name = 'tags'
  ) THEN
    ALTER TABLE public.blogs ADD COLUMN tags text[] DEFAULT '{}';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'blogs' AND column_name = 'is_published'
  ) THEN
    ALTER TABLE public.blogs ADD COLUMN is_published boolean DEFAULT true;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'blogs' AND column_name = 'meta_description'
  ) THEN
    ALTER TABLE public.blogs ADD COLUMN meta_description text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'blogs' AND column_name = 'reading_time'
  ) THEN
    ALTER TABLE public.blogs ADD COLUMN reading_time integer; -- in minutes
  END IF;
END $$;

-- Enhance reviews table
DO $$
BEGIN
  -- Add new columns to reviews if they don't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'reviews' AND column_name = 'helpful_votes'
  ) THEN
    ALTER TABLE public.reviews ADD COLUMN helpful_votes integer DEFAULT 0;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'reviews' AND column_name = 'is_verified'
  ) THEN
    ALTER TABLE public.reviews ADD COLUMN is_verified boolean DEFAULT false;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'reviews' AND column_name = 'service_type'
  ) THEN
    ALTER TABLE public.reviews ADD COLUMN service_type text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'reviews' AND column_name = 'is_featured'
  ) THEN
    ALTER TABLE public.reviews ADD COLUMN is_featured boolean DEFAULT false;
  END IF;
END $$;

-- Enhance profiles table
DO $$
BEGIN
  -- Add new columns to profiles if they don't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'first_name'
  ) THEN
    ALTER TABLE public.profiles ADD COLUMN first_name text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'last_name'
  ) THEN
    ALTER TABLE public.profiles ADD COLUMN last_name text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'avatar_url'
  ) THEN
    ALTER TABLE public.profiles ADD COLUMN avatar_url text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'bio'
  ) THEN
    ALTER TABLE public.profiles ADD COLUMN bio text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'company'
  ) THEN
    ALTER TABLE public.profiles ADD COLUMN company text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'website'
  ) THEN
    ALTER TABLE public.profiles ADD COLUMN website text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'phone'
  ) THEN
    ALTER TABLE public.profiles ADD COLUMN phone text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'preferences'
  ) THEN
    ALTER TABLE public.profiles ADD COLUMN preferences jsonb DEFAULT '{
      "email_notifications": true,
      "marketing_emails": false,
      "security_alerts": true,
      "project_updates": true
    }'::jsonb;
  END IF;
END $$;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_blogs_category ON public.blogs(category);
CREATE INDEX IF NOT EXISTS idx_blogs_author ON public.blogs(author);
CREATE INDEX IF NOT EXISTS idx_blogs_created_at ON public.blogs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_blogs_is_published ON public.blogs(is_published);

CREATE INDEX IF NOT EXISTS idx_reviews_rating ON public.reviews(rating);
CREATE INDEX IF NOT EXISTS idx_reviews_created_at ON public.reviews(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_reviews_user_id ON public.reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_reviews_is_featured ON public.reviews(is_featured);

CREATE INDEX IF NOT EXISTS idx_profiles_username ON public.profiles(username);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);

-- Update RLS policies for enhanced blogs table
DROP POLICY IF EXISTS "Blogs are viewable by everyone" ON public.blogs;
CREATE POLICY "Published blogs are viewable by everyone"
  ON public.blogs
  FOR SELECT
  TO public
  USING (is_published = true);

CREATE POLICY "Admins can view all blogs"
  ON public.blogs
  FOR SELECT
  TO public
  USING (auth.email() = 'gowthamj0055@gmail.com');