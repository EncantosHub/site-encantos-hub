-- Create tables for the message generator tool

-- Table to store email leads from the intro page
CREATE TABLE public.gerador_avaliacoes_leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table to store quiz responses
CREATE TABLE public.gerador_avaliacoes_respostas (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  client_profile TEXT NOT NULL,
  communication_channel TEXT NOT NULL,
  client_experience TEXT NOT NULL,
  include_extras TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.gerador_avaliacoes_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gerador_avaliacoes_respostas ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public access for lead generation
CREATE POLICY "Anyone can insert leads" 
ON public.gerador_avaliacoes_leads 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can insert quiz responses" 
ON public.gerador_avaliacoes_respostas 
FOR INSERT 
WITH CHECK (true);

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_gerador_avaliacoes_leads_updated_at
BEFORE UPDATE ON public.gerador_avaliacoes_leads
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_gerador_avaliacoes_respostas_updated_at
BEFORE UPDATE ON public.gerador_avaliacoes_respostas
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_gerador_avaliacoes_leads_email ON public.gerador_avaliacoes_leads(email);
CREATE INDEX idx_gerador_avaliacoes_leads_created_at ON public.gerador_avaliacoes_leads(created_at);
CREATE INDEX idx_gerador_avaliacoes_respostas_email ON public.gerador_avaliacoes_respostas(email);
CREATE INDEX idx_gerador_avaliacoes_respostas_created_at ON public.gerador_avaliacoes_respostas(created_at);