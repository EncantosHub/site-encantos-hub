-- Enable Row Level Security on gmn_leads table
ALTER TABLE public.gmn_leads ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert GMN leads
CREATE POLICY "Anyone can insert gmn leads" 
ON public.gmn_leads 
FOR INSERT 
WITH CHECK (true);

-- Create policy to allow only admins to view GMN leads
CREATE POLICY "Only admins can view gmn leads" 
ON public.gmn_leads 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'::app_role));