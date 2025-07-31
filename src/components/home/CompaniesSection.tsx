import { useEffect, useState } from "react";

const CompaniesSection = () => {
  const companies = [
    "Casas Bahia",
    "Banco PAN", 
    "Net Claro",
    "Insper Educação",
    "Eucatex",
    "Thyssenkrupp",
    "ABCripto",
    "Loggi",
    "Conceito Vestibulares",
    "Sociedade da Mesa"
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

        {/* Carousel automático */}
        <div className="relative overflow-hidden">
          <div 
            className="flex transition-transform duration-1000 ease-in-out"
            style={{ 
              transform: `translateX(-${currentIndex * (100 / Math.min(companies.length, 5))}%)`,
              width: `${(companies.length / Math.min(companies.length, 5)) * 100}%`
            }}
          >
            {companies.map((company, index) => (
              <div 
                key={index}
                className="flex-shrink-0 px-4"
                style={{ width: `${100 / Math.min(companies.length, 5)}%` }}
              >
                <div className="bg-white border border-border rounded-lg p-6 h-24 flex items-center justify-center shadow-sm hover:shadow-elegant transition-shadow group">
                  <span className="text-brand-black font-semibold text-center group-hover:text-brand-gold transition-colors">
                    {company}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Indicadores */}
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
    </section>
  );
};

export default CompaniesSection;