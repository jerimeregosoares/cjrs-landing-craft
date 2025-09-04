
import { useState } from 'react';
import { SiteContent, Service } from '@/types/admin';

export const useContentManagement = (initialContent: SiteContent) => {
  const [siteContent, setSiteContent] = useState<SiteContent>(initialContent);
  
  // Content management functions - removed localStorage logic to avoid conflicts with AdminContext
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
      
      console.log(`Content updated in ${section}.${field}:`, value);
      
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
      
      console.log(`Link updated - ID: ${id}, New URL: ${newUrl}`);
      
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
      
      console.log("Service added:", service);
      
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
      
      console.log("Service updated:", id, updatedService);
      
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
      
      console.log("Service deleted:", id);
      
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
      
      console.log("Services reordered");
      
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
