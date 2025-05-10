
import { useState, useEffect } from 'react';
import { SiteContent, Service } from '@/types/admin';

export const useContentManagement = (initialContent: SiteContent) => {
  const [siteContent, setSiteContent] = useState<SiteContent>(initialContent);
  
  // Save to localStorage whenever content changes
  useEffect(() => {
    try {
      localStorage.setItem('siteContent', JSON.stringify(siteContent));
      console.log("Content saved to localStorage:", siteContent);
    } catch (error) {
      console.error("Error saving content to localStorage:", error);
    }
  }, [siteContent]);
  
  // Content management functions
  const updateContent = (section: string, field: string, value: string | string[] | Service[]) => {
    setSiteContent(prev => {
      // Make sure prev is properly initialized
      const prevContent = prev || initialContent;
      
      // Create a deep copy to avoid modification of nested objects
      const updated = { ...prevContent };
      
      // Make sure the section exists
      if (!updated[section as keyof SiteContent]) {
        updated[section as keyof SiteContent] = {} as any;
      }
      
      // Update the field
      const sectionObj = updated[section as keyof SiteContent] as any;
      sectionObj[field] = value;
      
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
      
      // Log for debugging
      console.log(`Link updated - ID: ${id}, New URL: ${newUrl}`);
      console.log("Updated content:", updated);
      
      return updated;
    });
  };

  const addService = (service: Service) => {
    setSiteContent(prev => {
      // Make sure services and items are properly initialized
      const services = prev.services || { title: "Nossos Serviços", items: [] };
      const items = Array.isArray(services.items) ? services.items : [];
      
      return {
        ...prev,
        services: {
          ...services,
          items: [...items, service]
        }
      };
    });
  };

  const updateService = (id: string, updatedService: Partial<Service>) => {
    setSiteContent(prev => {
      // Make sure services and items are properly initialized
      const services = prev.services || { title: "Nossos Serviços", items: [] };
      const items = Array.isArray(services.items) ? services.items : [];
      
      return {
        ...prev,
        services: {
          ...services,
          items: items.map(service => 
            service.id === id ? { ...service, ...updatedService } : service
          )
        }
      };
    });
  };

  const deleteService = (id: string) => {
    setSiteContent(prev => {
      // Make sure services and items are properly initialized
      const services = prev.services || { title: "Nossos Serviços", items: [] };
      const items = Array.isArray(services.items) ? services.items : [];
      
      return {
        ...prev,
        services: {
          ...services,
          items: items.filter(service => service.id !== id)
        }
      };
    });
  };

  const reorderServices = (newOrder: Service[]) => {
    setSiteContent(prev => ({
      ...prev,
      services: {
        ...prev.services,
        items: newOrder
      }
    }));
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
