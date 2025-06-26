/*
  # Add project inquiries table

  1. New Tables
    - `project_inquiries`
      - `id` (uuid, primary key)
      - `user_id` (uuid, optional foreign key to profiles)
      - `name` (text, required)
      - `email` (text, required)
      - `company` (text, optional)
      - `phone` (text, optional)
      - `service_type` (text, required)
      - `budget_range` (text, optional)
      - `timeline` (text, optional)
      - `project_description` (text, required)
      - `requirements` (jsonb, for detailed requirements)
      - `status` (text, default 'new')
      - `priority` (text, default 'medium')
      - `assigned_to` (text, optional)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `project_inquiries` table
    - Add policies for admin management and user submission
*/

CREATE TABLE IF NOT EXISTS public.project_inquiries (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  user_id uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
  name text NOT NULL,
  email text NOT NULL,
  company text,
  phone text,
  service_type text NOT NULL CHECK (service_type IN (
    'web-development', 
    'mobile-development', 
    'ui-ux-design', 
    'digital-marketing', 
    'data-analytics', 
    'cybersecurity',
    'it-security',
    'other'
  )),
  budget_range text CHECK (budget_range IN (
    'under-5k', 
    '5k-15k', 
    '15k-50k', 
    '50k-100k', 
    'over-100k', 
    'discuss'
  )),
  timeline text CHECK (timeline IN (
    'asap', 
    '1-month', 
    '2-3-months', 
    '3-6-months', 
    '6-months-plus', 
    'flexible'
  )),
  project_description text NOT NULL,
  requirements jsonb DEFAULT '{}'::jsonb,
  status text DEFAULT 'new' CHECK (status IN (
    'new', 
    'reviewing', 
    'quoted', 
    'approved', 
    'in_progress', 
    'completed', 
    'cancelled'
  )),
  priority text DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  assigned_to text,
  admin_notes text
);

ALTER TABLE public.project_inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view all project inquiries"
  ON public.project_inquiries
  FOR SELECT
  TO public
  USING (auth.email() = 'gowthamj0055@gmail.com');

CREATE POLICY "Admins can manage project inquiries"
  ON public.project_inquiries
  FOR ALL
  TO public
  USING (auth.email() = 'gowthamj0055@gmail.com');

CREATE POLICY "Users can view their own project inquiries"
  ON public.project_inquiries
  FOR SELECT
  TO public
  USING (auth.uid() = user_id OR email = auth.email());

CREATE POLICY "Anyone can submit project inquiries"
  ON public.project_inquiries
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_project_inquiries_updated_at
    BEFORE UPDATE ON public.project_inquiries
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();