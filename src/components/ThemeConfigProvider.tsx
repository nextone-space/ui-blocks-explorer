import React, { createContext, useContext, useEffect, useState } from "react";
import { useTheme } from "./ThemeProvider";

interface ThemeConfigContextType {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  borderRadius: string;
  fontScale: number;
  fontFamily: string;
  headingFontFamily: string;
  letterSpacing: number;
  lineHeight: number;
  mutedColor: string;
  backgroundColor: string;
  cardColor: string;
  textColor: string;
  borderColor: string;
  updateThemeConfig: (config: Partial<ThemeConfigValues>) => void;
  resetThemeConfig: () => void;
  applyPreset: (presetName: string) => void;
}

interface ThemeConfigValues {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  borderRadius: string;
  fontScale: number;
  fontFamily: string;
  headingFontFamily: string;
  letterSpacing: number;
  lineHeight: number;
  mutedColor: string;
  backgroundColor: string;
  cardColor: string;
  textColor: string;
  borderColor: string;
}

// Default light theme config
const defaultLightThemeConfig: ThemeConfigValues = {
  primaryColor: "222.2 47.4% 11.2%",
  secondaryColor: "210 40% 96.1%",
  accentColor: "210 40% 96.1%",
  borderRadius: "0.5rem",
  fontScale: 1,
  fontFamily: "system-ui, sans-serif",
  headingFontFamily: "system-ui, sans-serif",
  letterSpacing: 0,
  lineHeight: 1.5,
  mutedColor: "210 40% 96.1%",
  backgroundColor: "0 0% 100%",
  cardColor: "0 0% 100%",
  textColor: "222.2 84% 4.9%",
  borderColor: "214.3 31.8% 91.4%",
};

// Default dark theme config
const defaultDarkThemeConfig: ThemeConfigValues = {
  primaryColor: "210 40% 98%",
  secondaryColor: "217.2 32.6% 17.5%",
  accentColor: "217.2 32.6% 17.5%",
  borderRadius: "0.5rem",
  fontScale: 1,
  fontFamily: "system-ui, sans-serif",
  headingFontFamily: "system-ui, sans-serif",
  letterSpacing: 0,
  lineHeight: 1.5,
  mutedColor: "217.2 32.6% 17.5%",
  backgroundColor: "222.2 84% 4.9%",
  cardColor: "222.2 84% 4.9%",
  textColor: "210 40% 98%",
  borderColor: "217.2 32.6% 17.5%",
};

