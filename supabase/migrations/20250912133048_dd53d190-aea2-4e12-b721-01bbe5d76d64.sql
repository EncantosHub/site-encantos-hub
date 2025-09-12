-- Re-enable RLS with working policy
ALTER TABLE public.gmn_leads ENABLE ROW LEVEL SECURITY;

-- Create simple INSERT policy that works
CREATE POLICY "Allow insert for all"
ON public.gmn_leads
FOR INSERT
WITH CHECK (true);

-- Create admin SELECT policy
CREATE POLICY "Admin can select"
ON public.gmn_leads
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));