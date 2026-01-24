
import { useState } from 'react';
import { Testimonial } from '@/types/admin';
import { supabase } from '@/integrations/supabase/client';

export const useTestimonialManagement = () => {
  const [isLoading, setIsLoading] = useState(false);

  const deleteTestimonial = async (id: string) => {
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('testimonials')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Erro ao excluir depoimento:', error);
        throw error;
      }

      return true;
    } catch (error) {
      console.error('Erro ao excluir depoimento:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const addTestimonial = async (testimonial: Omit<Testimonial, 'id' | 'timestamp'>) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .insert([{
          content: testimonial.content,
          author: testimonial.author,
          role: testimonial.role,
          rating: testimonial.rating
        }])
        .select()
        .single();

      if (error) {
        console.error('Erro ao adicionar depoimento:', error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Erro ao adicionar depoimento:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const editTestimonial = async (id: string, testimonialUpdate: Partial<Testimonial>) => {
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('testimonials')
        .update({
          content: testimonialUpdate.content,
          author: testimonialUpdate.author,
          role: testimonialUpdate.role,
          rating: Number(testimonialUpdate.rating)
        })
        .eq('id', id);

      if (error) {
        console.error('ERRO SUPABASE (Update):', error.message, error.details || '', error.hint || '');
        throw new Error(error.message || 'Erro ao atualizar no banco de dados');
      }

      return true;
    } catch (error: any) {
      console.error('Erro ao atualizar depoimento (Catch):', error.message || error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    deleteTestimonial,
    addTestimonial,
    editTestimonial,
    isLoading
  };
};
