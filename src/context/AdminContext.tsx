
import React, { createContext, useContext, useEffect } from 'react';
import { SiteContent, CarouselMedia, Testimonial, Service } from '@/types/admin';
import { defaultContent } from './adminDefaults';
import { useAuthManagement } from '@/hooks/useAuthManagement';
import { useContentManagement } from '@/hooks/useContentManagement';
import { useMediaManagement } from '@/hooks/useMediaManagement';
import { useTestimonialManagement } from '@/hooks/useTestimonialManagement';
import { supabase } from '@/integrations/supabase/client';

// Define context type
interface AdminContextType {
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  siteContent: SiteContent;
  carouselMedia: CarouselMedia[];
  updateContent: (section: string, field: string, value: string | string[] | Service[]) => void;
  updateLink: (id: string, newUrl: string) => void;
  deleteTestimonial: (id: string) => void;
  addTestimonial: (testimonial: Omit<Testimonial, 'id' | 'timestamp'>) => void;
  editTestimonial: (id: string, testimonial: Partial<Testimonial>) => void;
  addMedia: (media: Omit<CarouselMedia, 'id'>) => void;
  deleteMedia: (id: string) => void;
  reorderMedia: (id: string, newOrder: number) => void;
  addService: (service: Service) => void;
  updateService: (id: string, service: Partial<Service>) => void;
  deleteService: (id: string) => void;
  reorderServices: (newOrder: Service[]) => void;
  loading: boolean;
}

// Export type references for convenience
export type { SiteContent, CarouselMedia, Testimonial, Service };

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  // Use custom hooks for different concerns
  const { isAuthenticated, setIsAuthenticated, login, logout } = useAuthManagement();
  const { siteContent, setSiteContent, updateContent, updateLink, addService, updateService, deleteService, reorderServices } = useContentManagement(defaultContent);
  const { carouselMedia, loading, fetchCarouselMedia, addMedia, deleteMedia, reorderMedia } = useMediaManagement([]);
  const { deleteTestimonial, addTestimonial, editTestimonial } = useTestimonialManagement();
  
  // Load stored data on component mount
  useEffect(() => {
    // Check if user is already logged in
    const storedAuth = localStorage.getItem('adminAuthenticated');
    if (storedAuth === 'true') {
      setIsAuthenticated(true);
    }
    
    // Load saved content if it exists
    try {
      const storedContent = localStorage.getItem('siteContent');
      if (storedContent) {
        const parsedContent = JSON.parse(storedContent);
        // Ensure all required fields exist
        const validatedContent = {
          hero: {
            title: parsedContent?.hero?.title || defaultContent.hero.title,
            description: parsedContent?.hero?.description || defaultContent.hero.description
          },
          services: {
            title: parsedContent?.services?.title || defaultContent.services.title,
            items: Array.isArray(parsedContent?.services?.items) 
              ? parsedContent.services.items 
              : defaultContent.services.items
          },
          about: {
            title: parsedContent?.about?.title || defaultContent.about.title,
            subtitle: parsedContent?.about?.subtitle || defaultContent.about.subtitle,
            description: Array.isArray(parsedContent?.about?.description) 
              ? parsedContent.about.description 
              : defaultContent.about.description
          },
          testimonials: {
            title: parsedContent?.testimonials?.title || defaultContent.testimonials.title
          },
          links: {
            scheduleAppointment: parsedContent?.links?.scheduleAppointment || defaultContent.links.scheduleAppointment,
            whatsapp: parsedContent?.links?.whatsapp || defaultContent.links.whatsapp
          }
        };
        setSiteContent(validatedContent as SiteContent);
      }
    } catch (error) {
      console.error("Error parsing stored content:", error);
      // Use default content in case of parsing error
      setSiteContent(defaultContent);
    }
    
    // Load carousel media
    fetchCarouselMedia();
  }, []);
  
  // Save content whenever it changes
  useEffect(() => {
    if (isAuthenticated) {
      try {
        localStorage.setItem('siteContent', JSON.stringify(siteContent));
      } catch (error) {
        console.error("Error saving content to localStorage:", error);
      }
    }
  }, [siteContent, isAuthenticated]);

  return (
    <AdminContext.Provider 
      value={{ 
        isAuthenticated, 
        login, 
        logout, 
        siteContent, 
        carouselMedia,
        updateContent,
        updateLink,
        deleteTestimonial,
        addTestimonial,
        editTestimonial,
        addMedia,
        deleteMedia,
        reorderMedia,
        addService,
        updateService,
        deleteService,
        reorderServices,
        loading
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
