import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { SiteContent, CarouselMedia, Testimonial, Service } from '@/types/admin';
import { defaultContent } from './adminDefaults';
import { useAuthManagement } from '@/hooks/useAuthManagement';
import { useContentManagement } from '@/hooks/useContentManagement';
import { useMediaManagement } from '@/hooks/useMediaManagement';
import { useTestimonialManagement } from '@/hooks/useTestimonialManagement';
import { useSiteContentDB } from '@/hooks/useSiteContentDB';

// Define context type
interface AdminContextType {
  isAuthenticated: boolean;
  isAdmin: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  siteContent: SiteContent;
  setSiteContent: (content: SiteContent) => void;
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
}

// Export type references for convenience
export type { SiteContent, CarouselMedia, Testimonial, Service };

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  // Use custom hooks for different concerns
  const { isAuthenticated, isAdmin, loading: authLoading, login, logout } = useAuthManagement();
  const { siteContent, setSiteContent, updateContent, updateLink, addService, updateService, deleteService, reorderServices } = useContentManagement(defaultContent);
  const { carouselMedia, loading: mediaLoading, fetchCarouselMedia, addMedia, deleteMedia, reorderMedia } = useMediaManagement([]);
  const { deleteTestimonial, addTestimonial, editTestimonial } = useTestimonialManagement();
  const { loadContent, saveContent } = useSiteContentDB();

  // Track if initial load is complete to prevent saving default content
  const isInitialized = useRef(false);
  const [isReady, setIsReady] = useState(false);

  // Load stored data on component mount
  useEffect(() => {
    const initializeContent = async () => {
      console.log("Starting content initialization...");

      // 1. Try to load from Supabase first
      const dbContent = await loadContent();

      if (dbContent) {
        console.log("Loading content from Supabase:", dbContent);
        setSiteContent(dbContent);
        applyThemeColors(dbContent.theme);
        // Update localStorage as cache
        localStorage.setItem('siteContent', JSON.stringify(dbContent));
      } else {
        // 2. Fallback to localStorage if DB is empty or fails
        try {
          const storedContent = localStorage.getItem('siteContent');
          if (storedContent) {
            const parsedContent = JSON.parse(storedContent);
            console.log("Loading content from localStorage:", parsedContent);

            // Create a deep copy of defaultContent as a base
            const fullContent = JSON.parse(JSON.stringify(defaultContent));

            // Merge the loaded content with defaults
            Object.keys(fullContent).forEach(key => {
              if (parsedContent[key]) {
                if (key === 'services' && parsedContent[key]) {
                  fullContent.services = {
                    ...fullContent.services,
                    title: parsedContent.services.title || fullContent.services.title,
                    items: Array.isArray(parsedContent.services.items)
                      ? parsedContent.services.items
                      : fullContent.services.items
                  };
                } else if (key === 'about' && parsedContent[key]) {
                  fullContent.about = {
                    ...fullContent.about,
                    ...parsedContent.about,
                    description: Array.isArray(parsedContent.about.description)
                      ? parsedContent.about.description
                      : fullContent.about.description
                  };
                } else if (key === 'links' && parsedContent[key]) {
                  fullContent.links = {
                    scheduleAppointment: parsedContent.links.scheduleAppointment || fullContent.links.scheduleAppointment,
                    whatsapp: parsedContent.links.whatsapp || fullContent.links.whatsapp,
                    bookConsultation: parsedContent.links.bookConsultation || fullContent.links.bookConsultation,
                    testimonialForm: parsedContent.links.testimonialForm || fullContent.links.testimonialForm,
                    ...parsedContent.links
                  };
                } else if (key === 'theme' && parsedContent[key]) {
                  fullContent.theme = {
                    primaryColor: parsedContent.theme.primaryColor || fullContent.theme.primaryColor,
                    secondaryColor: parsedContent.theme.secondaryColor || fullContent.theme.secondaryColor,
                    accentColor: parsedContent.theme.accentColor || fullContent.theme.accentColor,
                    textColor: parsedContent.theme.textColor || fullContent.theme.textColor,
                    backgroundColor: parsedContent.theme.backgroundColor || fullContent.theme.backgroundColor,
                    adminPrimaryColor: parsedContent.theme.adminPrimaryColor || fullContent.theme.adminPrimaryColor,
                    adminBackgroundColor: parsedContent.theme.adminBackgroundColor || fullContent.theme.adminBackgroundColor,
                    ...parsedContent.theme
                  };
                } else {
                  fullContent[key] = {
                    ...fullContent[key],
                    ...parsedContent[key]
                  };
                }
              }
            });

            setSiteContent(fullContent);
            applyThemeColors(fullContent.theme);

            // Migrate to Supabase - only if authenticated
            if (isAuthenticated && isAdmin) {
              console.log("Migrating localStorage data to Supabase...");
              await saveContent(fullContent);
            }
          } else {
            // 3. Use defaults if nothing exists
            setSiteContent(defaultContent);
            applyThemeColors(defaultContent.theme);
          }
        } catch (error) {
          console.error("Error parsing stored content:", error);
          setSiteContent(defaultContent);
        }
      }

      // Load carousel media
      fetchCarouselMedia();

      // Mark initialization as complete AFTER content is loaded
      isInitialized.current = true;

      setIsReady(true);
      console.log("Content initialization complete");
    };

    initializeContent();
  }, []);

  const applyThemeColors = (theme: SiteContent['theme']) => {
    // Disabled to prevent CSS conflicts with HSL variables
    console.log("Skipping manual theme property application (avoiding HSL conflicts)");
  };

  // Save content whenever it changes - but only after initialization and if admin
  useEffect(() => {
    // Skip if not initialized yet to prevent saving default content
    if (!isInitialized.current) {
      console.log("Skipping save - not initialized yet");
      return;
    }

    if (!isAuthenticated || !isAdmin) {
      console.log("Skipping save - not authenticated as admin");
      return;
    }

    if (!siteContent) {
      console.log("Skipping save - no content");
      return;
    }

    const saveContentChanges = async () => {
      try {
        console.log("Saving content to Supabase...", siteContent);

        // Save to Supabase
        const success = await saveContent(siteContent);
        if (success) {
          console.log("Content saved successfully to Supabase");
        } else {
          console.error("Failed to save content to Supabase");
        }

        // Also save to localStorage as cache
        localStorage.setItem('siteContent', JSON.stringify(siteContent));

        // Apply theme colors when content changes
        if (siteContent.theme) {
          applyThemeColors(siteContent.theme);
        }
      } catch (error) {
        console.error("Error saving content:", error);
      }
    };

    saveContentChanges();
  }, [siteContent, isAuthenticated, isAdmin]);

  const loading = authLoading || mediaLoading;

  return (
    <AdminContext.Provider
      value={{
        isAuthenticated,
        isAdmin,
        loading,
        login,
        logout,
        siteContent,
        setSiteContent,
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
