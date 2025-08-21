-- Create leads table for GMN diagnostic
CREATE TABLE public.gmn_leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  company_name TEXT NOT NULL,
  form_data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.gmn_leads ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public inserts (since this is a lead capture form)
CREATE POLICY "Anyone can insert GMN leads" 
ON public.gmn_leads 
FOR INSERT 
TO anon, authenticated
WITH CHECK (true);

-- Create policy to allow reading own data (if we implement auth later)
CREATE POLICY "Users can view all GMN leads" 
ON public.gmn_leads 
FOR SELECT 
TO authenticated
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
NEW.updated_at = now();
RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_gmn_leads_updated_at
BEFORE UPDATE ON public.gmn_leads
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();