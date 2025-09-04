-- Create table for blog post likes
CREATE TABLE public.blog_likes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  post_slug TEXT NOT NULL UNIQUE,
  likes_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.blog_likes ENABLE ROW LEVEL SECURITY;

-- Create policies for public access
CREATE POLICY "Anyone can view blog likes" 
ON public.blog_likes 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can insert blog likes" 
ON public.blog_likes 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can update blog likes" 
ON public.blog_likes 
FOR UPDATE 
USING (true);

-- Create function to increment likes safely
CREATE OR REPLACE FUNCTION public.increment_blog_likes(post_slug_param text)
RETURNS INTEGER AS $$
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
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission to anonymous and authenticated users
GRANT EXECUTE ON FUNCTION public.increment_blog_likes TO anon;
GRANT EXECUTE ON FUNCTION public.increment_blog_likes TO authenticated;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_blog_likes_updated_at
BEFORE UPDATE ON public.blog_likes
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();