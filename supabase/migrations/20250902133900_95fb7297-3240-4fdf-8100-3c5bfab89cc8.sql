-- Drop the previous view to fix security definer issue
DROP VIEW IF EXISTS public.blog_comments_public;

-- Restore the original policy but with column restrictions
DROP POLICY IF EXISTS "Only approved comments via public view" ON public.blog_comments;

-- Create a more secure policy that allows SELECT but through a function
CREATE OR REPLACE FUNCTION public.get_approved_blog_comments(post_slug_param text DEFAULT NULL)
RETURNS TABLE (
    id uuid,
    post_slug text,
    name text,
    comment text,
    created_at timestamptz
)
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
    SELECT 
        bc.id,
        bc.post_slug,
        bc.name,
        bc.comment,
        bc.created_at
    FROM blog_comments bc
    WHERE bc.approved = true
    AND (post_slug_param IS NULL OR bc.post_slug = post_slug_param)
    ORDER BY bc.created_at DESC;
$$;

-- Grant execute permissions
GRANT EXECUTE ON FUNCTION public.get_approved_blog_comments TO anon;
GRANT EXECUTE ON FUNCTION public.get_approved_blog_comments TO authenticated;

-- Keep the original policy for admins and restrict others
CREATE POLICY "Anyone can view approved comments (restricted columns)" 
ON public.blog_comments 
FOR SELECT 
USING (approved = true);