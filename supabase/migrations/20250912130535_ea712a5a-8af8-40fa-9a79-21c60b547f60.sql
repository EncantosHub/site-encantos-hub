-- Fix RLS policies for gmn_leads to properly allow anonymous inserts
DROP POLICY IF EXISTS "Allow anonymous inserts" ON public.gmn_leads;
DROP POLICY IF EXISTS "Admin select only" ON public.gmn_leads;

-- Create INSERT policy specifically for anon role
CREATE POLICY "Enable insert for anon users"
ON public.gmn_leads
FOR INSERT
TO anon
WITH CHECK (true);

-- Create INSERT policy for authenticated users as well
CREATE POLICY "Enable insert for authenticated users" 
ON public.gmn_leads
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Create admin-only SELECT policy
CREATE POLICY "Admin select only"
ON public.gmn_leads
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));