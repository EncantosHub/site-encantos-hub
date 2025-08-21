-- Fix critical security issue: Remove overly permissive SELECT policy
DROP POLICY IF EXISTS "Users can view all GMN leads" ON public.gmn_leads;

-- Create a restrictive policy that only allows admins to view leads
-- Since no authentication system is implemented yet, we'll create a policy that requires
-- explicit admin access via a security definer function

-- First, create an enum for roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table for proper role management
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Create restrictive policy for GMN leads - only admins can view
CREATE POLICY "Only admins can view GMN leads" 
ON public.gmn_leads 
FOR SELECT 
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Policy for user_roles table - users can only see their own roles
CREATE POLICY "Users can view own roles" 
ON public.user_roles 
FOR SELECT 
TO authenticated
USING (user_id = auth.uid());

-- Only admins can manage roles
CREATE POLICY "Admins can manage all roles" 
ON public.user_roles 
FOR ALL 
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));