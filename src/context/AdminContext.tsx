
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define types
interface AdminContextType {
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  siteContent: SiteContent;
  updateContent: (section: string, field: string, value: string) => void;
  updateLink: (id: string, newUrl: string) => void;
  deleteTestimonial: (id: string) => void;
  addTestimonial: (testimonial: Omit<Testimonial, 'id' | 'timestamp'>) => void;
  editTestimonial: (id: string, testimonial: Partial<Testimonial>) => void;
}

export interface SiteContent {
  hero: {
    title: string;
    description: string;
  };
  services: {
    title: string;
  };
  about: {
    title: string;
    subtitle: string;
    description: string[];
  };
  testimonials: {
    title: string;
  };
  links: {
    scheduleAppointment: string;
    whatsapp: string;
  };
}

export interface Testimonial {
  id: string;
  content: string;
  author: string;
  role: string;
  rating: number;
  timestamp: Date;
}

// Default admin password
const DEFAULT_PASSWORD = "admin123";

// Initialize default content
const defaultContent: SiteContent = {
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

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [siteContent, setSiteContent] = useState<SiteContent>(defaultContent);
  
  // Load stored data on component mount
  useEffect(() => {
    // Check if user is already logged in
    const storedAuth = localStorage.getItem('adminAuthenticated');
    if (storedAuth === 'true') {
      setIsAuthenticated(true);
    }
    
    // Load saved content if it exists
    const storedContent = localStorage.getItem('siteContent');
    if (storedContent) {
      setSiteContent(JSON.parse(storedContent));
    }
  }, []);
  
  // Save content whenever it changes
  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem('siteContent', JSON.stringify(siteContent));
    }
  }, [siteContent, isAuthenticated]);
  
  const login = (password: string): boolean => {
    // In a real application, you'd want to use a more secure authentication method
    if (password === DEFAULT_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem('adminAuthenticated', 'true');
      return true;
    }
    return false;
  };
  
  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('adminAuthenticated');
  };
  
  const updateContent = (section: string, field: string, value: string) => {
    setSiteContent(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof SiteContent],
        [field]: value
      }
    }));
  };
  
  const updateLink = (id: string, newUrl: string) => {
    setSiteContent(prev => ({
      ...prev,
      links: {
        ...prev.links,
        [id]: newUrl
      }
    }));
  };
  
  const deleteTestimonial = (id: string) => {
    // This will require access to the TestimonialContext
    const testimonials = JSON.parse(localStorage.getItem('testimonials') || '[]');
    const updatedTestimonials = testimonials.filter((t: any) => t.id !== id);
    localStorage.setItem('testimonials', JSON.stringify(updatedTestimonials));
    
    // Force a refresh by updating a timestamp
    setSiteContent(prev => ({...prev}));
  };
  
  const addTestimonial = (testimonial: Omit<Testimonial, 'id' | 'timestamp'>) => {
    const newTestimonial = {
      ...testimonial,
      id: Date.now().toString(),
      timestamp: new Date()
    };
    
    const testimonials = JSON.parse(localStorage.getItem('testimonials') || '[]');
    const updatedTestimonials = [newTestimonial, ...testimonials];
    localStorage.setItem('testimonials', JSON.stringify(updatedTestimonials));
    
    // Force a refresh
    setSiteContent(prev => ({...prev}));
  };
  
  const editTestimonial = (id: string, testimonialUpdate: Partial<Testimonial>) => {
    const testimonials = JSON.parse(localStorage.getItem('testimonials') || '[]');
    const updatedTestimonials = testimonials.map((t: any) => 
      t.id === id ? {...t, ...testimonialUpdate} : t
    );
    localStorage.setItem('testimonials', JSON.stringify(updatedTestimonials));
    
    // Force a refresh
    setSiteContent(prev => ({...prev}));
  };

  return (
    <AdminContext.Provider 
      value={{ 
        isAuthenticated, 
        login, 
        logout, 
        siteContent, 
        updateContent,
        updateLink,
        deleteTestimonial,
        addTestimonial,
        editTestimonial
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