// Theme presets for light and dark modes
const themePresets = {
  light: {
    default: defaultLightThemeConfig,
    blue: {
      primaryColor: "221 83% 53%", // Blue
      secondaryColor: "210 40% 96.1%",
      accentColor: "221 83% 84%", // Light Blue
      borderRadius: "0.5rem",
      fontScale: 1,
      fontFamily: "system-ui, sans-serif",
      headingFontFamily: "system-ui, sans-serif",
      letterSpacing: 0,
      lineHeight: 1.5,
      mutedColor: "210 40% 96.1%",
      backgroundColor: "0 0% 100%",
      cardColor: "0 0% 100%",
      textColor: "222.2 84% 4.9%",
      borderColor: "214.3 31.8% 91.4%",
    },
    green: {
      primaryColor: "142 71% 45%", // Green
      secondaryColor: "210 40% 96.1%",
      accentColor: "142 71% 84%", // Light Green
      borderRadius: "0.5rem",
      fontScale: 1,
      fontFamily: "system-ui, sans-serif",
      headingFontFamily: "system-ui, sans-serif",
      letterSpacing: 0,
      lineHeight: 1.5,
      mutedColor: "210 40% 96.1%",
      backgroundColor: "0 0% 100%",
      cardColor: "0 0% 100%",
      textColor: "222.2 84% 4.9%",
      borderColor: "214.3 31.8% 91.4%",
    },
    purple: {
      primaryColor: "262 83.3% 57.8%", // Purple
      secondaryColor: "210 40% 96.1%",
      accentColor: "262 83% 84%", // Light Purple
      borderRadius: "0.5rem",
      fontScale: 1,
      fontFamily: "system-ui, sans-serif",
      headingFontFamily: "system-ui, sans-serif",
      letterSpacing: 0,
      lineHeight: 1.5,
      mutedColor: "210 40% 96.1%",
      backgroundColor: "0 0% 100%",
      cardColor: "0 0% 100%",
      textColor: "222.2 84% 4.9%",
      borderColor: "214.3 31.8% 91.4%",
    },
    orange: {
      primaryColor: "36 100% 50%", // Orange
      secondaryColor: "210 40% 96.1%",
      accentColor: "36 100% 84%", // Light Orange
      borderRadius: "0.5rem",
      fontScale: 1,
      fontFamily: "system-ui, sans-serif",
      headingFontFamily: "system-ui, sans-serif",
      letterSpacing: 0,
      lineHeight: 1.5,
      mutedColor: "210 40% 96.1%",
      backgroundColor: "0 0% 100%",
      cardColor: "0 0% 100%",
      textColor: "222.2 84% 4.9%",
      borderColor: "214.3 31.8% 91.4%",
    },
    compact: {
      ...defaultLightThemeConfig,
      borderRadius: "0.25rem",
      fontScale: 0.9,
      letterSpacing: -0.5,
      lineHeight: 1.4,
    },
    spacious: {
      ...defaultLightThemeConfig,
      borderRadius: "1rem",
      fontScale: 1.1,
      letterSpacing: 0.5,
      lineHeight: 1.8,
    },
    serif: {
      ...defaultLightThemeConfig,
      fontFamily: "Georgia, serif",
      headingFontFamily: "Georgia, serif",
      letterSpacing: 0.2,
      lineHeight: 1.6,
    },
    modern: {
      ...defaultLightThemeConfig,
      fontFamily: "system-ui, sans-serif",
      headingFontFamily: "Garamond, serif",
      letterSpacing: 0.1,
      lineHeight: 1.6,
    },
  },
  dark: {
    default: defaultDarkThemeConfig,
    blue: {
      primaryColor: "221 83% 84%", // Light Blue
      secondaryColor: "217.2 32.6% 17.5%",
      accentColor: "221 83% 53%", // Blue
      borderRadius: "0.5rem",
      fontScale: 1,
      fontFamily: "system-ui, sans-serif",
      headingFontFamily: "system-ui, sans-serif",
      letterSpacing: 0,
      lineHeight: 1.5,
      mutedColor: "217.2 32.6% 17.5%",
      backgroundColor: "222.2 84% 4.9%",
      cardColor: "222.2 84% 4.9%",
      textColor: "210 40% 98%",
      borderColor: "217.2 32.6% 17.5%",
    },
    green: {
      primaryColor: "142 71% 84%", // Light Green
      secondaryColor: "217.2 32.6% 17.5%",
      accentColor: "142 71% 45%", // Green
      borderRadius: "0.5rem",
      fontScale: 1,
      fontFamily: "system-ui, sans-serif",
      headingFontFamily: "system-ui, sans-serif",
      letterSpacing: 0,
      lineHeight: 1.5,
      mutedColor: "217.2 32.6% 17.5%",
      backgroundColor: "222.2 84% 4.9%",
      cardColor: "222.2 84% 4.9%",
      textColor: "210 40% 98%",
      borderColor: "217.2 32.6% 17.5%",
    },
    purple: {
      primaryColor: "262 83% 84%", // Light Purple
      secondaryColor: "217.2 32.6% 17.5%",
      accentColor: "262 83.3% 57.8%", // Purple
      borderRadius: "0.5rem",
      fontScale: 1,
      fontFamily: "system-ui, sans-serif",
      headingFontFamily: "system-ui, sans-serif",
      letterSpacing: 0,
      lineHeight: 1.5,
      mutedColor: "217.2 32.6% 17.5%",
      backgroundColor: "222.2 84% 4.9%",
      cardColor: "222.2 84% 4.9%",
      textColor: "210 40% 98%",
      borderColor: "217.2 32.6% 17.5%",
    },
    orange: {
      primaryColor: "36 100% 84%", // Light Orange
      secondaryColor: "217.2 32.6% 17.5%",
      accentColor: "36 100% 50%", // Orange
      borderRadius: "0.5rem",
      fontScale: 1,
      fontFamily: "system-ui, sans-serif",
      headingFontFamily: "system-ui, sans-serif",
      letterSpacing: 0,
      lineHeight: 1.5,
      mutedColor: "217.2 32.6% 17.5%",
      backgroundColor: "222.2 84% 4.9%",
      cardColor: "222.2 84% 4.9%",
      textColor: "210 40% 98%",
      borderColor: "217.2 32.6% 17.5%",
    },
    compact: {
      ...defaultDarkThemeConfig,
      borderRadius: "0.25rem",
      fontScale: 0.9,
      letterSpacing: -0.5,
      lineHeight: 1.4,
    },
    spacious: {
      ...defaultDarkThemeConfig,
      borderRadius: "1rem",
      fontScale: 1.1,
      letterSpacing: 0.5,
      lineHeight: 1.8,
    },
    serif: {
      ...defaultDarkThemeConfig,
      fontFamily: "Georgia, serif",
      headingFontFamily: "Georgia, serif",
      letterSpacing: 0.2,
      lineHeight: 1.6,
    },
    modern: {
      ...defaultDarkThemeConfig,
      fontFamily: "system-ui, sans-serif",
      headingFontFamily: "Garamond, serif",
      letterSpacing: 0.1,
      lineHeight: 1.6,
    },
  },
};

const ThemeConfigContext = createContext<ThemeConfigContextType | undefined>(undefined);

