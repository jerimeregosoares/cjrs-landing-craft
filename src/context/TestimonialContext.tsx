
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Testimonial {
  id: string;
  content: string;
  author: string;
  role: string;
  rating: number;
  timestamp: Date;
}

interface TestimonialContextType {
  testimonials: Testimonial[];
  addTestimonial: (testimonial: Omit<Testimonial, 'id' | 'timestamp'>) => Promise<void>;
  isLoading: boolean;
  refreshTestimonials: () => Promise<void>;
}

const TestimonialContext = createContext<TestimonialContextType | undefined>(undefined);

export const TestimonialProvider = ({ children }: { children: ReactNode }) => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Function to fetch testimonials
  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('timestamp', { ascending: false });
      
      if (error) {
        console.error('Erro ao carregar depoimentos:', error);
        return;
      }
      
      if (data) {
        // Converter timestamp de string para objeto Date
        const parsedTestimonials = data.map((item) => ({
          ...item,
          timestamp: new Date(item.timestamp)
        }));
        
        setTestimonials(parsedTestimonials);
      }
    } catch (error) {
      console.error('Erro ao buscar depoimentos:', error);
    } finally {
      setLoading(false);
    }
  };

  // Load testimonials initially
  useEffect(() => {
    fetchTestimonials();
  }, []);

  // Function to add a new testimonial
  const addTestimonial = async (newTestimonial: Omit<Testimonial, 'id' | 'timestamp'>) => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .insert([{
          content: newTestimonial.content,
          author: newTestimonial.author,
          role: newTestimonial.role,
          rating: newTestimonial.rating
        }])
        .select()
        .single();
        
      if (error) {
        console.error('Erro ao adicionar depoimento:', error);
        return;
      }
      
      if (data) {
        // Adicionar o novo depoimento ao estado com timestamp como objeto Date
        const testimonial: Testimonial = {
          ...data,
          timestamp: new Date(data.timestamp)
        };
        
        setTestimonials(prev => [testimonial, ...prev]);
      }
    } catch (error) {
      console.error('Erro ao adicionar depoimento:', error);
    }
  };

  // Function to refresh testimonials data
  const refreshTestimonials = async () => {
    await fetchTestimonials();
  };

  return (
    <TestimonialContext.Provider value={{ 
      testimonials, 
      addTestimonial, 
      isLoading: loading,
      refreshTestimonials 
    }}>
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
