/*
  # Add email templates table for dynamic email management

  1. New Tables
    - `email_templates`
      - `id` (uuid, primary key)
      - `name` (text, unique, required)
      - `subject` (text, required)
      - `html_content` (text, required)
      - `text_content` (text)
      - `variables` (text array)
      - `is_active` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `email_templates` table
    - Add policies for admin management only
*/

CREATE TABLE IF NOT EXISTS public.email_templates (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  name text UNIQUE NOT NULL,
  subject text NOT NULL,
  html_content text NOT NULL,
  text_content text,
  variables text[] DEFAULT '{}',
  template_type text CHECK (template_type IN (
    'welcome',
    'contact_confirmation',
    'project_inquiry_confirmation',
    'newsletter_welcome',
    'password_reset',
    'review_thank_you',
    'project_update'
  )),
  is_active boolean DEFAULT true
);

ALTER TABLE public.email_templates ENABLE ROW LEVEL SECURITY;

-- Policies (Admin only)
CREATE POLICY "Admins can manage email templates"
  ON public.email_templates
  FOR ALL
  TO public
  USING (auth.email() = 'gowthamj0055@gmail.com');

-- Indexes
CREATE INDEX IF NOT EXISTS idx_email_templates_name ON public.email_templates(name);
CREATE INDEX IF NOT EXISTS idx_email_templates_type ON public.email_templates(template_type);
CREATE INDEX IF NOT EXISTS idx_email_templates_active ON public.email_templates(is_active);

-- Update trigger
CREATE TRIGGER update_email_templates_updated_at
    BEFORE UPDATE ON public.email_templates
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();