export function ThemeConfigProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  const [themeConfig, setThemeConfig] = useState<ThemeConfigValues>(() => {
    // Try to load saved theme config from localStorage
    if (typeof window !== "undefined") {
      const savedConfig = localStorage.getItem(`themeConfig_${theme}`);
      if (savedConfig) {
        try {
          // Merge saved config with default config to handle missing properties
          const parsedConfig = JSON.parse(savedConfig);
          const defaultConfig = theme === 'dark' ? defaultDarkThemeConfig : defaultLightThemeConfig;
          return { ...defaultConfig, ...parsedConfig };
        } catch (e) {
          console.error("Failed to parse saved theme config", e);
        }
      }
    }
    return theme === 'dark' ? defaultDarkThemeConfig : defaultLightThemeConfig;
  });

  // Update config when theme changes
  useEffect(() => {
    const defaultConfig = theme === 'dark' ? defaultDarkThemeConfig : defaultLightThemeConfig;
    const savedConfig = localStorage.getItem(`themeConfig_${theme}`);
    if (savedConfig) {
      try {
        // Merge saved config with default config to ensure all properties exist
        const parsedConfig = JSON.parse(savedConfig);
        setThemeConfig({ ...defaultConfig, ...parsedConfig });
      } catch (e) {
        setThemeConfig(defaultConfig);
      }
    } else {
      setThemeConfig(defaultConfig);
    }
  }, [theme]);
  
  // Apply theme configuration to CSS variables
  useEffect(() => {
    const root = document.documentElement;
    
    // Apply theme config values to CSS variables
    root.style.setProperty("--primary", themeConfig.primaryColor);
    root.style.setProperty("--primary-foreground", theme === 'dark' ? "222.2 47.4% 11.2%" : "210 40% 98%");
    
    root.style.setProperty("--secondary", themeConfig.secondaryColor);
    root.style.setProperty("--secondary-foreground", theme === 'dark' ? "210 40% 98%" : "222.2 47.4% 11.2%");
    
    root.style.setProperty("--accent", themeConfig.accentColor);
    root.style.setProperty("--accent-foreground", theme === 'dark' ? "210 40% 98%" : "222.2 47.4% 11.2%");
    
    root.style.setProperty("--muted", themeConfig.mutedColor);
    root.style.setProperty("--muted-foreground", theme === 'dark' ? "215 20.2% 65.1%" : "215.4 16.3% 46.9%");
    
    root.style.setProperty("--background", themeConfig.backgroundColor);
    root.style.setProperty("--foreground", themeConfig.textColor);
    
    root.style.setProperty("--card", themeConfig.cardColor);
    root.style.setProperty("--card-foreground", themeConfig.textColor);
    
    root.style.setProperty("--border", themeConfig.borderColor);
    root.style.setProperty("--input", themeConfig.borderColor);
    
    root.style.setProperty("--radius", themeConfig.borderRadius);
    root.style.setProperty("--font-scale", themeConfig.fontScale.toString());
    
    // New typography CSS variables
    root.style.setProperty("--font-family", themeConfig.fontFamily);
    root.style.setProperty("--heading-font-family", themeConfig.headingFontFamily);
    root.style.setProperty("--letter-spacing", themeConfig.letterSpacing + "px");
    root.style.setProperty("--line-height", themeConfig.lineHeight.toString());
    
    // Save theme config to localStorage
    localStorage.setItem(`themeConfig_${theme}`, JSON.stringify(themeConfig));
  }, [themeConfig, theme]);

  const updateThemeConfig = (config: Partial<ThemeConfigValues>) => {
    setThemeConfig(prev => {
      const newConfig = { ...prev, ...config };
      // Save immediately to ensure UI updates properly
      localStorage.setItem(`themeConfig_${theme}`, JSON.stringify(newConfig));
      return newConfig;
    });
  };

  const resetThemeConfig = () => {
    const defaultConfig = theme === 'dark' ? defaultDarkThemeConfig : defaultLightThemeConfig;
    setThemeConfig(defaultConfig);
    localStorage.setItem(`themeConfig_${theme}`, JSON.stringify(defaultConfig));
  };

  const applyPreset = (presetName: string) => {
    const presets = theme === 'dark' ? themePresets.dark : themePresets.light;
    if (presetName in presets) {
      const preset = presets[presetName as keyof typeof presets];
      setThemeConfig(preset);
      localStorage.setItem(`themeConfig_${theme}`, JSON.stringify(preset));
    } else {
      console.warn(`Theme preset "${presetName}" not found`);
    }
  };

  return (
    <ThemeConfigContext.Provider 
      value={{ 
        ...themeConfig, 
        updateThemeConfig, 
        resetThemeConfig,
        applyPreset
      }}
    >
      {children}
    </ThemeConfigContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useThemeConfig = () => {
  const context = useContext(ThemeConfigContext);
  if (context === undefined) {
    throw new Error("useThemeConfig must be used within a ThemeConfigProvider");
  }
  return context;
};
