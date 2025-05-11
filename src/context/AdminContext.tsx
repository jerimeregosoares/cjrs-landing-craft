
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
  deleteTestimonial: (id: string) => Promise<boolean>;
  addTestimonial: (testimonial: Omit<Testimonial, 'id' | 'timestamp'>) => Promise<any>;
  editTestimonial: (id: string, testimonial: Partial<Testimonial>) => Promise<boolean>;
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
        console.log("Loading content from localStorage:", parsedContent);
        
        // Create a deep copy of defaultContent as a base to ensure all fields exist
        const fullContent = JSON.parse(JSON.stringify(defaultContent));
        
        // Merge the loaded content with the default content
        if (parsedContent.hero) {
          fullContent.hero = {
            ...fullContent.hero,
            ...parsedContent.hero
          };
        }
        
        if (parsedContent.services) {
          fullContent.services = {
            ...fullContent.services,
            title: parsedContent.services.title || fullContent.services.title,
            items: Array.isArray(parsedContent.services.items) 
              ? parsedContent.services.items 
              : fullContent.services.items
          };
        }
        
        if (parsedContent.about) {
          fullContent.about = {
            ...fullContent.about,
            ...parsedContent.about,
            description: Array.isArray(parsedContent.about.description) 
              ? parsedContent.about.description 
              : fullContent.about.description
          };
        }
        
        if (parsedContent.testimonials) {
          fullContent.testimonials = {
            ...fullContent.testimonials,
            ...parsedContent.testimonials
          };
        }
        
        if (parsedContent.links) {
          fullContent.links = {
            ...fullContent.links,
            ...parsedContent.links
          };
        }
        
        if (parsedContent.theme) {
          fullContent.theme = {
            ...fullContent.theme,
            ...parsedContent.theme
          };
        }
        
        setSiteContent(fullContent);
        console.log("Merged content:", fullContent);
        
        // Apply theme colors immediately
        applyThemeColors(fullContent.theme);
      }
    } catch (error) {
      console.error("Error parsing stored content:", error);
      // Use default content in case of parsing error
      setSiteContent(defaultContent);
    }
    
    // Load carousel media
    fetchCarouselMedia();
  }, []);
  
  // Function to apply theme colors to CSS variables
  const applyThemeColors = (theme: SiteContent['theme']) => {
    if (!theme) return;
    
    try {
      document.documentElement.style.setProperty('--primary', theme.primaryColor);
      document.documentElement.style.setProperty('--secondary', theme.secondaryColor);
      document.documentElement.style.setProperty('--accent', theme.accentColor);
      document.documentElement.style.setProperty('--text', theme.textColor);
      document.documentElement.style.setProperty('--background', theme.backgroundColor);
      
      // Admin panel colors if in admin section
      if (document.body.classList.contains('admin-panel')) {
        document.documentElement.style.setProperty('--admin-primary', theme.adminPrimaryColor);
        document.documentElement.style.setProperty('--admin-background', theme.adminBackgroundColor);
      }
      
      console.log("Theme colors applied:", theme);
    } catch (error) {
      console.error("Error applying theme colors:", error);
    }
  };
  
  // Save content whenever it changes
  useEffect(() => {
    if (isAuthenticated && siteContent) {
      try {
        localStorage.setItem('siteContent', JSON.stringify(siteContent));
        console.log("Content saved to localStorage from AdminContext:", siteContent);
        
        // Apply theme colors when content changes
        if (siteContent.theme) {
          applyThemeColors(siteContent.theme);
        }
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
