-- Fix RLS policy for gmn_leads table to allow anonymous inserts
-- Since this is a lead capture form, it should be accessible to everyone

-- Drop the existing restrictive policy
DROP POLICY IF EXISTS "Anyone can insert GMN leads" ON public.gmn_leads;

-- Create a new policy that allows anonymous users to insert leads
CREATE POLICY "Allow anonymous lead insertion"
ON public.gmn_leads
FOR INSERT
TO anon, authenticated
WITH CHECK (true);