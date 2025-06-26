/*
  # Add contact submissions table

  1. New Tables
    - `contact_submissions`
      - `id` (uuid, primary key)
      - `name` (text, required)
      - `email` (text, required)
      - `company` (text, optional)
      - `phone` (text, optional)
      - `subject` (text, required)
      - `message` (text, required)
      - `status` (text, default 'new')
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `contact_submissions` table
    - Add policy for admin viewing and management
    - Add policy for users to submit their own forms
*/

CREATE TABLE IF NOT EXISTS public.contact_submissions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT now(),
  name text NOT NULL,
  email text NOT NULL,
  company text,
  phone text,
  subject text NOT NULL,
  message text NOT NULL,
  status text DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'resolved', 'closed')),
  admin_notes text
);

ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view all contact submissions"
  ON public.contact_submissions
  FOR SELECT
  TO public
  USING (auth.email() = 'gowthamj0055@gmail.com');

CREATE POLICY "Admins can manage contact submissions"
  ON public.contact_submissions
  FOR ALL
  TO public
  USING (auth.email() = 'gowthamj0055@gmail.com');

CREATE POLICY "Anyone can submit contact forms"
  ON public.contact_submissions
  FOR INSERT
  TO public
  WITH CHECK (true);