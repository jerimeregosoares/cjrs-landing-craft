
import { SiteContent } from "@/types/admin";

// Default admin password
export const DEFAULT_PASSWORD = "admin123";

// Initialize default content
export const defaultContent: SiteContent = {
  hero: {
    title: "Cuidados de Enfermagem Avançados com Tecnologia POCUS",
    description: "Consultas e procedimentos de enfermagem especializados utilizando tecnologia de ultrassom POCUS (point-of-care) de última geração para diagnóstico e tratamento precisos."
  },
  services: {
    title: "Nossos Serviços"
  },
  about: {
    title: "Sobre o Profissional",
    subtitle: "Enfermeiro Jérime Soares",
    description: [
      "Graduado pela Universidade Federal do Pará.",
      "Pós graduado em ginecologia, obstetrícia, infectologia e ultrassonografia POCUS.",
      "Atuou na linha de frente prestando assistência direta aos acometidos pelo corona vírus no hospital federal João de Barros Barreto.",
      "Ao longo de sua carreira, o Enfermeiro Jérime ocupou diversos cargos de responsabilidade, desenvolvendo habilidades técnicas e experiência clínica de excelência."
    ]
  },
  testimonials: {
    title: "Depoimentos de Pacientes"
  },
  links: {
    scheduleAppointment: "https://painelconsult.servicoscjrs.com.br/a/jerime-r-soares",
    whatsapp: "https://wa.me/559191953465?text=Gostaria%20de%20fazer%20um%20agendamento"
  }
};
