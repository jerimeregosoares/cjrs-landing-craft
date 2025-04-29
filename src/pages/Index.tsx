
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";
import ServiceCard from "@/components/ServiceCard";
import { TestimonialForm } from "@/components/TestimonialForm";
import { Heart, Search, Syringe, Clipboard } from "lucide-react";
import { TestimonialProvider } from "@/context/TestimonialContext";
import { TestimonialCarousel } from "@/components/TestimonialCarousel";

const Index = () => {
  return <div className="min-h-screen">
      {/* Navigation */}
      <nav className="py-4 px-6 border-b">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Logo />
          <div className="space-x-6">
            <a href="#services" className="hover:text-primary py-0 px-[8px] my-[17px] mx-[25px]">Serviços</a>
            <a href="#about" className="hover:text-primary my-[5px] py-0 px-0 mx-0">Sobre</a>
            <Button variant="default" className="px-[5px] mx-[35px]" asChild>
              <a href="https://wa.me/559191953465?text=GOSTARIA%20DE%20FAZER%20MEU%20AGENDAMENTO">Agendar WhatsApp</a>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-6 bg-amber-200 my-0">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="font-bold mb-6 px-0 py-0 text-3xl my-[5px] mx-[4px]">Cuidados de Enfermagem Avançados com Tecnologia POCUS</h1>
            <p className="mb-8 text-muted-foreground text-xl">Consultas e procedimentos de enfermagem especializados utilizando tecnologia de ultrassom POCUS (point-of-care) de última geração para diagnóstico e tratamento precisos.</p>
            <Button size="lg" className="mr-4 text-base text-zinc-50 bg-lime-800 hover:bg-lime-700 py-[12px] my-0 text-center font-medium px-[8px] mx-[63px]" asChild>
              <a href="https://painelconsult.servicoscjrs.com.br/a/jerime-soares">Agendar Atendimento</a>
            </Button>
            <Button variant="outline" size="lg" className="text-base text-stone-50 bg-red-900 hover:bg-red-800 text-center my-[13px] mx-[63px] px-[16px] font-thin py-0" asChild>
              <a href="#about">Sobre o Profissional</a>
            </Button>
          </div>
          <div className="rounded-2xl overflow-hidden">
            <img alt="Profissional de Saúde" className="w-full h-[500px] object-cover" src="/lovable-uploads/aafcb339-7f9d-4085-abae-6009f9dac93a.jpg" />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="px-[23px] mx-0 my-[12px] py-[79px] bg-slate-950">
        <div className="max-w-7xl mx-auto rounded-md bg-stone-950">
          <h2 className="text-4xl font-bold mb-12 text-center text-orange-50">Nossos Serviços</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard icon={<Search />} title="Ultrassom POCUS" description="Diagnóstico avançado por ultrassom para exames obstétricos, ginecológicos, de próstata e abdômen completo." />
            <ServiceCard icon={<Clipboard />} title="Consultas" description="Consultas de enfermagem abrangentes com profissionais experientes." />
            <ServiceCard icon={<Syringe />} title="Procedimentos Médicos" description="Troca de curativos profissional, remoção de verrugas e tratamentos injetáveis." />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 bg-lime-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center text-gray-50">Depoimentos de Pacientes</h2>
          
          <TestimonialProvider>
            <div className="mb-16">
              <TestimonialCarousel />
            </div>
            
            <div className="mt-16">
              <h3 className="text-3xl font-bold mb-8 text-center text-gray-50">Deixe seu Depoimento</h3>
              <TestimonialForm />
            </div>
          </TestimonialProvider>
        </div>
      </section>

      {/* About Professional Section */}
      <section id="about" className="py-20 px-6 bg-emerald-950">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center text-green-50">Sobre o Profissional</h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="rounded-2xl overflow-hidden order-2 md:order-1">
              <img alt="Enfermeiro Jérime" className="w-full h-auto object-cover" src="/lovable-uploads/aafcb339-7f9d-4085-abae-6009f9dac93a.jpg" />
            </div>
            
            <div className="order-1 md:order-2">
              <h3 className="text-2xl font-bold mb-6 text-green-50">Enfermeiro Jérime Soares</h3>
              <div className="space-y-4 text-green-100">
                <p>Graduado pela Universidade Federal do Pará.</p>
                <p>Pós graduado em ginecologia, obstetrícia, infectologia e ultrassonografia POCUS.</p>
                <p>Atuou na linha de frente prestando assistência direta aos acometidos pelo corona vírus no hospital federal João de Barros Barreto.</p>
                <p>Ao longo de sua carreira, o Enfermeiro Jérime ocupou diversos cargos de responsabilidade, desenvolvendo habilidades técnicas e experiência clínica de excelência.</p>
              </div>
              
              <div className="mt-8">
                <Button className="bg-green-700 hover:bg-green-600 text-white" asChild>
                  <a href="https://wa.me/559191953465?text=GOSTARIA%20DE%20FAZER%20MEU%20AGENDAMENTO">Agende sua Consulta</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
          <div>
            <Logo />
            <p className="mt-4">Cuidados de enfermagem avançados com tecnologia de ponta.</p>
          </div>
          <div>
            <h3 className="font-bold mb-4">Serviços</h3>
            <ul className="space-y-2">
              <li>Ultrassom POCUS</li>
              <li>Consultas</li>
              <li>Procedimentos de Enfermagem</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Contato</h3>
            <ul className="space-y-2">
              <li>Jerime Soares</li>
              <li>jerimeregosoares@gmail.com</li>
              <li>(91)985958042</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Horário de Funcionamento</h3>
            <ul className="space-y-2">
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
