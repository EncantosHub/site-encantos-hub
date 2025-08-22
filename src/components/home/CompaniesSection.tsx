import { useEffect, useState } from "react";

const CompaniesSection = () => {
  const companies = [
    { name: "Casas Bahia", logo: "/lovable-uploads/ca6602c6-c889-4e89-b21b-716519e24d0e.png" },
    { name: "Banco PAN", logo: "/lovable-uploads/cff71401-fd35-40c1-bbcd-a3fc51227ca9.png" },
    { name: "Net Claro", logo: "/lovable-uploads/f3f492b8-3bb9-428a-a469-ea23b4012cd5.png" },
    { name: "Insper Educação", logo: "/lovable-uploads/d230c809-9e77-48fb-bfdb-5663d9fe0879.png" },
    { name: "Eucatex", logo: "/lovable-uploads/e64f6bdd-a69c-4508-b5ec-358df714bcc6.png" },
    { name: "Thyssenkrupp", logo: "/lovable-uploads/3bef535f-a7ac-4b6b-a8ac-cd1c4b808a94.png" },
    { name: "ABCripto", logo: "/lovable-uploads/ded77ad8-ce59-4c04-ae52-17a660f3d553.png" },
    { name: "Loggi", logo: "/lovable-uploads/70c151c5-efec-48fa-a43e-a90943e75b85.png" }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % companies.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [companies.length]);

  return (
    <section className="py-16 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl lg:text-3xl font-bold text-brand-black mb-4">
            Empresas que <span className="text-brand-gold">confiam</span> em nosso trabalho
          </h2>
          <p className="text-muted-foreground">
            Referências que comprovam nossa expertise e qualidade
          </p>
        </div>

        {/* Layout Responsivo - Grid no Mobile, Carousel no Desktop */}
        <div className="block md:hidden">
          {/* Grid para Mobile */}
          <div className="grid grid-cols-2 gap-4">
            {companies.map((company, index) => (
              <div key={index} className="bg-white border border-border rounded-lg p-4 flex items-center justify-center shadow-sm hover:shadow-elegant transition-all group min-h-[100px]">
                <img 
                  src={company.logo} 
                  alt={`${company.name} logo`}
                  className="h-16 w-auto object-contain max-w-full"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Carousel para Desktop */}
        <div className="hidden md:block relative overflow-hidden">
          <div 
            className="flex transition-transform duration-1000 ease-in-out"
            style={{ 
              transform: `translateX(-${currentIndex * (100 / Math.min(companies.length, 4))}%)`,
              width: `${(companies.length / Math.min(companies.length, 4)) * 100}%`
            }}
          >
            {companies.map((company, index) => (
              <div 
                key={index}
                className="flex-shrink-0 px-4"
                style={{ width: `${100 / Math.min(companies.length, 4)}%` }}
              >
                <div className="bg-white border border-border rounded-lg p-6 h-28 flex items-center justify-center shadow-sm hover:shadow-elegant transition-shadow group">
                  <img 
                    src={company.logo} 
                    alt={`${company.name} logo`}
                    className="h-16 w-auto object-contain max-w-full"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Indicadores apenas no Desktop */}
          <div className="flex justify-center mt-8 space-x-2">
            {companies.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex 
                    ? "bg-brand-gold" 
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompaniesSection;