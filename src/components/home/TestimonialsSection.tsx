import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";
const TestimonialsSection = () => {
  const testimonials = [{
    name: "Carlos Mendes",
    role: "Diretor Comercial",
    company: "TechSolutions",
    date: "Janeiro 2024",
    content: "A EncantosHub transformou completamente nossa presença digital. Em 6 meses, aumentamos nosso tráfego orgânico em 300% e as conversões triplicaram. O trabalho é realmente excepcional.",
    rating: 5
  }, {
    name: "Marina Santos",
    role: "Proprietária",
    company: "Boutique Elegance",
    date: "Dezembro 2023",
    content: "Como pequena empresária, precisava de resultados rápidos e eficientes. A equipe não apenas entregou, como superou todas as expectativas. Agora apareço na primeira página do Google!",
    rating: 5
  }, {
    name: "Roberto Silva",
    role: "Franqueado",
    company: "Rede Fast Food",
    date: "Novembro 2023",
    content: "O trabalho de SEO local foi fundamental para nosso crescimento. Aumentamos as visitas na loja física em 40% e melhoramos significativamente nossa reputação online. Recomendo totalmente!",
    rating: 5
  }];
  return <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-brand-black mb-4">
            O que nossos <span className="text-brand-gold">parceiros</span> dizem
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Depoimentos reais de empresas que transformaram sua presença digital conosco
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => <Card key={index} className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 border-border hover:border-brand-gold/30 relative">
              <CardContent className="p-6">
                {/* Quote Icon */}
                <div className="absolute -top-4 left-6">
                  <div className="bg-brand-gold rounded-full p-3 shadow-gold">
                    <Quote className="w-6 h-6 text-brand-black" />
                  </div>
                </div>

                {/* Rating */}
                <div className="flex space-x-1 mb-4 pt-4">
                  {[...Array(testimonial.rating)].map((_, i) => <Star key={i} className="w-5 h-5 fill-brand-gold text-brand-gold" />)}
                </div>

                {/* Content */}
                <p className="text-muted-foreground leading-relaxed mb-6 italic">
                  "{testimonial.content}"
                </p>

                {/* Author Info */}
                <div className="border-t border-border pt-4">
                  <h4 className="font-semibold text-brand-black group-hover:text-brand-gold transition-colors">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role} • {testimonial.company}
                  </p>
                  <p className="text-xs text-brand-gold mt-1">
                    {testimonial.date}
                  </p>
                </div>
              </CardContent>
            </Card>)}
        </div>
      </div>
    </section>;
};
export default TestimonialsSection;