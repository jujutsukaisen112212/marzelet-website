/*
  # Add analytics events table for tracking user interactions

  1. New Tables
    - `analytics_events`
      - `id` (uuid, primary key)
      - `event_type` (text, required)
      - `event_name` (text, required)
      - `user_id` (uuid, optional)
      - `session_id` (text)
      - `page_url` (text)
      - `referrer` (text)
      - `user_agent` (text)
      - `ip_address` (inet)
      - `country` (text)
      - `city` (text)
      - `device_type` (text)
      - `browser` (text)
      - `properties` (jsonb)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `analytics_events` table
    - Add policies for admin viewing only
*/

CREATE TABLE IF NOT EXISTS public.analytics_events (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT now(),
  event_type text NOT NULL CHECK (event_type IN (
    'page_view',
    'button_click',
    'form_submit',
    'download',
    'contact',
    'newsletter_signup',
    'project_inquiry',
    'review_submit',
    'blog_view',
    'portfolio_view'
  )),
  event_name text NOT NULL,
  user_id uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
  session_id text,
  page_url text,
  referrer text,
  user_agent text,
  ip_address inet,
  country text,
  city text,
  device_type text CHECK (device_type IN ('desktop', 'mobile', 'tablet')),
  browser text,
  properties jsonb DEFAULT '{}'::jsonb
);

ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;

-- Policies (Admin only)
CREATE POLICY "Admins can view analytics events"
  ON public.analytics_events
  FOR SELECT
  TO public
  USING (auth.email() = 'gowthamj0055@gmail.com');

CREATE POLICY "Anyone can insert analytics events"
  ON public.analytics_events
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Indexes for analytics queries
CREATE INDEX IF NOT EXISTS idx_analytics_event_type ON public.analytics_events(event_type);
CREATE INDEX IF NOT EXISTS idx_analytics_created_at ON public.analytics_events(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_user_id ON public.analytics_events(user_id);
CREATE INDEX IF NOT EXISTS idx_analytics_session_id ON public.analytics_events(session_id);
CREATE INDEX IF NOT EXISTS idx_analytics_page_url ON public.analytics_events(page_url);