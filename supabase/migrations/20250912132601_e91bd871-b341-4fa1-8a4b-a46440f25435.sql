-- Completely disable RLS and remove all policies for testing
ALTER TABLE public.gmn_leads DISABLE ROW LEVEL SECURITY;

-- Drop all policies
DROP POLICY IF EXISTS "Enable insert access for all users" ON public.gmn_leads;
DROP POLICY IF EXISTS "Enable read access for admins only" ON public.gmn_leads;