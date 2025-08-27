import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useSEO } from "@/hooks/useSEO";

const NotFound = () => {
  const location = useLocation();

  useSEO({
    title: "Página Não Encontrada - 404 | Encantos Hub",
    description: "A página que você procura não existe. Retorne à página inicial do Encantos Hub para acessar nossos serviços de marketing digital.",
    canonical: `https://www.encantoshub.com.br${location.pathname}`,
    robots: "noindex, nofollow",
    ogImage: "https://www.encantoshub.com.br/lovable-uploads/50eafc97-7976-48cf-86d3-511cd2eb5e68.png"
  });

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-4">Oops! Page not found</p>
        <a href="/" className="text-blue-500 hover:text-blue-700 underline">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
