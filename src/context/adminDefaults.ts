
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
    title: "Nossos Serviços",
    items: [
      {
        id: "service-1",
        title: "Ultrassom POCUS",
        description: "Diagnóstico avançado por ultrassom para exames obstétricos, ginecológicos, de próstata e abdômen completo.",
        icon: "search",
        price: "A partir de R$150"
      },
      {
        id: "service-2",
        title: "Consultas",
        description: "Consultas de enfermagem abrangentes com profissionais experientes.",
        icon: "clipboard",
        price: "R$100"
      },
      {
        id: "service-3",
        title: "Procedimentos Médicos",
        description: "Troca de curativos profissional, remoção de verrugas e tratamentos injetáveis.",
        icon: "syringe",
        price: "A partir de R$80"
      }
    ]
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
    scheduleAppointment: "https://pronto-jr-digital.lovable.app/public/agendamento",
    whatsapp: "https://wa.me/559191953465?text=Gostaria%20de%20tirar%20tirar dúvidas",
    bookConsultation: "https://pronto-jr-digital.lovable.app/public/agendamento",
    testimonialForm: "",
    heroSecondary: "#about",
    heroTertiary: "https://pronto-jr-digital.lovable.app/public/agendamento",
  },
  buttonLabels: {
    scheduleAppointment: "Agendar Consulta",
    whatsapp: "WhatsApp Dúvidas",
    bookConsultation: "Agende sua Consulta",
    heroSecondary: "Sobre o Profissional",
    heroTertiary: "Cadastro Único",
  },
  theme: {
    primaryColor: "#4CAF50",
    secondaryColor: "#A5D6A7",
    accentColor: "#1A1A1A",
    textColor: "#333333",
    backgroundColor: "#FFFFFF",
    adminPrimaryColor: "#4CAF50",
    adminBackgroundColor: "#F1F5F9"
  }
};
