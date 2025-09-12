-- Re-enable RLS with correct policy for anonymous users
ALTER TABLE public.gmn_leads ENABLE ROW LEVEL SECURITY;

-- Drop any existing policies
DROP POLICY IF EXISTS "Allow all inserts" ON public.gmn_leads;
DROP POLICY IF EXISTS "Admin select only" ON public.gmn_leads;

-- Create INSERT policy that explicitly allows anonymous users
CREATE POLICY "Allow anonymous inserts"
ON public.gmn_leads
FOR INSERT
TO public, anon
WITH CHECK (true);

-- Create admin-only SELECT policy
CREATE POLICY "Admin select only"
ON public.gmn_leads
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));