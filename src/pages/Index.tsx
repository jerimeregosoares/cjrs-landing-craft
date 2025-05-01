
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";
import ServiceCard from "@/components/ServiceCard";
import { TestimonialForm } from "@/components/TestimonialForm";
import { Heart, Search, Syringe, Clipboard } from "lucide-react";
import { TestimonialProvider } from "@/context/TestimonialContext";
import { TestimonialCarousel } from "@/components/TestimonialCarousel";
import MobileNav from "@/components/MobileNav";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const isMobile = useIsMobile();
  
  return <div className="min-h-screen">
      {/* Navigation */}
      <nav className="py-4 px-4 md:px-6 border-b sticky top-0 bg-white z-30">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Desktop navigation */}
          <div className="hidden md:block">
            <Logo />
          </div>
          <div className="hidden md:flex space-x-6">
            <a href="#services" className="hover:text-primary py-2 px-3 transition-colors">Serviços</a>
            <a href="#about" className="hover:text-primary py-2 px-3 transition-colors">Sobre</a>
            <Button variant="default" className="px-4" asChild>
              <a href="https://wa.me/559191953465?text=Gostaria%20de%20fazer%20um%20agendamento">Agendar WhatsApp</a>
            </Button>
          </div>
          
          {/* Mobile navigation */}
          <MobileNav />
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-12 md:py-20 px-4 md:px-6 bg-amber-200">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div>
            <h1 className="font-bold text-2xl md:text-3xl mb-4 md:mb-6">Cuidados de Enfermagem Avançados com Tecnologia POCUS</h1>
            <p className="mb-6 md:mb-8 text-muted-foreground text-base md:text-xl">Consultas e procedimentos de enfermagem especializados utilizando tecnologia de ultrassom POCUS (point-of-care) de última geração para diagnóstico e tratamento precisos.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size={isMobile ? "default" : "lg"} className="text-zinc-50 bg-lime-800 hover:bg-lime-700 w-full sm:w-auto font-medium" asChild>
                <a href="https://painelconsult.servicoscjrs.com.br/a/jerime-r-soares">Agendar Atendimento</a>
              </Button>
              <Button variant="outline" size={isMobile ? "default" : "lg"} className="text-stone-50 bg-red-900 hover:bg-red-800 w-full sm:w-auto" asChild>
                <a href="#about">Sobre o Profissional</a>
              </Button>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden mt-6 md:mt-0">
            <img alt="Profissional de Saúde" className="w-full h-[250px] md:h-[500px] object-cover" src="/lovable-uploads/aafcb339-7f9d-4085-abae-6009f9dac93a.jpg" />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-12 md:py-16 px-4 md:px-6 bg-slate-950">
        <div className="max-w-7xl mx-auto rounded-md bg-stone-950">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-center text-orange-50">Nossos Serviços</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <ServiceCard icon={<Search className="h-6 w-6 md:h-8 md:w-8" />} title="Ultrassom POCUS" description="Diagnóstico avançado por ultrassom para exames obstétricos, ginecológicos, de próstata e abdômen completo." />
            <ServiceCard icon={<Clipboard className="h-6 w-6 md:h-8 md:w-8" />} title="Consultas" description="Consultas de enfermagem abrangentes com profissionais experientes." />
            <ServiceCard icon={<Syringe className="h-6 w-6 md:h-8 md:w-8" />} title="Procedimentos Médicos" description="Troca de curativos profissional, remoção de verrugas e tratamentos injetáveis." />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 md:py-20 px-4 md:px-6 bg-lime-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-center text-gray-50">Depoimentos de Pacientes</h2>
          
          <TestimonialProvider>
            <div className="mb-12 md:mb-16">
              <TestimonialCarousel />
            </div>
            
            <div className="mt-12 md:mt-16">
              <h3 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center text-gray-50">Deixe seu Depoimento</h3>
              <TestimonialForm />
            </div>
          </TestimonialProvider>
        </div>
      </section>

      {/* About Professional Section */}
      <section id="about" className="py-12 md:py-20 px-4 md:px-6 bg-emerald-950">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-center text-green-50">Sobre o Profissional</h2>
          
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="rounded-2xl overflow-hidden order-2 md:order-1">
              <img alt="Enfermeiro Jérime" className="w-full h-auto max-h-[350px] md:max-h-none object-cover" src="/lovable-uploads/aafcb339-7f9d-4085-abae-6009f9dac93a.jpg" />
            </div>
            
            <div className="order-1 md:order-2">
              <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-green-50">Enfermeiro Jérime Soares</h3>
              <div className="space-y-3 md:space-y-4 text-green-100 text-sm md:text-base">
                <p>Graduado pela Universidade Federal do Pará.</p>
                <p>Pós graduado em ginecologia, obstetrícia, infectologia e ultrassonografia POCUS.</p>
                <p>Atuou na linha de frente prestando assistência direta aos acometidos pelo corona vírus no hospital federal João de Barros Barreto.</p>
                <p>Ao longo de sua carreira, o Enfermeiro Jérime ocupou diversos cargos de responsabilidade, desenvolvendo habilidades técnicas e experiência clínica de excelência.</p>
              </div>
              
              <div className="mt-6 md:mt-8">
                <Button className="bg-green-700 hover:bg-green-600 text-white w-full sm:w-auto" asChild>
                  <a href="https://wa.me/559191953465?text=Gostaria%20de%20fazer%20um%20agendamento">Agende sua Consulta</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-8 md:py-12 px-4 md:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <Logo />
            <p className="mt-4 text-sm md:text-base">Cuidados de enfermagem avançados com tecnologia de ponta.</p>
          </div>
          <div>
            <h3 className="font-bold mb-4 text-base md:text-lg">Serviços</h3>
            <ul className="space-y-2 text-sm md:text-base">
              <li>Ultrassom POCUS</li>
              <li>Consultas</li>
              <li>Procedimentos de Enfermagem</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4 text-base md:text-lg">Contato</h3>
            <ul className="space-y-2 text-sm md:text-base">
              <li>Jerime Soares</li>
              <li>jerimeregosoares@gmail.com</li>
              <li>(91)985958042</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4 text-base md:text-lg">Horário de Funcionamento</h3>
            <ul className="space-y-2 text-sm md:text-base">
              <li>Seg-Sex: 9h - 18h</li>
              <li>Sáb: Fechado</li>
              <li>Dom: Fechado</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>;
};
export default Index;
