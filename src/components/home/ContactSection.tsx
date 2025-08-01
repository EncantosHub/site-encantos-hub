import { Button } from "@/components/ui/button";
import { Phone, Mail, Instagram, Linkedin, Youtube } from "lucide-react";

const ContactSection = () => {
  const contactLinks = [
    {
      icon: Phone,
      label: "WhatsApp",
      value: "(11) 96472-1143",
      href: "https://wa.me/5511964721143",
      color: "text-green-600"
    },
    {
      icon: Mail,
      label: "E-mail",
      value: "contato@encantoshub.com",
      href: "mailto:contato@encantoshub.com",
      color: "text-blue-600"
    },
    {
      icon: Instagram,
      label: "Instagram",
      value: "@encantoshub",
      href: "#",
      color: "text-pink-600"
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "EncantosHub",
      href: "#",
      color: "text-blue-700"
    },
    {
      icon: Youtube,
      label: "YouTube",
      value: "EncantosHub",
      href: "#",
      color: "text-red-600"
    }
  ];

  return (
    <section id="contato" className="py-20 bg-gradient-hero relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFD700' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-5xl font-bold text-brand-white mb-6">
            Pronto para fazer seu negócio{" "}
            <span className="text-brand-gold">brilhar?</span>
          </h2>
          
          <p className="text-xl text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto">
            Transforme sua presença digital com estratégias que realmente funcionam. 
            Entre em contato e descubra como podemos ajudar seu negócio a crescer de 
            forma orgânica e sustentável.
          </p>

          {/* Contact Options - WhatsApp and Email */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-12">
            <div className="flex items-center space-x-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-6 py-4">
              <div className="bg-brand-gold/20 p-3 rounded-full">
                <Phone className="w-6 h-6 text-brand-gold" />
              </div>
              <div>
                <p className="text-brand-gold font-medium">WhatsApp</p>
                <p className="text-white text-sm">(11) 96472-1143</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-6 py-4">
              <div className="bg-brand-gold/20 p-3 rounded-full">
                <Mail className="w-6 h-6 text-brand-gold" />
              </div>
              <div>
                <p className="text-brand-gold font-medium">Email</p>
                <p className="text-white text-sm">contato@encantoshub.com</p>
              </div>
            </div>
          </div>

          {/* Main CTA Button */}
          <div className="mb-12">
            <Button 
              onClick={() => window.open("https://wa.me/5511964721143?text=Vim do site e gostaria de algumas informações.", "_blank")}
              className="bg-brand-gold hover:bg-brand-gold/90 text-brand-black font-semibold px-12 py-4 text-lg rounded-lg shadow-gold transition-smooth"
            >
              Vamos conversar!
            </Button>
          </div>

          {/* Social Media */}
          <div className="mb-8">
            <p className="text-gray-300 mb-4">Nos siga em nossas redes sociais:</p>
            <div className="flex justify-center space-x-6">
              <a href="#" className="text-gray-300 hover:text-brand-gold transition-colors">
                <Instagram size={24} />
              </a>
              <a href="#" className="text-gray-300 hover:text-brand-gold transition-colors">
                <Linkedin size={24} />
              </a>
              <a href="#" className="text-gray-300 hover:text-brand-gold transition-colors">
                <Youtube size={24} />
              </a>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-12 pt-8 border-t border-gray-700">
            <p className="text-gray-400 text-sm">
              Resposta em até 2 horas úteis • Consultoria gratuita de 15 minutos
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;