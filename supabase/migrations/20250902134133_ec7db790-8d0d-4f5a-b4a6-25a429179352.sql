-- Remove the policy that exposes email addresses
DROP POLICY IF EXISTS "Anyone can view approved comments (restricted columns)" ON public.blog_comments;

-- Verify our secure function exists and has proper permissions
-- The function get_approved_blog_comments already excludes email addresses
-- and should be the only way for public users to access comment data

-- Ensure the function is accessible to anonymous and authenticated users
GRANT EXECUTE ON FUNCTION public.get_approved_blog_comments TO anon;
GRANT EXECUTE ON FUNCTION public.get_approved_blog_comments TO authenticated;