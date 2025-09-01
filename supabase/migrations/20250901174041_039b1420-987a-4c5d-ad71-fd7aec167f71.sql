-- Create a secure view for public blog comments that excludes sensitive information
CREATE OR REPLACE VIEW public.blog_comments_public AS
SELECT 
    id,
    post_slug,
    name,
    comment,
    created_at
FROM public.blog_comments
WHERE approved = true;

-- Grant SELECT permission on the view to anonymous users
GRANT SELECT ON public.blog_comments_public TO anon;
GRANT SELECT ON public.blog_comments_public TO authenticated;

-- Update the existing RLS policy to be more restrictive for direct table access
DROP POLICY IF EXISTS "Anyone can view approved comments" ON public.blog_comments;

-- Create a new policy that only allows admins to SELECT from the main table
CREATE POLICY "Only approved comments via public view" 
ON public.blog_comments 
FOR SELECT 
USING (false); -- This prevents direct SELECT on the table

-- Keep the admin policy for full access
-- (This already exists: "Admins can view all comments")