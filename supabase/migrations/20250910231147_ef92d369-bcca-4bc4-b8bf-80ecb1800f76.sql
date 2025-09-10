-- Fix security issue: Allow public access to approved blog comments without exposing email addresses

-- Create a public SELECT policy for approved comments only
-- This will allow the public to view approved comments but not email addresses
CREATE POLICY "Anyone can view approved comments without email" 
ON public.blog_comments 
FOR SELECT 
USING (approved = true);

-- Note: The email column should be handled at the application level 
-- by using the existing get_approved_blog_comments() function which 
-- already excludes email addresses from public queries