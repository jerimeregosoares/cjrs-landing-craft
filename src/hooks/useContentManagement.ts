
import { useState } from 'react';
import { SiteContent } from '@/types/admin';

export const useContentManagement = (initialContent: SiteContent) => {
  const [siteContent, setSiteContent] = useState<SiteContent>(initialContent);
  
  // Content management functions
  const updateContent = (section: string, field: string, value: string | string[]) => {
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

  return {
    siteContent,
    setSiteContent,
    updateContent,
    updateLink
  };
};
