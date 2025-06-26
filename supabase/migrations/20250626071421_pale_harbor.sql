/*
  # Add blog comments table

  1. New Tables
    - `blog_comments`
      - `id` (uuid, primary key)
      - `blog_id` (uuid, foreign key to blogs)
      - `user_id` (uuid, foreign key to profiles)
      - `parent_id` (uuid, self-referencing for replies)
      - `content` (text, required)
      - `is_approved` (boolean)
      - `is_featured` (boolean)
      - `likes_count` (integer)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `blog_comments` table
    - Add policies for public viewing and user management
*/

CREATE TABLE IF NOT EXISTS public.blog_comments (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  blog_id uuid REFERENCES public.blogs(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  parent_id uuid REFERENCES public.blog_comments(id) ON DELETE CASCADE,
  content text NOT NULL,
  is_approved boolean DEFAULT false,
  is_featured boolean DEFAULT false,
  likes_count integer DEFAULT 0
);

ALTER TABLE public.blog_comments ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Approved comments are viewable by everyone"
  ON public.blog_comments
  FOR SELECT
  TO public
  USING (is_approved = true);

CREATE POLICY "Users can view their own comments"
  ON public.blog_comments
  FOR SELECT
  TO public
  USING (auth.uid() = user_id);

CREATE POLICY "Authenticated users can insert comments"
  ON public.blog_comments
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own comments"
  ON public.blog_comments
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all comments"
  ON public.blog_comments
  FOR ALL
  TO public
  USING (auth.email() = 'gowthamj0055@gmail.com');

-- Indexes
CREATE INDEX IF NOT EXISTS idx_blog_comments_blog_id ON public.blog_comments(blog_id);
CREATE INDEX IF NOT EXISTS idx_blog_comments_user_id ON public.blog_comments(user_id);
CREATE INDEX IF NOT EXISTS idx_blog_comments_parent_id ON public.blog_comments(parent_id);
CREATE INDEX IF NOT EXISTS idx_blog_comments_approved ON public.blog_comments(is_approved);
CREATE INDEX IF NOT EXISTS idx_blog_comments_created_at ON public.blog_comments(created_at DESC);

-- Update trigger
CREATE TRIGGER update_blog_comments_updated_at
    BEFORE UPDATE ON public.blog_comments
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();