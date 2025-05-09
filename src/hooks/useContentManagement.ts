
import { useState } from 'react';
import { SiteContent, Service } from '@/types/admin';

export const useContentManagement = (initialContent: SiteContent) => {
  const [siteContent, setSiteContent] = useState<SiteContent>(initialContent);
  
  // Content management functions
  const updateContent = (section: string, field: string, value: string | string[] | Service[]) => {
    setSiteContent(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof SiteContent],
        [field]: value
      }
    }));
  };
  
  const updateLink = (id: string, newUrl: string) => {
    setSiteContent(prev => ({
      ...prev,
      links: {
        ...prev.links,
        [id]: newUrl
      }
    }));
  };

  const addService = (service: Service) => {
    setSiteContent(prev => ({
      ...prev,
      services: {
        ...prev.services,
        items: [...prev.services.items, service]
      }
    }));
  };

  const updateService = (id: string, updatedService: Partial<Service>) => {
    setSiteContent(prev => ({
      ...prev,
      services: {
        ...prev.services,
        items: prev.services.items.map(service => 
          service.id === id ? { ...service, ...updatedService } : service
        )
      }
    }));
  };

  const deleteService = (id: string) => {
    setSiteContent(prev => ({
      ...prev,
      services: {
        ...prev.services,
        items: prev.services.items.filter(service => service.id !== id)
      }
    }));
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
