import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== '/') {
      window.location.href = `/#${sectionId}`;
      return;
    }
    
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const menuItems = [
    { label: "Nossas Soluções", action: () => scrollToSection("solucoes") },
    { label: "Quem Somos", action: () => scrollToSection("equipe") },
    { label: "Blog", href: "/blog" },
    { label: "Ferramentas", href: "/ferramentas" },
    { label: "Contatos", action: () => scrollToSection("contato") }
  ];

  return (
    <header className="bg-brand-white shadow-elegant sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="/lovable-uploads/f150988c-c4ce-4335-b382-f2baac310d21.png" 
              alt="EncantosHub" 
              className="h-8 w-8"
            />
            <span className="text-xl font-bold">
              <span className="text-brand-gold">Encantos</span>
              <span className="text-brand-black">Hub</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map((item, index) => (
              <div key={index}>
                {item.href ? (
                  <Link
                    to={item.href}
                    className="text-brand-black hover:text-brand-gold transition-smooth font-medium"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <button
                    onClick={item.action}
                    className="text-brand-black hover:text-brand-gold transition-smooth font-medium"
                  >
                    {item.label}
                  </button>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-brand-black hover:text-brand-gold"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-border">
            <div className="flex flex-col space-y-4 pt-4">
              {menuItems.map((item, index) => (
                <div key={index}>
                  {item.href ? (
                    <Link
                      to={item.href}
                      className="text-brand-black hover:text-brand-gold transition-smooth font-medium block py-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <button
                      onClick={item.action}
                      className="text-brand-black hover:text-brand-gold transition-smooth font-medium text-left w-full py-2"
                    >
                      {item.label}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;