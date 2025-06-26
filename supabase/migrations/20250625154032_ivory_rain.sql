/*
  # Add newsletter subscriptions table

  1. New Tables
    - `newsletter_subscriptions`
      - `id` (uuid, primary key)
      - `email` (text, unique, required)
      - `name` (text, optional)
      - `subscribed_at` (timestamp)
      - `is_active` (boolean, default true)
      - `preferences` (jsonb, for subscription preferences)

  2. Security
    - Enable RLS on `newsletter_subscriptions` table
    - Add policies for admin management and public subscription
*/

CREATE TABLE IF NOT EXISTS public.newsletter_subscriptions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email text UNIQUE NOT NULL,
  name text,
  subscribed_at timestamp with time zone DEFAULT now(),
  is_active boolean DEFAULT true,
  preferences jsonb DEFAULT '{"marketing": true, "updates": true, "newsletters": true}'::jsonb
);

ALTER TABLE public.newsletter_subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view all newsletter subscriptions"
  ON public.newsletter_subscriptions
  FOR SELECT
  TO public
  USING (auth.email() = 'gowthamj0055@gmail.com');

CREATE POLICY "Admins can manage newsletter subscriptions"
  ON public.newsletter_subscriptions
  FOR ALL
  TO public
  USING (auth.email() = 'gowthamj0055@gmail.com');

CREATE POLICY "Anyone can subscribe to newsletter"
  ON public.newsletter_subscriptions
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Users can update their own subscription"
  ON public.newsletter_subscriptions
  FOR UPDATE
  TO public
  USING (email = auth.email());