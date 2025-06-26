/*
  # Add portfolio projects table

  1. New Tables
    - `portfolio_projects`
      - `id` (uuid, primary key)
      - `title` (text, required)
      - `description` (text, required)
      - `long_description` (text)
      - `image` (text, required)
      - `category` (text, required)
      - `technologies` (text array)
      - `demo_link` (text)
      - `github_link` (text)
      - `client_name` (text)
      - `project_duration` (text)
      - `completion_date` (date)
      - `is_featured` (boolean, default false)
      - `sort_order` (integer, default 0)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `portfolio_projects` table
    - Add policies for public viewing and admin management

  3. Indexes
    - Add performance indexes for common queries
*/

CREATE TABLE IF NOT EXISTS public.portfolio_projects (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  title text NOT NULL,
  description text NOT NULL,
  long_description text,
  image text NOT NULL,
  category text NOT NULL CHECK (category IN (
    'web-development',
    'mobile-development', 
    'ui-ux-design',
    'digital-marketing',
    'data-analytics',
    'cybersecurity',
    'e-commerce',
    'other'
  )),
  technologies text[] DEFAULT '{}',
  demo_link text,
  github_link text,
  client_name text,
  project_duration text,
  completion_date date,
  is_featured boolean DEFAULT false,
  is_published boolean DEFAULT true,
  sort_order integer DEFAULT 0,
  view_count integer DEFAULT 0,
  likes_count integer DEFAULT 0
);

ALTER TABLE public.portfolio_projects ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Published portfolio projects are viewable by everyone"
  ON public.portfolio_projects
  FOR SELECT
  TO public
  USING (is_published = true);

CREATE POLICY "Admins can view all portfolio projects"
  ON public.portfolio_projects
  FOR SELECT
  TO public
  USING (auth.email() = 'gowthamj0055@gmail.com');

CREATE POLICY "Admins can manage portfolio projects"
  ON public.portfolio_projects
  FOR ALL
  TO public
  USING (auth.email() = 'gowthamj0055@gmail.com');

-- Indexes
CREATE INDEX IF NOT EXISTS idx_portfolio_category ON public.portfolio_projects(category);
CREATE INDEX IF NOT EXISTS idx_portfolio_featured ON public.portfolio_projects(is_featured);
CREATE INDEX IF NOT EXISTS idx_portfolio_published ON public.portfolio_projects(is_published);
CREATE INDEX IF NOT EXISTS idx_portfolio_completion_date ON public.portfolio_projects(completion_date DESC);
CREATE INDEX IF NOT EXISTS idx_portfolio_sort_order ON public.portfolio_projects(sort_order);

-- Update trigger for updated_at
CREATE TRIGGER update_portfolio_projects_updated_at
    BEFORE UPDATE ON public.portfolio_projects
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();