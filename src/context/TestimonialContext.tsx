
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Testimonial {
  id: string;
  content: string;
  author: string;
  role: string;
  rating: number;
  timestamp: Date;
}

// Sample initial testimonials
const initialTestimonials: Testimonial[] = [
  {
    id: '1',
    content: "A tecnologia de ultrassom POCUS tornou meu exame muito mais confortável e preciso.",
    author: "Sarah Johnson",
    role: "Paciente",
    rating: 5,
    timestamp: new Date(2024, 3, 15)
  },
  {
    id: '2',
    content: "Cuidado e atenção excepcionais aos detalhes. A equipe é altamente profissional.",
    author: "Michael Chen",
    role: "Paciente",
    rating: 4,
    timestamp: new Date(2024, 3, 10)
  },
  {
    id: '3',
    content: "A consulta mais completa que já tive. Altamente recomendado!",
    author: "Emily Rodriguez",
    role: "Paciente",
    rating: 5,
    timestamp: new Date(2024, 3, 5)
  }
];

interface TestimonialContextType {
  testimonials: Testimonial[];
  addTestimonial: (testimonial: Omit<Testimonial, 'id' | 'timestamp'>) => void;
}

const TestimonialContext = createContext<TestimonialContextType | undefined>(undefined);

export const TestimonialProvider = ({ children }: { children: ReactNode }) => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);

  const addTestimonial = (newTestimonial: Omit<Testimonial, 'id' | 'timestamp'>) => {
    const testimonial: Testimonial = {
      ...newTestimonial,
      id: Date.now().toString(),
      timestamp: new Date()
    };
    
    setTestimonials(prev => [testimonial, ...prev]);
  };

  return (
    <TestimonialContext.Provider value={{ testimonials, addTestimonial }}>
      {children}
    </TestimonialContext.Provider>
  );
};

export const useTestimonials = () => {
  const context = useContext(TestimonialContext);
  if (context === undefined) {
    throw new Error('useTestimonials must be used within a TestimonialProvider');
  }
  return context;
};
