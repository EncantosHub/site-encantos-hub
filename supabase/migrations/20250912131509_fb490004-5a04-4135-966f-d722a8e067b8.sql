-- Let's check what's happening and recreate the table with proper settings
-- First, backup any existing data
CREATE TABLE gmn_leads_backup AS SELECT * FROM public.gmn_leads;

-- Drop the table completely
DROP TABLE public.gmn_leads CASCADE;

-- Recreate the table with explicit settings
CREATE TABLE public.gmn_leads (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    full_name text NOT NULL,
    email text NOT NULL,
    whatsapp text NOT NULL,
    company_name text NOT NULL,
    form_data jsonb NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.gmn_leads ENABLE ROW LEVEL SECURITY;

-- Create simple policies
CREATE POLICY "Enable insert access for all users" ON public.gmn_leads
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable read access for admins only" ON public.gmn_leads
    FOR SELECT USING (has_role(auth.uid(), 'admin'::app_role));

-- Restore data if any existed
INSERT INTO public.gmn_leads SELECT * FROM gmn_leads_backup;

-- Drop backup table
DROP TABLE gmn_leads_backup;