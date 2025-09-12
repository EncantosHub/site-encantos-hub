-- Re-enable RLS with the simplest possible policy
ALTER TABLE public.gmn_leads ENABLE ROW LEVEL SECURITY;

-- Drop all existing policies
DROP POLICY IF EXISTS "Enable insert for anon users" ON public.gmn_leads;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON public.gmn_leads;
DROP POLICY IF EXISTS "Admin select only" ON public.gmn_leads;

-- Create the simplest INSERT policy that allows everyone
CREATE POLICY "Allow all to insert"
ON public.gmn_leads
FOR INSERT
WITH CHECK (true);

-- Create admin-only SELECT policy
CREATE POLICY "Only admins can select"
ON public.gmn_leads
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));