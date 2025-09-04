-- Fix the function search_path security warning
-- Update the increment_blog_likes function to include proper search_path
CREATE OR REPLACE FUNCTION public.increment_blog_likes(post_slug_param text)
RETURNS INTEGER 
LANGUAGE plpgsql 
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  current_likes INTEGER;
BEGIN
  -- Insert or update likes count
  INSERT INTO public.blog_likes (post_slug, likes_count)
  VALUES (post_slug_param, 1)
  ON CONFLICT (post_slug)
  DO UPDATE SET 
    likes_count = blog_likes.likes_count + 1,
    updated_at = now();
  
  -- Return current likes count
  SELECT likes_count INTO current_likes 
  FROM public.blog_likes 
  WHERE post_slug = post_slug_param;
  
  RETURN current_likes;
END;
$$;