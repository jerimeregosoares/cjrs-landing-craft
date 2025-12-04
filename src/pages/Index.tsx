import { useState } from "react";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";
import ServiceCard from "@/components/ServiceCard";
import ServiceAccordion from "@/components/ServiceAccordion";
import { TestimonialForm } from "@/components/TestimonialForm";
import { Heart, Search, Syringe, Clipboard, Activity, ChevronDown, ChevronUp } from "lucide-react";
import { TestimonialProvider } from "@/context/TestimonialContext";
import { TestimonialCarousel } from "@/components/TestimonialCarousel";
import MobileNav from "@/components/MobileNav";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAdmin } from "@/context/AdminContext";
import MediaCarousel from "@/components/MediaCarousel";
import { useThemeEffect } from "@/hooks/useThemeManager";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

// Map string icon names to Lucide components
const iconMap = {
  search: Search,
  clipboard: Clipboard,
  syringe: Syringe, 
  heart: Heart,
  activity: Activity
};

const Index = () => {
  const isMobile = useIsMobile();
  const { siteContent } = useAdmin();
  const [aboutOpen, setAboutOpen] = useState(false);
  
  // Check if siteContent or its properties are undefined and provide fallbacks
  const services = siteContent?.services?.items || [];
  const aboutDescription = siteContent?.about?.description || [];

  // Apply theme colors using centralized hook
  useThemeEffect(siteContent?.theme);
  
  return (
    <div className="min-h-screen">
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
            <Button variant="secondary" className="px-4" asChild>
              <a href={siteContent?.links?.scheduleAppointment || "#"} target="_blank" rel="noopener noreferrer">
                {siteContent?.buttonLabels?.scheduleAppointment || "Cadastro de Pacientes"}
              </a>
            </Button>
            <Button variant="default" className="px-4" asChild>
              <a href={siteContent?.links?.whatsapp || "#"} target="_blank" rel="noopener noreferrer">
                {siteContent?.buttonLabels?.whatsapp || "Agendar WhatsApp"}
              </a>
            </Button>
          </div>
          
          {/* Mobile navigation */}
          <MobileNav />
        </div>
      </nav>

      {/* Mobile-First Hero Section */}
      <section className="py-6 md:py-20 px-4 md:px-6 bg-amber-200">
        <div className="max-w-7xl mx-auto">
          {/* Image at TOP for mobile */}
          <div className="rounded-2xl overflow-hidden mb-6 md:hidden">
            <MediaCarousel 
              section="hero" 
              fallbackImageSrc="/lovable-uploads/aafcb339-7f9d-4085-abae-6009f9dac93a.jpg"
              height="h-[250px]"
              objectFit="contain"
              aspectRatio={16/9}
            />
          </div>

          {/* Desktop layout */}
          <div className="hidden md:grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <h1 className="font-bold text-2xl md:text-3xl mb-4 md:mb-6">{siteContent?.hero?.title || "Cuidados de Enfermagem Avançados com Tecnologia POCUS"}</h1>
              <p className="mb-6 md:mb-8 text-muted-foreground text-base md:text-xl">{siteContent?.hero?.description || "Consultas e procedimentos de enfermagem especializados utilizando tecnologia de ultrassom POCUS (point-of-care) de última geração para diagnóstico e tratamento precisos."}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="text-zinc-50 bg-lime-800 hover:bg-lime-700 font-medium" asChild>
                  <a href={siteContent?.links?.scheduleAppointment || "#"} target="_blank" rel="noopener noreferrer">
                    {siteContent?.buttonLabels?.scheduleAppointment || "Agendar Consulta"}
                  </a>
                </Button>
                <Button variant="outline" size="lg" className="text-stone-50 bg-red-900 hover:bg-red-800" asChild>
                  <a href={siteContent?.links?.whatsapp || "#"} target="_blank" rel="noopener noreferrer">
                    {siteContent?.buttonLabels?.whatsapp || "Agendar WhatsApp"}
                  </a>
                </Button>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden">
              <MediaCarousel 
                section="hero" 
                fallbackImageSrc="/lovable-uploads/aafcb339-7f9d-4085-abae-6009f9dac93a.jpg"
                height="h-[500px]"
                objectFit="contain"
                aspectRatio={16/9}
              />
            </div>
          </div>

          {/* Mobile content below image */}
          <div className="md:hidden">
            <h1 className="font-bold text-xl mb-3">
              Cuidados de Enfermagem Avançados com Tecnologia POCUS
            </h1>
            <p className="mb-6 text-muted-foreground text-sm">
              Consultas e procedimentos de enfermagem especializados utilizando tecnologia de ultrassom POCUS (point-of-care) de última geração para diagnóstico e tratamento precisos.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col gap-3">
              <Button size="default" className="text-zinc-50 bg-lime-800 hover:bg-lime-700 w-full font-medium" asChild>
                <a href={siteContent?.links?.scheduleAppointment || "#"} target="_blank" rel="noopener noreferrer">
                  Agendar Consulta
                </a>
              </Button>
              <Button variant="outline" size="default" className="text-stone-50 bg-red-900 hover:bg-red-800 w-full" asChild>
                <a href={siteContent?.links?.whatsapp || "#"} target="_blank" rel="noopener noreferrer">
                  Agendar WhatsApp
                </a>
              </Button>
              <Button variant="secondary" size="default" className="w-full" asChild>
                <a href={siteContent?.links?.heroTertiary || "/cadastro-paciente"} target="_blank" rel="noopener noreferrer">
                  Cadastro Único
                </a>
              </Button>
              
              {/* Sobre o Profissional - Expandable */}
              <Collapsible open={aboutOpen} onOpenChange={setAboutOpen}>
                <CollapsibleTrigger asChild>
                  <Button variant="outline" size="default" className="w-full bg-emerald-800 hover:bg-emerald-700 text-white border-emerald-700">
                    <span>Sobre o Profissional</span>
                    {aboutOpen ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-3">
                  <div className="bg-emerald-950 rounded-lg p-4 space-y-4">
                    <div className="rounded-lg overflow-hidden">
                      <MediaCarousel 
                        section="about" 
                        fallbackImageSrc="/lovable-uploads/aafcb339-7f9d-4085-abae-6009f9dac93a.jpg" 
                        height="h-[200px]"
                        objectFit="contain"
                        aspectRatio={4/3}
                      />
                    </div>
                    <h3 className="text-lg font-bold text-green-50">
                      {siteContent?.about?.subtitle || "Enfermeiro Especialista"}
                    </h3>
                    <div className="space-y-2 text-green-100 text-sm">
                      {aboutDescription.map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                      ))}
                    </div>
                    <Button className="bg-green-700 hover:bg-green-600 text-white w-full" asChild>
                      <a href={siteContent?.links?.bookConsultation || siteContent?.links?.whatsapp || "#"} target="_blank" rel="noopener noreferrer">
                        {siteContent?.buttonLabels?.bookConsultation || "Agende sua Consulta"}
                      </a>
                    </Button>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Before Services on Mobile */}
      <section className="py-12 md:py-20 px-4 md:px-6 bg-lime-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold mb-6 md:mb-12 text-center text-gray-50">
            {siteContent?.testimonials?.title || "Depoimentos de Pacientes"}
          </h2>
          
          <TestimonialProvider>
            <div className="mb-8 md:mb-16">
              <TestimonialCarousel />
            </div>
            
            <div className="flex justify-center">
              <Button 
                variant="outline" 
                className="bg-yellow-500 hover:bg-yellow-400 text-black border-yellow-500 font-semibold"
                asChild
              >
                <a href="/avaliacoes">
                  Inserir Avaliação
                </a>
              </Button>
            </div>
          </TestimonialProvider>
        </div>
      </section>

      {/* Services Section - With Accordion on Mobile */}
      <section id="services" className="py-12 md:py-16 px-4 md:px-6 bg-slate-950">
        <div className="max-w-7xl mx-auto rounded-md bg-stone-950">
          <h2 className="text-2xl md:text-4xl font-bold mb-6 md:mb-12 text-center text-orange-50">
            {siteContent?.services?.title || "Nossos Serviços"}
          </h2>
          
          {/* Mobile: Accordion */}
          <div className="md:hidden">
            <ServiceAccordion services={services} />
          </div>
          
          {/* Desktop: Full Cards */}
          <div className="hidden md:flex flex-col gap-6 md:gap-8">
            {services.map((service) => {
              const IconComponent = iconMap[service.icon as keyof typeof iconMap] || Search;
              return (
                <ServiceCard 
                  key={service.id}
                  icon={<IconComponent className="h-6 w-6 md:h-8 md:w-8" />} 
                  title={service.title} 
                  description={service.description}
                  price={service.price}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* About Professional Section - Desktop Only (Mobile shows in collapsible) */}
      <section id="about" className="hidden md:block py-12 md:py-20 px-4 md:px-6 bg-emerald-950">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-center text-green-50">
            {siteContent?.about?.title || "Sobre"}
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="rounded-2xl overflow-hidden">
              <MediaCarousel 
                section="about" 
                fallbackImageSrc="/lovable-uploads/aafcb339-7f9d-4085-abae-6009f9dac93a.jpg" 
                height="h-[350px] md:h-[450px]"
                objectFit="contain"
                aspectRatio={4/3}
              />
            </div>
            
            <div>
              <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-green-50">
                {siteContent?.about?.subtitle || "Subtítulo"}
              </h3>
              <div className="space-y-3 md:space-y-4 text-green-100 text-sm md:text-base">
                {aboutDescription.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
              
              <div className="mt-6 md:mt-8">
                <Button className="bg-green-700 hover:bg-green-600 text-white w-full sm:w-auto" asChild>
                  <a href={siteContent?.links?.bookConsultation || siteContent?.links?.whatsapp || "#"} target="_blank" rel="noopener noreferrer">
                    {siteContent?.buttonLabels?.bookConsultation || "Agende sua Consulta"}
                  </a>
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
              {services.slice(0, 3).map((service) => (
                <li key={service.id}>{service.title}</li>
              ))}
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
    </div>
  );
};

export default Index;
