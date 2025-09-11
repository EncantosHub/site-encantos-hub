-- Re-enable RLS and create simple, working policies
ALTER TABLE public.gmn_leads ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "gmn_leads_insert_policy" ON public.gmn_leads;
DROP POLICY IF EXISTS "gmn_leads_select_policy" ON public.gmn_leads;

-- Create simple insert policy that allows everyone to insert
CREATE POLICY "Allow all inserts"
ON public.gmn_leads
FOR INSERT
WITH CHECK (true);

-- Create admin-only select policy
CREATE POLICY "Admin select only"
ON public.gmn_leads
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));