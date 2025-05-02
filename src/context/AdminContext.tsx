
import React, { createContext, useContext, useEffect } from 'react';
import { SiteContent, CarouselMedia, Testimonial } from '@/types/admin';
import { defaultContent } from './adminDefaults';
import { useAuthManagement } from '@/hooks/useAuthManagement';
import { useContentManagement } from '@/hooks/useContentManagement';
import { useMediaManagement } from '@/hooks/useMediaManagement';
import { useTestimonialManagement } from '@/hooks/useTestimonialManagement';

// Define context type
interface AdminContextType {
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  siteContent: SiteContent;
  carouselMedia: CarouselMedia[];
  updateContent: (section: string, field: string, value: string) => void;
  updateLink: (id: string, newUrl: string) => void;
  deleteTestimonial: (id: string) => void;
  addTestimonial: (testimonial: Omit<Testimonial, 'id' | 'timestamp'>) => void;
  editTestimonial: (id: string, testimonial: Partial<Testimonial>) => void;
  addMedia: (media: Omit<CarouselMedia, 'id'>) => void;
  deleteMedia: (id: string) => void;
  reorderMedia: (id: string, newOrder: number) => void;
}

// Export type references for convenience
export type { SiteContent, CarouselMedia, Testimonial };

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  // Use custom hooks for different concerns
  const { isAuthenticated, setIsAuthenticated, login, logout } = useAuthManagement();
  const { siteContent, setSiteContent, updateContent, updateLink } = useContentManagement(defaultContent);
  const { carouselMedia, setCarouselMedia, addMedia, deleteMedia, reorderMedia } = useMediaManagement([]);
  const { deleteTestimonial, addTestimonial, editTestimonial } = useTestimonialManagement();
  
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
    
    // Load saved carousel media
    const storedMedia = localStorage.getItem('carouselMedia');
    if (storedMedia) {
      setCarouselMedia(JSON.parse(storedMedia));
    }
  }, []);
  
  // Save content whenever it changes
  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem('siteContent', JSON.stringify(siteContent));
    }
  }, [siteContent, isAuthenticated]);
  
  // Save media whenever it changes
  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem('carouselMedia', JSON.stringify(carouselMedia));
    }
  }, [carouselMedia, isAuthenticated]);

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
        reorderMedia
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
