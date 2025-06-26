/*
  # Add testimonials table (separate from reviews for marketing purposes)

  1. New Tables
    - `testimonials`
      - `id` (uuid, primary key)
      - `client_name` (text, required)
      - `client_position` (text)
      - `company_name` (text, required)
      - `company_logo` (text)
      - `testimonial_text` (text, required)
      - `rating` (integer, 1-5)
      - `project_type` (text)
      - `is_featured` (boolean)
      - `display_order` (integer)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `testimonials` table
    - Add policies for public viewing and admin management
*/

CREATE TABLE IF NOT EXISTS public.testimonials (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT now(),
  client_name text NOT NULL,
  client_position text,
  company_name text NOT NULL,
  company_logo text,
  testimonial_text text NOT NULL,
  rating integer CHECK (rating >= 1 AND rating <= 5) DEFAULT 5,
  project_type text CHECK (project_type IN (
    'web-development',
    'mobile-development',
    'ui-ux-design', 
    'digital-marketing',
    'data-analytics',
    'cybersecurity',
    'consulting',
    'other'
  )),
  is_featured boolean DEFAULT false,
  is_published boolean DEFAULT true,
  display_order integer DEFAULT 0
);

ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Published testimonials are viewable by everyone"
  ON public.testimonials
  FOR SELECT
  TO public
  USING (is_published = true);

CREATE POLICY "Admins can manage testimonials"
  ON public.testimonials
  FOR ALL
  TO public
  USING (auth.email() = 'gowthamj0055@gmail.com');

-- Indexes
CREATE INDEX IF NOT EXISTS idx_testimonials_featured ON public.testimonials(is_featured);
CREATE INDEX IF NOT EXISTS idx_testimonials_published ON public.testimonials(is_published);
CREATE INDEX IF NOT EXISTS idx_testimonials_display_order ON public.testimonials(display_order);
CREATE INDEX IF NOT EXISTS idx_testimonials_project_type ON public.testimonials(project_type);