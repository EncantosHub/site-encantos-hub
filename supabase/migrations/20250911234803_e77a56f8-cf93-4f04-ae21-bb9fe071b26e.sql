-- Completely reset RLS policies for gmn_leads table
-- First, disable RLS temporarily
ALTER TABLE public.gmn_leads DISABLE ROW LEVEL SECURITY;

-- Drop all existing policies
DROP POLICY IF EXISTS "Allow anonymous lead insertion" ON public.gmn_leads;
DROP POLICY IF EXISTS "Only admins can view GMN leads" ON public.gmn_leads;

-- Re-enable RLS
ALTER TABLE public.gmn_leads ENABLE ROW LEVEL SECURITY;

-- Create very permissive insert policy for lead capture
CREATE POLICY "gmn_leads_insert_policy"
ON public.gmn_leads
FOR INSERT
TO public
WITH CHECK (true);

-- Create admin-only select policy
CREATE POLICY "gmn_leads_select_policy"
ON public.gmn_leads
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));