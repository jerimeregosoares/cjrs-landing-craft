import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";
import ServiceCard from "@/components/ServiceCard";
import TestimonialCard from "@/components/TestimonialCard";
import { TestimonialForm } from "@/components/TestimonialForm";
import { Heart, Search, Syringe, Clipboard } from "lucide-react";
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
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <TestimonialCard content="A tecnologia de ultrassom POCUS tornou meu exame muito mais confortável e preciso." author="Sarah Johnson" role="Paciente" rating={5} />
            <TestimonialCard content="Cuidado e atenção excepcionais aos detalhes. A equipe é altamente profissional." author="Michael Chen" role="Paciente" rating={4} />
            <TestimonialCard content="A consulta mais completa que já tive. Altamente recomendado!" author="Emily Rodriguez" role="Paciente" rating={5} />
          </div>
          
          <div className="mt-16">
            <h3 className="text-3xl font-bold mb-8 text-center text-gray-50">Deixe seu Depoimento</h3>
            <TestimonialForm />
          </div>
        </div>
      </section>

      {/* About Professional Section */}
      <section id="about" className="bg-stone-100 py-0 px-0 mx-0 my-0 font-thin">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-center">📚 Formaç​ão Acadêmica Graduação: Enfermagem pela Universidade Federal do Pará (UFPA) Pós-Graduação: Ginecologia Obstetrícia Infectologia Ultrassonografia POCUS.

