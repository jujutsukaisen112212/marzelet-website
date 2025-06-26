/*
  # Add team members table

  1. New Tables
    - `team_members`
      - `id` (uuid, primary key)
      - `name` (text, required)
      - `position` (text, required)
      - `bio` (text)
      - `avatar` (text)
      - `email` (text)
      - `linkedin_url` (text)
      - `github_url` (text)
      - `twitter_url` (text)
      - `skills` (text array)
      - `years_experience` (integer)
      - `is_featured` (boolean)
      - `display_order` (integer)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `team_members` table
    - Add policies for public viewing and admin management
*/

CREATE TABLE IF NOT EXISTS public.team_members (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT now(),
  name text NOT NULL,
  position text NOT NULL,
  bio text,
  avatar text,
  email text,
  linkedin_url text,
  github_url text,
  twitter_url text,
  skills text[] DEFAULT '{}',
  years_experience integer,
  is_featured boolean DEFAULT false,
  is_active boolean DEFAULT true,
  display_order integer DEFAULT 0
);

ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Active team members are viewable by everyone"
  ON public.team_members
  FOR SELECT
  TO public
  USING (is_active = true);

CREATE POLICY "Admins can manage team members"
  ON public.team_members
  FOR ALL
  TO public
  USING (auth.email() = 'gowthamj0055@gmail.com');

-- Indexes
CREATE INDEX IF NOT EXISTS idx_team_featured ON public.team_members(is_featured);
CREATE INDEX IF NOT EXISTS idx_team_active ON public.team_members(is_active);
CREATE INDEX IF NOT EXISTS idx_team_display_order ON public.team_members(display_order);