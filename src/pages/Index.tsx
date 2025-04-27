import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";
import ServiceCard from "@/components/ServiceCard";
import TestimonialCard from "@/components/TestimonialCard";
import { Heart, Search, Syringe, Clipboard } from "lucide-react";
const Index = () => {
  return <div className="min-h-screen">
      {/* Navigation */}
      <nav className="py-4 px-6 border-b">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Logo />
          <div className="space-x-6">
            <a href="#services" className="hover:text-primary">Serviços</a>
            <a href="#about" className="hover:text-primary">Sobre</a>
            <Button variant="default">Agendar Consulta</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl font-bold mb-6">Cuidados de Enfermagem Avançados com Tecnologia POCUS</h1>
            <p className="text-xl mb-8 text-muted-foreground">Consultas e procedimentos de enfermagem especializados utilizando tecnologia de ultrassom POCUS (point-of-care)  de última geração para diagnóstico e tratamento precisos.</p>
            <Button size="lg" className="mr-4">Agendar Consulta</Button>
            <Button variant="outline" size="lg">Saiba Mais</Button>
          </div>
          <div className="rounded-2xl overflow-hidden">
            <img alt="Profissional de Saúde" className="w-full h-[500px] object-cover" src="/lovable-uploads/aafcb339-7f9d-4085-abae-6009f9dac93a.jpg" />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-6 bg-secondary/10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Nossos Serviços</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard icon={<Search />} title="Ultrassom POCUS" description="Diagnóstico avançado por ultrassom para exames obstétricos, ginecológicos, de próstata e abdômen completo." />
            <ServiceCard icon={<Clipboard />} title="Consultas" description="Consultas de enfermagem abrangentes com profissionais experientes." />
            <ServiceCard icon={<Syringe />} title="Procedimentos Médicos" description="Troca de curativos profissional, remoção de verrugas e tratamentos injetáveis." />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Depoimentos de Pacientes</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <TestimonialCard content="A tecnologia de ultrassom POCUS tornou meu exame muito mais confortável e preciso." author="Sarah Johnson" role="Paciente" />
            <TestimonialCard content="Cuidado e atenção excepcionais aos detalhes. A equipe é altamente profissional." author="Michael Chen" role="Paciente" />
            <TestimonialCard content="A consulta mais completa que já tive. Altamente recomendado!" author="Emily Rodriguez" role="Paciente" />
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
              <li>123 Medical Center Dr</li>
              <li>contato@cjrs.care</li>
              <li>(555) 123-4567</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Horário de Funcionamento</h3>
            <ul className="space-y-2">
              <li>Seg-Sex: 9h - 18h</li>
              <li>Sáb: 10h - 16h</li>
              <li>Dom: Fechado</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>;
};
export default Index;