
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Testimonial {
  id: string;
  content: string;
  author: string;
  role: string;
  rating: number;
  timestamp: Date;
}

// Sample initial testimonials (fallback if localStorage is empty)
const sampleTestimonials: Testimonial[] = [
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
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  
  // Load testimonials from localStorage on component mount
  useEffect(() => {
    const loadTestimonials = () => {
      try {
        const storedTestimonials = localStorage.getItem('testimonials');
        if (storedTestimonials) {
          // Parse the stored JSON and convert timestamp strings back to Date objects
          const parsedTestimonials = JSON.parse(storedTestimonials).map((item: any) => ({
            ...item,
            timestamp: new Date(item.timestamp)
          }));
          setTestimonials(parsedTestimonials);
        } else {
          // If no testimonials in localStorage, use sample testimonials
          setTestimonials(sampleTestimonials);
          // Save sample testimonials to localStorage
          localStorage.setItem('testimonials', JSON.stringify(sampleTestimonials));
        }
      } catch (error) {
        console.error('Error loading testimonials:', error);
        setTestimonials(sampleTestimonials);
      }
    };

    loadTestimonials();
  }, []);

  // Save testimonials to localStorage whenever they change
  useEffect(() => {
    if (testimonials.length > 0) {
      try {
        localStorage.setItem('testimonials', JSON.stringify(testimonials));
      } catch (error) {
        console.error('Error saving testimonials:', error);
      }
    }
  }, [testimonials]);

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
