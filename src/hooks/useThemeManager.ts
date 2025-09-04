import { useEffect } from 'react';
import { SiteContent } from '@/types/admin';

export const useThemeManager = () => {
  const applyThemeColors = (theme: SiteContent['theme']) => {
    if (!theme) {
      console.warn("No theme provided to applyThemeColors");
      return;
    }
    
    try {
      // Apply main site colors
      document.documentElement.style.setProperty('--primary', theme.primaryColor || '#4CAF50');
      document.documentElement.style.setProperty('--secondary', theme.secondaryColor || '#A5D6A7');
      document.documentElement.style.setProperty('--accent', theme.accentColor || '#1A1A1A');
      document.documentElement.style.setProperty('--text', theme.textColor || '#333333');
      document.documentElement.style.setProperty('--background', theme.backgroundColor || '#FFFFFF');
      
      // Apply admin panel colors
      document.documentElement.style.setProperty('--admin-primary', theme.adminPrimaryColor || '#4CAF50');
      document.documentElement.style.setProperty('--admin-background', theme.adminBackgroundColor || '#F1F5F9');
      
      console.log("Theme colors applied successfully:", theme);
    } catch (error) {
      console.error("Error applying theme colors:", error);
    }
  };

  const resetThemeToDefault = () => {
    const defaultTheme = {
      primaryColor: "#4CAF50",
      secondaryColor: "#A5D6A7",
      accentColor: "#1A1A1A",
      textColor: "#333333",
      backgroundColor: "#FFFFFF",
      adminPrimaryColor: "#4CAF50",
      adminBackgroundColor: "#F1F5F9"
    };
    
    applyThemeColors(defaultTheme);
    console.log("Theme reset to default");
  };

  return {
    applyThemeColors,
    resetThemeToDefault
  };
};

// Hook for components that need to react to theme changes
export const useThemeEffect = (theme: SiteContent['theme']) => {
  const { applyThemeColors } = useThemeManager();
  
  useEffect(() => {
    if (theme) {
      applyThemeColors(theme);
    }
  }, [theme, applyThemeColors]);
};