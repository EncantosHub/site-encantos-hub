-- Add column to store diagnostic results
ALTER TABLE public.gmn_leads 
ADD COLUMN diagnostic_results JSONB;