
import { useState } from "react";
import { Button } from "@/components/ui/button";
import ServiceAccordion from "@/components/ServiceAccordion";
import { TestimonialForm } from "@/components/TestimonialForm";
import { Heart, Search, Syringe, Clipboard, Activity, ChevronDown, ChevronUp } from "lucide-react";
import { TestimonialProvider } from "@/context/TestimonialContext";
import { TestimonialCarousel } from "@/components/TestimonialCarousel";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAdmin } from "@/context/AdminContext";
import MediaCarousel from "@/components/MediaCarousel";
import { useThemeEffect } from "@/hooks/useThemeManager";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ThemeToggle } from "@/components/ThemeToggle";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Navbar />

      {/* Mobile-First Hero Section */}
      <section className="relative py-12 md:py-28 px-4 md:px-6 overflow-hidden bg-gradient-to-br from-amber-50 to-amber-200 dark:from-slate-950 dark:via-slate-900 dark:to-emerald-950/20 transition-colors duration-500">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20 dark:opacity-10">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary rounded-full blur-[120px]" />
          <div className="absolute top-1/2 -right-24 w-64 h-64 bg-emerald-500 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Image at TOP for mobile */}
          <div className="rounded-3xl overflow-hidden mb-8 md:hidden shadow-2xl animate-in fade-in zoom-in-95 duration-1000 bg-slate-900/50 backdrop-blur-sm">
            <MediaCarousel
              section="hero"
              fallbackImageSrc="/lovable-uploads/aafcb339-7f9d-4085-abae-6009f9dac93a.jpg"
              height="h-[400px]"
              objectFit="cover"
              objectPosition="top"
              aspectRatio={1}
            />
          </div>

          {/* Desktop layout */}
          <div className="hidden md:grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="animate-in fade-in slide-in-from-left-10 duration-1000 ease-out">
              <h1 className="font-bold text-4xl lg:text-6xl mb-6 md:mb-8 tracking-tight leading-[1.1] dark:text-gray-50">
                {siteContent?.hero?.title || "Cuidados de Enfermagem Avançados com Tecnologia POCUS"}
              </h1>
              <p className="mb-8 md:mb-10 text-muted-foreground text-lg lg:text-xl leading-relaxed max-w-xl dark:text-gray-300">
                {siteContent?.hero?.description || "Consultas e procedimentos de enfermagem especializados utilizando tecnologia de ultrassom POCUS (point-of-care) de última geração para diagnóstico e tratamento precisos."}
              </p>
              <div className="flex flex-col sm:flex-row gap-5">
                <Button size="lg" className="h-14 px-8 text-white bg-lime-800 hover:bg-lime-700 font-semibold rounded-full shadow-lg shadow-lime-900/20 hover:scale-105 active:scale-95 transition-all duration-300" asChild>
                  <a href={siteContent?.links?.scheduleAppointment || "#"} target="_blank" rel="noopener noreferrer">
                    {siteContent?.buttonLabels?.scheduleAppointment || "Agendar Consulta"}
                  </a>
                </Button>
                <Button variant="outline" size="lg" className="h-14 px-8 text-white bg-red-900 hover:bg-red-800 font-semibold rounded-full border-none shadow-lg shadow-red-900/20 hover:scale-105 active:scale-95 transition-all duration-300" asChild>
                  <a href={siteContent?.links?.whatsapp || "#"} target="_blank" rel="noopener noreferrer">
                    {siteContent?.buttonLabels?.whatsapp || "Agendar WhatsApp"}
                  </a>
                </Button>
              </div>
            </div>
            <div className="rounded-[2.5rem] overflow-hidden shadow-2xl animate-in fade-in slide-in-from-right-10 duration-1000 ease-out border-8 border-white/10 backdrop-blur-sm">
              <MediaCarousel
                section="hero"
                fallbackImageSrc="/lovable-uploads/aafcb339-7f9d-4085-abae-6009f9dac93a.jpg"
                height="h-[550px]"
                objectFit="cover"
                aspectRatio={1}
              />
            </div>
          </div>

          {/* Mobile content below image */}
          <div className="md:hidden animate-in fade-in slide-in-from-bottom-5 duration-700">
            <h1 className="font-bold text-3xl mb-4 leading-tight text-foreground">
              {siteContent?.hero?.title || "Cuidados de Enfermagem Avançados com Tecnologia POCUS"}
            </h1>
            <p className="mb-8 text-muted-foreground text-base leading-relaxed">
              {siteContent?.hero?.description || "Consultas e procedimentos de enfermagem especializados utilizando tecnologia de ultrassom POCUS (point-of-care) de última geração para diagnóstico e tratamento precisos."}
            </p>

            {/* CTA & Navigation Buttons Group - Mobile */}
            <div className="flex flex-col gap-4 mb-8">
              <Button size="lg" className="h-16 text-white bg-lime-800 hover:bg-lime-700 w-full font-bold rounded-2xl shadow-lg transition-all text-xl" asChild>
                <a href={siteContent?.links?.scheduleAppointment || "#"} target="_blank" rel="noopener noreferrer">
                  Agendar Consulta
                </a>
              </Button>
              <Button variant="outline" size="lg" className="h-16 text-white bg-red-900 hover:bg-red-800 w-full font-bold rounded-2xl shadow-lg border-none transition-all text-xl" asChild>
                <a href={siteContent?.links?.whatsapp || "#"} target="_blank" rel="noopener noreferrer">
                  Agendar WhatsApp
                </a>
              </Button>
              <Button variant="secondary" size="lg" className="h-16 w-full bg-emerald-950/80 hover:bg-emerald-900 text-white rounded-2xl font-bold shadow-lg transition-all text-xl border border-white/5" asChild>
                <a href={siteContent?.links?.heroTertiary || "/cadastro-paciente"} target="_blank" rel="noopener noreferrer">
                  Cadastro Único
                </a>
              </Button>
              <Button variant="outline" size="lg" className="h-16 w-full bg-slate-800 hover:bg-slate-700 text-white border-none rounded-2xl font-bold shadow-md transition-all text-xl" asChild>
                <a href="#services">
                  Nossos Serviços
                </a>
              </Button>
              <Button variant="outline" size="lg" className="h-16 w-full bg-slate-800 hover:bg-slate-700 text-white border-none rounded-2xl font-bold shadow-md transition-all text-xl" asChild>
                <a href="#location">
                  Nossa Localização
                </a>
              </Button>

              {/* Sobre o Profissional - Expandable */}
              <Collapsible open={aboutOpen} onOpenChange={setAboutOpen} className="mt-2">
                <CollapsibleTrigger asChild>
                  <Button variant="outline" size="lg" className="w-full h-16 bg-emerald-800 hover:bg-emerald-700 text-white border-emerald-700 rounded-2xl font-bold shadow-md text-xl">
                    <span>Sobre o Profissional</span>
                    {aboutOpen ? <ChevronUp className="ml-2 h-6 w-6" /> : <ChevronDown className="ml-2 h-6 w-6" />}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-4 animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="bg-emerald-950/90 backdrop-blur-md rounded-[2rem] p-6 space-y-6 shadow-2xl border border-white/5">
                    <div className="rounded-2xl overflow-hidden shadow-lg">
                      <MediaCarousel
                        section="about"
                        fallbackImageSrc="/lovable-uploads/aafcb339-7f9d-4085-abae-6009f9dac93a.jpg"
                        height="h-[250px]"
                        objectFit="cover"
                        objectPosition="center"
                        aspectRatio={4 / 3}
                      />
                    </div>
                    <h3 className="text-2xl font-bold text-green-50">
                      {siteContent?.about?.subtitle || "Enfermeiro Especialista"}
                    </h3>
                    <div className="space-y-3 text-green-100/90 text-sm leading-relaxed">
                      {aboutDescription.map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                      ))}
                    </div>
                    <Button className="h-14 bg-green-700 hover:bg-green-600 text-white w-full rounded-2xl font-bold shadow-lg" asChild>
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
      <section className="py-20 md:py-32 px-4 md:px-6 bg-gradient-to-tr from-lime-900 via-emerald-900 to-teal-900 dark:from-slate-900 dark:via-emerald-950 dark:to-slate-900 transition-colors duration-500 relative overflow-hidden">
        {/* Decorative glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-5 duration-1000">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-50 tracking-tight">
              {siteContent?.testimonials?.title || "Depoimentos de Pacientes"}
            </h2>
            <div className="w-24 h-1.5 bg-yellow-400 mx-auto rounded-full" />
          </div>

          <TestimonialProvider>
            <div className="mb-16 md:mb-24 scale-105 md:scale-100">
              <TestimonialCarousel />
            </div>

            <div className="flex justify-center">
              <Button
                variant="outline"
                size="lg"
                className="h-14 px-10 bg-yellow-400 hover:bg-yellow-300 text-black border-none font-bold rounded-2xl shadow-xl shadow-yellow-900/20 hover:scale-110 active:scale-95 transition-all duration-300"
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

      {/* Services Section - Accordion for both Mobile and Desktop */}
      <section id="services" className="py-20 md:py-32 px-4 md:px-6 bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
        <div className="max-w-7xl mx-auto rounded-[3.5rem] bg-white dark:bg-slate-900 p-8 md:p-16 shadow-2xl border border-slate-200 dark:border-white/5 relative overflow-hidden">
          {/* Header */}
          <div className="relative z-10 mb-12 md:mb-16 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-gray-50 tracking-tight">
              {siteContent?.services?.title || "Nossos Serviços"}
            </h2>
            <p className="max-w-2xl mx-auto text-slate-600 dark:text-slate-400 text-lg md:text-xl leading-relaxed">
              Clique no serviço para detalhar a descrição, preparação e valor
            </p>
          </div>

          <div className="relative z-10">
            <ServiceAccordion services={services} />
          </div>

          {/* Subtle background glow for services */}
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
        </div>
      </section>

      {/* About Professional Section - Desktop Only (Mobile shows in collapsible) */}
      <section id="about" className="hidden md:block py-20 lg:py-32 px-4 md:px-6 bg-white dark:bg-slate-950 transition-colors duration-500">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="relative group">
              <div className="absolute -inset-4 bg-primary/20 rounded-[3rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="rounded-[2.5rem] overflow-hidden shadow-2xl relative z-10 border-4 border-slate-100 dark:border-white/10 group-hover:scale-[1.02] transition-transform duration-700">
                <MediaCarousel
                  section="about"
                  fallbackImageSrc="/lovable-uploads/aafcb339-7f9d-4085-abae-6009f9dac93a.jpg"
                  height="h-[550px] lg:h-[650px]"
                  objectFit="cover"
                  aspectRatio={4 / 5}
                />
              </div>
            </div>

            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-4xl lg:text-6xl font-bold text-slate-900 dark:text-gray-50 tracking-tight">
                  {siteContent?.about?.title || "Sobre"}
                </h2>
                <h3 className="text-2xl lg:text-3xl font-medium text-primary">
                  {siteContent?.about?.subtitle || "Subtítulo"}
                </h3>
              </div>

              <div className="space-y-6 text-slate-600 dark:text-slate-300 text-lg lg:text-xl leading-relaxed">
                {aboutDescription.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              <div className="pt-4">
                <Button size="lg" className="h-14 px-10 text-white bg-green-700 hover:bg-green-600 rounded-2xl font-bold shadow-xl shadow-green-900/10 hover:scale-105 active:scale-95 transition-all duration-300" asChild>
                  <a href={siteContent?.links?.bookConsultation || siteContent?.links?.whatsapp || "#"} target="_blank" rel="noopener noreferrer">
                    {siteContent?.buttonLabels?.bookConsultation || "Agende sua Consulta"}
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
