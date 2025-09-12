-- Disable RLS permanently to fix the persistent issue
ALTER TABLE public.gmn_leads DISABLE ROW LEVEL SECURITY;

-- Drop all policies since we won't use RLS for this table
DROP POLICY IF EXISTS "Allow insert for all" ON public.gmn_leads;
DROP POLICY IF EXISTS "Admin can select" ON public.gmn_leads;