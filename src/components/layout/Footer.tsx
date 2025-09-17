import { Link } from "react-router-dom";
import { Phone, Mail, Instagram, Linkedin, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
const Footer = () => {
  return <footer className="bg-brand-black text-brand-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo + Institucional */}
          <div className="space-y-4">
            <div className="flex items-center justify-center md:justify-start">
              <img 
                src="/lovable-uploads/50eafc97-7976-48cf-86d3-511cd2eb5e68.png" 
                alt="EncantosHub" 
                className="h-16 w-auto"
              />
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
          </p>
          </div>

          {/* Serviços */}
          <div>
            <h3 className="text-brand-gold font-semibold mb-4">Serviços</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/#solucoes" className="text-gray-300 hover:text-brand-gold transition-smooth">Gestão de SEO para Sites</Link></li>
              <li><Link to="/#solucoes" className="text-gray-300 hover:text-brand-gold transition-smooth">Gestão Local para Franquias</Link></li>
              <li><Link to="/#solucoes" className="text-gray-300 hover:text-brand-gold transition-smooth">Presença Digital para PME's</Link></li>
              <li><Link to="/#solucoes" className="text-gray-300 hover:text-brand-gold transition-smooth">Mentoria de SEO</Link></li>
              <li><Link to="/#solucoes" className="text-gray-300 hover:text-brand-gold transition-smooth">Consultoria de SEO</Link></li>
            </ul>
          </div>

          {/* Produtos e Ferramentas */}
          <div>
            <h3 className="text-brand-gold font-semibold mb-4">Produtos e Ferramentas</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/ferramentas" className="text-gray-300 hover:text-brand-gold transition-smooth">Diagnóstico GMN</Link></li>
              <li><Link to="/ferramentas" className="text-gray-300 hover:text-brand-gold transition-smooth">Gerador de Mensagens</Link></li>
              <li><Link to="/ferramentas" className="text-gray-300 hover:text-brand-gold transition-smooth">Validador de SEO</Link></li>
              <li><Link to="/blog" className="text-gray-300 hover:text-brand-gold transition-smooth">Blog Encantos</Link></li>
            </ul>
          </div>

          {/* Contatos */}
          <div>
            <h3 className="text-brand-gold font-semibold mb-4">Contatos</h3>
            <div className="space-y-3">
              <a href="https://wa.me/5511964721143" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-gray-300 hover:text-brand-gold transition-smooth text-sm">
                <Phone size={16} />
                <span>(11) 96472-1143</span>
              </a>
              <a href="mailto:contato@encantoshub.com" className="flex items-center space-x-2 text-gray-300 hover:text-brand-gold transition-smooth text-sm">
                <Mail size={16} />
                <span>contato@encantoshub.com</span>
              </a>
              
              {/* Social Media */}
              <div className="flex space-x-3 pt-2">
                <a href="#" className="text-gray-300 hover:text-brand-gold transition-smooth" aria-label="Instagram">
                  <Instagram size={20} />
                </a>
                <a href="#" className="text-gray-300 hover:text-brand-gold transition-smooth" aria-label="LinkedIn">
                  <Linkedin size={20} />
                </a>
                <a href="#" className="text-gray-300 hover:text-brand-gold transition-smooth" aria-label="YouTube">
                  <Youtube size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Global */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="text-center mb-8">
            <h3 className="text-xl font-semibold text-brand-gold mb-4">
              Pronto para crescer de forma leve e sustentável?
            </h3>
            <Button 
              onClick={() => window.open('https://wa.me/5511964721143?text=Olá! Gostaria de solicitar um orçamento personalizado para minha empresa&utm_source=footer&utm_medium=cta&utm_campaign=orcamento_global', '_blank')}
              className="bg-brand-gold text-brand-black hover:bg-brand-gold/90 font-semibold px-6 py-2"
            >
              Solicitar Orçamento
            </Button>
          </div>
          
          {/* Copyright */}
          <div className="text-center">
            <p className="text-gray-400 text-sm">
              © 2024 EncantosHub. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;