💼 Experiência Profissional e Legado
🔸 Mais de 20 anos de atuação na assistência à saúde Com décadas de dedicação, Jérime acumulou experiência em diferentes áreas da saúde, sempre atuando com amor e compromisso.
🔸 Conquistas e Aprovações Aprovado em diversos concursos públicos e ocupando posições em hospitais federais de grande relevância. 🔸 Herói da Pandemia de COVID-19 Atuou na linha de frente do combate à pandemia em um hospital de referência para atendimento à COVID-19. Passou por momentos desafiadores e dolorosos, enfrentando riscos e perdas de colegas da enfermagem, mas jamais desistiu de salvar vidas. 🌍 Atuação Atual Jérime Soares dedica seu talento e vocação à UBS Fluvial no município de Anajás, prestando atendimento humanizado às comunidades ribeirinhas. Com orgulho, ele acolhe e cuida daqueles que mais precisam com excelência e dedicação. ✨ Destaques Pessoais Compromisso: Acolher e cuidar com amor e respeito. ❤️ Missão: Promover saúde em áreas remotas, garantindo atendimento digno e acessível a todos. Inspiração: Superar desafios em prol de salvar vidas e inspirar outros profissionais da saúde. Jérime Soares é mais do que um enfermeiro — é um exemplo de coragem, superação e dedicação. 🙌 Segue uma sugestão de ficha criativa e visualmente atraente com as informações que você forneceu: Ficha Profissional: Jérime Soares 🌟 Enfermeiro, Pós-Graduado e Herói da Linha de Frente 🌟 📚 Formaç​ão Acadêmica Graduação: Enfermagem pela Universidade Federal do Pará (UFPA) Pós-Graduação: Ginecologia Obstetrícia Infectologia Ultrassonografia POCUS 💼 Experiência Profissional e Legado 🔸 Mais de 20 anos de atuação na assistência à saúde Com décadas de dedicação, Jérime acumulou experiência em diferentes áreas da saúde, sempre atuando com amor e compromisso. 🔸 Conquistas e Aprovações Aprovado em diversos concursos públicos e ocupando posições em hospitais federais de grande relevância. 🔸 Herói da Pandemia de COVID-19 Atuou na linha de frente do combate à pandemia em um hospital de referência para atendimento à COVID-19. Passou por momentos desafiadores e dolorosos, enfrentando riscos e perdas de colegas da enfermagem, mas jamais desistiu de salvar vidas. 🌍 Atuação Atual Jérime Soares dedica seu talento e vocação à UBS Fluvial no município de Anajás, prestando atendimento humanizado às comunidades ribeirinhas. Com orgulho, ele acolhe e cuida daqueles que mais precisam com excelência e dedicação. ✨ Destaques Pessoais Compromisso: Acolher e cuidar com amor e respeito. ❤️ Missão: Promover saúde em áreas remotas, garantindo atendimento digno e acessível a todos. Inspiração: Superar desafios em prol de salvar vidas e inspirar outros profissionais da saúde. Jérime Soares é mais do que um enfermeiro — é um exemplo de coragem, superação e dedicação. 🙌 Segue uma sugestão de ficha criativa e visualmente atraente com as informações que você forneceu: Ficha Profissional: Jérime Soares 🌟 Enfermeiro, Pós-Graduado e Herói da Linha de Frente 🌟 📚 Formaç​ão Acadêmica Graduação: Enfermagem pela Universidade Federal do Pará (UFPA) Pós-Graduação: Ginecologia Obstetrícia Infectologia Ultrassonografia POCUS 💼 Experiência Profissional e Legado 🔸 Mais de 20 anos de atuação na assistência à saúde Com décadas de dedicação, Jérime acumulou experiência em diferentes áreas da saúde, sempre atuando com amor e compromisso. 🔸 Conquistas e Aprovações Aprovado em diversos concursos públicos e ocupando posições em hospitais federais de grande relevância. 🔸 Herói da Pandemia de COVID-19 Atuou na linha de frente do combate à pandemia em um hospital de referência para atendimento à COVID-19. Passou por momentos desafiadores e dolorosos, enfrentando riscos e perdas de colegas da enfermagem, mas jamais desistiu de salvar vidas. 🌍 Atuação Atual Jérime Soares dedica seu talento e vocação à UBS Fluvial no município de Anajás, prestando atendimento humanizado às comunidades ribeirinhas. Com orgulho, ele acolhe e cuida daqueles que mais precisam com excelência e dedicação. ✨ Destaques Pessoais Compromisso: Acolher e cuidar com amor e respeito. ❤️ Missão: Promover saúde em áreas remotas, garantindo atendimento digno e acessível a todos. Inspiração: Superar desafios em prol de salvar vidas e inspirar outros profissionais da saúde. "Promovendo cuidado humanizado e saúde integral, levando esperança onde mais precisam."</h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg leading-relaxed mx-0 py-0 my-px px-[3px] text-center">📚 Formaç​ão Acadêmica

Graduação: Enfermagem pela Universidade Federal do Pará (UFPA)  
Pós-Graduação:  
Ginecologia  
Obstetrícia  
Infectologia  
Ultrassonografia POCUS




💼 Experiência Profissional e Legado
🔸 Mais de 20 anos de atuação na assistência à saúde  

Com décadas de dedicação, Jérime acumulou experiência em diferentes áreas da saúde, sempre atuando com amor e compromisso.

🔸 Conquistas e Aprovações  

Aprovado em diversos concursos públicos e ocupando posições em hospitais federais de grande relevância.

🔸 Herói da Pandemia de COVID-19  

Atuou na linha de frente do combate à pandemia em um hospital de referência para atendimento à COVID-19.  
Passou por momentos desafiadores e dolorosos, enfrentando riscos e perdas de colegas da enfermagem, mas jamais desistiu de salvar vidas.


🌍 Atuação Atual
Jérime Soares dedica seu talento e vocação à UBS Fluvial no município de Anajás, prestando atendimento humanizado às comunidades ribeirinhas. Com orgulho, ele acolhe e cuida daqueles que mais precisam com excelência e dedicação.  

✨ Destaques Pessoais

Compromisso: Acolher e cuidar com amor e respeito. ❤️  
Missão: Promover saúde em áreas remotas, garantindo atendimento digno e acessível a todos.  
Inspiração: Superar desafios em prol de salvar vidas e inspirar outros profissionais da saúde.


