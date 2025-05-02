
import { useState } from 'react';
import { Testimonial } from '@/types/admin';

export const useTestimonialManagement = () => {
  // These functions handle testimonial operations
  const deleteTestimonial = (id: string) => {
    // This will require access to the TestimonialContext
    const testimonials = JSON.parse(localStorage.getItem('testimonials') || '[]');
    const updatedTestimonials = testimonials.filter((t: any) => t.id !== id);
    localStorage.setItem('testimonials', JSON.stringify(updatedTestimonials));
    
    // Return a timestamp to force a refresh in the parent component
    return new Date();
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
    
    // Return a timestamp to force a refresh
    return new Date();
  };
  
  const editTestimonial = (id: string, testimonialUpdate: Partial<Testimonial>) => {
    const testimonials = JSON.parse(localStorage.getItem('testimonials') || '[]');
    const updatedTestimonials = testimonials.map((t: any) => 
      t.id === id ? {...t, ...testimonialUpdate} : t
    );
    localStorage.setItem('testimonials', JSON.stringify(updatedTestimonials));
    
    // Return a timestamp to force a refresh
    return new Date();
  };

  return {
    deleteTestimonial,
    addTestimonial,
    editTestimonial
  };
};
