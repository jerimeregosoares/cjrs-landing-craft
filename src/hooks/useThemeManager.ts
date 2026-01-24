import { useEffect } from 'react';
import { SiteContent } from '@/types/admin';

export const useThemeManager = () => {
  const applyThemeColors = (theme: SiteContent['theme']) => {
    // Disabled to prevent CSS conflicts with HSL variables
    console.log("Skipping manual theme property application (avoiding HSL conflicts)");
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