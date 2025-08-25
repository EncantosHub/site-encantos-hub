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
import CMSSEOChecklist from "./pages/CMSSEOChecklist";
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
          <Route path="/ferramentas/cms-seo-checklist" element={<CMSSEOChecklist />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

// Force build with timestamp: 2025-01-21T15:55:00Z

export default App;
