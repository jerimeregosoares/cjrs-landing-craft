
import { useState } from 'react';
import { SiteContent, Service } from '@/types/admin';

export const useContentManagement = (initialContent: SiteContent) => {
  const [siteContent, setSiteContent] = useState<SiteContent>(initialContent);
  
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
      // Make sure prev.links is properly initialized
      const links = prev.links || initialContent.links;
      
      // Create a new object to ensure the reference changes
      const newLinks = {
        ...links,
        [id]: newUrl
      };
      
      // Create a new content object with updated links
      const updatedContent = {
        ...prev,
        links: newLinks
      };
      
      // Log for debugging
      console.log(`Link updated - ID: ${id}, New URL: ${newUrl}`);
      console.log("Updated content:", updatedContent);
      
      return updatedContent;
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
