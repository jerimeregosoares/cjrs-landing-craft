
import { useState, useEffect } from 'react';
import { SiteContent, Service } from '@/types/admin';

export const useContentManagement = (initialContent: SiteContent) => {
  const [siteContent, setSiteContent] = useState<SiteContent>(initialContent);
  
  // Load from localStorage when component mounts
  useEffect(() => {
    try {
      const savedContent = localStorage.getItem('siteContent');
      if (savedContent) {
        // We'll parse the content but we won't immediately set the state
        // This prevents double-loading with AdminContext
        const parsedContent = JSON.parse(savedContent);
        
        // Only set the state if we didn't get this from props (initialContent)
        if (JSON.stringify(initialContent) === JSON.stringify({ hero: {}, services: {}, about: {}, testimonials: {}, links: {} })) {
          setSiteContent(parsedContent);
          console.log("Content loaded from localStorage in useContentManagement:", parsedContent);
        }
      }
    } catch (error) {
      console.error("Error loading content from localStorage:", error);
    }
  }, []);
  
  // Content management functions
  const updateContent = (section: string, field: string, value: string | string[] | Service[]) => {
    setSiteContent(prev => {
      // Make sure prev is properly initialized
      const prevContent = prev || initialContent;
      
      // Create a deep copy to avoid modification of nested objects
      const updated = JSON.parse(JSON.stringify(prevContent));
      
      // Make sure the section exists
      if (!updated[section as keyof SiteContent]) {
        updated[section as keyof SiteContent] = {} as any;
      }
      
      // Update the field
      const sectionObj = updated[section as keyof SiteContent] as any;
      sectionObj[field] = value;
      
      // Save to localStorage immediately
      try {
        localStorage.setItem('siteContent', JSON.stringify(updated));
        console.log(`Content updated in ${section}.${field}:`, value);
        console.log("Updated content saved to localStorage:", updated);
      } catch (error) {
        console.error("Error saving content to localStorage:", error);
      }
      
      return updated;
    });
  };
  
  const updateLink = (id: string, newUrl: string) => {
    setSiteContent(prev => {
      // Create a deep copy of the previous state
      const updated = JSON.parse(JSON.stringify(prev));
      
      // Make sure links object exists
      if (!updated.links) {
        updated.links = {};
      }
      
      // Update the specific link
      updated.links[id] = newUrl;
      
      // Save to localStorage immediately
      try {
        localStorage.setItem('siteContent', JSON.stringify(updated));
        console.log(`Link updated - ID: ${id}, New URL: ${newUrl}`);
        console.log("Updated content saved to localStorage:", updated);
      } catch (error) {
        console.error("Error saving content to localStorage:", error);
      }
      
      return updated;
    });
  };

  const addService = (service: Service) => {
    setSiteContent(prev => {
      // Make sure services and items are properly initialized
      const services = prev.services || { title: "Nossos Serviços", items: [] };
      const items = Array.isArray(services.items) ? services.items : [];
      
      const updated = {
        ...prev,
        services: {
          ...services,
          items: [...items, service]
        }
      };
      
      // Save to localStorage immediately
      try {
        localStorage.setItem('siteContent', JSON.stringify(updated));
        console.log("Service added:", service);
        console.log("Updated content saved to localStorage:", updated);
      } catch (error) {
        console.error("Error saving content to localStorage:", error);
      }
      
      return updated;
    });
  };

  const updateService = (id: string, updatedService: Partial<Service>) => {
    setSiteContent(prev => {
      // Make sure services and items are properly initialized
      const services = prev.services || { title: "Nossos Serviços", items: [] };
      const items = Array.isArray(services.items) ? services.items : [];
      
      const updated = {
        ...prev,
        services: {
          ...services,
          items: items.map(service => 
            service.id === id ? { ...service, ...updatedService } : service
          )
        }
      };
      
      // Save to localStorage immediately
      try {
        localStorage.setItem('siteContent', JSON.stringify(updated));
        console.log("Service updated:", id, updatedService);
        console.log("Updated content saved to localStorage:", updated);
      } catch (error) {
        console.error("Error saving content to localStorage:", error);
      }
      
      return updated;
    });
  };

  const deleteService = (id: string) => {
    setSiteContent(prev => {
      // Make sure services and items are properly initialized
      const services = prev.services || { title: "Nossos Serviços", items: [] };
      const items = Array.isArray(services.items) ? services.items : [];
      
      const updated = {
        ...prev,
        services: {
          ...services,
          items: items.filter(service => service.id !== id)
        }
      };
      
      // Save to localStorage immediately
      try {
        localStorage.setItem('siteContent', JSON.stringify(updated));
        console.log("Service deleted:", id);
        console.log("Updated content saved to localStorage:", updated);
      } catch (error) {
        console.error("Error saving content to localStorage:", error);
      }
      
      return updated;
    });
  };

  const reorderServices = (newOrder: Service[]) => {
    setSiteContent(prev => {
      const updated = {
        ...prev,
        services: {
          ...prev.services,
          items: newOrder
        }
      };
      
      // Save to localStorage immediately
      try {
        localStorage.setItem('siteContent', JSON.stringify(updated));
        console.log("Services reordered");
        console.log("Updated content saved to localStorage:", updated);
      } catch (error) {
        console.error("Error saving content to localStorage:", error);
      }
      
      return updated;
    });
  };

  return {
    siteContent,
    setSiteContent,
    updateContent,
    updateLink,
    addService,
    updateService,
    deleteService,
    reorderServices
  };
};
