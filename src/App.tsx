import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Ferramentas from "./pages/Ferramentas";
import DiagnosticoGMN from "./pages/DiagnosticoGMN";
import GeradorMensagensAvaliacoes from "./pages/GeradorMensagensAvaliacoes";
import GestaoCompleta from "./pages/GestaoCompleta";
import GestaoEssencial from "./pages/GestaoEssencial";
import GestaoLocal from "./pages/GestaoLocal";
import ConsultoriaEstrategica from "./pages/ConsultoriaEstrategica";
import DescubraSeuPlano from "./pages/DescubraSeuPlano";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/ferramentas" element={<Ferramentas />} />
          <Route path="/ferramentas/diagnostico-gmn" element={<DiagnosticoGMN />} />
          <Route path="/ferramentas/gerador-mensagens-avaliacoes" element={<GeradorMensagensAvaliacoes />} />
          <Route path="/servicos/gestao-completa" element={<GestaoCompleta />} />
          <Route path="/servicos/gestao-essencial" element={<GestaoEssencial />} />
          <Route path="/servicos/gestao-local" element={<GestaoLocal />} />
          <Route path="/servicos/consultoria" element={<ConsultoriaEstrategica />} />
          <Route path="/descubra-seu-plano" element={<DescubraSeuPlano />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

// Force build with timestamp: 2025-01-21T15:55:00Z

export default App;