Jérime Soares é mais do que um enfermeiro — é um exemplo de coragem, superação e dedicação. 🙌  
Segue uma sugestão de ficha criativa e visualmente atraente com as informações que você forneceu:  

Ficha Profissional: Jérime Soares
🌟 Enfermeiro, Pós-Graduado e Herói da Linha de Frente 🌟  

📚 Formaç​ão Acadêmica

Graduação: Enfermagem pela Universidade Federal do Pará (UFPA)  
Pós-Graduação:  
Ginecologia  
Obstetrícia  
Infectologia  
Ultrassonografia POCUS




💼 Experiência Profissional e Legado
🔸 Mais de 20 anos de atuação na assistência à saúde  

Com décadas de dedicação, Jérime acumulou experiência em diferentes áreas da saúde, sempre atuando com amor e compromisso.

🔸 Conquistas e Aprovações  

Aprovado em diversos concursos públicos e ocupando posições em hospitais federais de grande relevância.

🔸 Herói da Pandemia de COVID-19  

Atuou na linha de frente do combate à pandemia em um hospital de referência para atendimento à COVID-19.  
Passou por momentos desafiadores e dolorosos, enfrentando riscos e perdas de colegas da enfermagem, mas jamais desistiu de salvar vidas.


🌍 Atuação Atual
Jérime Soares dedica seu talento e vocação à UBS Fluvial no município de Anajás, prestando atendimento humanizado às comunidades ribeirinhas. Com orgulho, ele acolhe e cuida daqueles que mais precisam com excelência e dedicação.  

✨ Destaques Pessoais

Compromisso: Acolher e cuidar com amor e respeito. ❤️  
Missão: Promover saúde em áreas remotas, garantindo atendimento digno e acessível a todos.  
Inspiração: Superar desafios em prol de salvar vidas e inspirar outros profissionais da saúde.


Jérime Soares é mais do que um enfermeiro — é um exemplo de coragem, superação e dedicação. 🙌  

Segue uma sugestão de ficha criativa e visualmente atraente com as informações que você forneceu:

Ficha Profissional: Jérime Soares
🌟 Enfermeiro, Pós-Graduado e Herói da Linha de Frente 🌟

📚 Formaç​ão Acadêmica
Graduação: Enfermagem pela Universidade Federal do Pará (UFPA)
Pós-Graduação:
Ginecologia
Obstetrícia
Infectologia
Ultrassonografia POCUS
💼 Experiência Profissional e Legado
🔸 Mais de 20 anos de atuação na assistência à saúde

Com décadas de dedicação, Jérime acumulou experiência em diferentes áreas da saúde, sempre atuando com amor e compromisso.
🔸 Conquistas e Aprovações

Aprovado em diversos concursos públicos e ocupando posições em hospitais federais de grande relevância.
🔸 Herói da Pandemia de COVID-19

Atuou na linha de frente do combate à pandemia em um hospital de referência para atendimento à COVID-19.
Passou por momentos desafiadores e dolorosos, enfrentando riscos e perdas de colegas da enfermagem, mas jamais desistiu de salvar vidas.
🌍 Atuação Atual
Jérime Soares dedica seu talento e vocação à UBS Fluvial no município de Anajás, prestando atendimento humanizado às comunidades ribeirinhas. Com orgulho, ele acolhe e cuida daqueles que mais precisam com excelência e dedicação.

✨ Destaques Pessoais
Compromisso: Acolher e cuidar com amor e respeito. ❤️
Missão: Promover saúde em áreas remotas, garantindo atendimento digno e acessível a todos.
Inspiração: Superar desafios em prol de salvar vidas e inspirar outros profissionais da saúde.

&quot;Promovendo cuidado humanizado e saúde integral, levando esperança onde mais precisam.&quot;





          </p>
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