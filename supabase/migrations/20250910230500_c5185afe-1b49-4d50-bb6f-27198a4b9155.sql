-- Fix security issue: Add SELECT policies to protect customer email addresses
-- Only allow admins to view email leads and quiz responses

-- Add SELECT policy for gerador_avaliacoes_leads table
CREATE POLICY "Only admins can view email leads" 
ON public.gerador_avaliacoes_leads 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Add SELECT policy for gerador_avaliacoes_respostas table  
CREATE POLICY "Only admins can view quiz responses"
ON public.gerador_avaliacoes_respostas 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'::app_role));