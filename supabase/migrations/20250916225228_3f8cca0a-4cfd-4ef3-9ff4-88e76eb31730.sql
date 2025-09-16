-- Create table for "Descubra seu Plano" form submissions
CREATE TABLE public.descubra_plano_leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  
  -- Company basic information
  nome_empresa TEXT NOT NULL,
  link_site TEXT,
  email TEXT NOT NULL,
  segmento TEXT NOT NULL,
  localizacao TEXT NOT NULL,
  
  -- Business diagnosis
  unidades TEXT NOT NULL,
  abrangencia TEXT NOT NULL,
  time_marketing TEXT NOT NULL,
  funcoes_internas TEXT[] DEFAULT '{}',
  gestao_site TEXT NOT NULL,
  ferramentas_instaladas TEXT[] DEFAULT '{}',
  investimento_anterior TEXT NOT NULL,
  faturamento TEXT NOT NULL,
  expectativa TEXT NOT NULL,
  
  -- Generated recommendation
  servico_recomendado TEXT NOT NULL,
  titulo_recomendacao TEXT NOT NULL,
  mensagem_recomendacao TEXT NOT NULL,
  link_recomendacao TEXT NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.descubra_plano_leads ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (anyone can insert leads)
CREATE POLICY "Anyone can insert descubra plano leads" 
ON public.descubra_plano_leads 
FOR INSERT 
WITH CHECK (true);

-- Only admins can view leads
CREATE POLICY "Only admins can view descubra plano leads" 
ON public.descubra_plano_leads 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_descubra_plano_leads_updated_at
BEFORE UPDATE ON public.descubra_plano_leads
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();