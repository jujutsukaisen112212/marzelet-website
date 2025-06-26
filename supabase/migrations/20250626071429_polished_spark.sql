/*
  # Add user activity logs table

  1. New Tables
    - `user_activity_logs`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to profiles)
      - `activity_type` (text, required)
      - `description` (text)
      - `metadata` (jsonb)
      - `ip_address` (inet)
      - `user_agent` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `user_activity_logs` table
    - Add policies for user and admin access
*/

CREATE TABLE IF NOT EXISTS public.user_activity_logs (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT now(),
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  activity_type text NOT NULL CHECK (activity_type IN (
    'login',
    'logout',
    'profile_update',
    'password_change',
    'review_submit',
    'comment_post',
    'project_inquiry',
    'newsletter_subscribe',
    'contact_submit'
  )),
  description text,
  metadata jsonb DEFAULT '{}'::jsonb,
  ip_address inet,
  user_agent text
);

ALTER TABLE public.user_activity_logs ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view their own activity logs"
  ON public.user_activity_logs
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "System can insert activity logs"
  ON public.user_activity_logs
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Admins can view all activity logs"
  ON public.user_activity_logs
  FOR SELECT
  TO public
  USING (auth.email() = 'gowthamj0055@gmail.com');

-- Indexes
CREATE INDEX IF NOT EXISTS idx_activity_logs_user_id ON public.user_activity_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_activity_logs_type ON public.user_activity_logs(activity_type);
CREATE INDEX IF NOT EXISTS idx_activity_logs_created_at ON public.user_activity_logs(created_at DESC);