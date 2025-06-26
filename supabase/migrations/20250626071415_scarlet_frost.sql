/*
  # Add FAQs table for dynamic FAQ management

  1. New Tables
    - `faqs`
      - `id` (uuid, primary key)
      - `question` (text, required)
      - `answer` (text, required)
      - `category` (text, required)
      - `is_featured` (boolean)
      - `display_order` (integer)
      - `view_count` (integer)
      - `helpful_count` (integer)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `faqs` table
    - Add policies for public viewing and admin management
*/

CREATE TABLE IF NOT EXISTS public.faqs (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  question text NOT NULL,
  answer text NOT NULL,
  category text NOT NULL CHECK (category IN (
    'general',
    'services',
    'pricing',
    'process',
    'technical',
    'support'
  )),
  is_featured boolean DEFAULT false,
  is_published boolean DEFAULT true,
  display_order integer DEFAULT 0,
  view_count integer DEFAULT 0,
  helpful_count integer DEFAULT 0,
  tags text[] DEFAULT '{}'
);

ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Published FAQs are viewable by everyone"
  ON public.faqs
  FOR SELECT
  TO public
  USING (is_published = true);

CREATE POLICY "Admins can manage FAQs"
  ON public.faqs
  FOR ALL
  TO public
  USING (auth.email() = 'gowthamj0055@gmail.com');

-- Indexes
CREATE INDEX IF NOT EXISTS idx_faqs_category ON public.faqs(category);
CREATE INDEX IF NOT EXISTS idx_faqs_featured ON public.faqs(is_featured);
CREATE INDEX IF NOT EXISTS idx_faqs_published ON public.faqs(is_published);
CREATE INDEX IF NOT EXISTS idx_faqs_display_order ON public.faqs(display_order);

-- Update trigger
CREATE TRIGGER update_faqs_updated_at
    BEFORE UPDATE ON public.faqs
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();