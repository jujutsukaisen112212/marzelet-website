/*
  # Add services table for dynamic service management

  1. New Tables
    - `services`
      - `id` (uuid, primary key)
      - `name` (text, required)
      - `slug` (text, unique, required)
      - `short_description` (text, required)
      - `long_description` (text)
      - `icon` (text)
      - `image` (text)
      - `features` (text array)
      - `technologies` (text array)
      - `starting_price` (decimal)
      - `price_range` (text)
      - `delivery_time` (text)
      - `category` (text)
      - `is_featured` (boolean)
      - `is_active` (boolean)
      - `display_order` (integer)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `services` table
    - Add policies for public viewing and admin management
*/

CREATE TABLE IF NOT EXISTS public.services (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  short_description text NOT NULL,
  long_description text,
  icon text,
  image text,
  features text[] DEFAULT '{}',
  technologies text[] DEFAULT '{}',
  starting_price decimal(10,2),
  price_range text,
  delivery_time text,
  category text CHECK (category IN (
    'development',
    'design',
    'marketing',
    'security',
    'analytics',
    'consulting'
  )),
  is_featured boolean DEFAULT false,
  is_active boolean DEFAULT true,
  display_order integer DEFAULT 0,
  meta_title text,
  meta_description text
);

ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Active services are viewable by everyone"
  ON public.services
  FOR SELECT
  TO public
  USING (is_active = true);

CREATE POLICY "Admins can manage services"
  ON public.services
  FOR ALL
  TO public
  USING (auth.email() = 'gowthamj0055@gmail.com');

-- Indexes
CREATE INDEX IF NOT EXISTS idx_services_slug ON public.services(slug);
CREATE INDEX IF NOT EXISTS idx_services_category ON public.services(category);
CREATE INDEX IF NOT EXISTS idx_services_featured ON public.services(is_featured);
CREATE INDEX IF NOT EXISTS idx_services_active ON public.services(is_active);
CREATE INDEX IF NOT EXISTS idx_services_display_order ON public.services(display_order);

-- Update trigger
CREATE TRIGGER update_services_updated_at
    BEFORE UPDATE ON public.services
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();