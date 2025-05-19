
import React, { createContext, useContext, useEffect, useState } from "react";
import { useTheme } from "./ThemeProvider";

interface ThemeConfigContextType {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  borderRadius: string;
  fontScale: number;
  updateThemeConfig: (config: Partial<ThemeConfigValues>) => void;
  resetThemeConfig: () => void;
}

interface ThemeConfigValues {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  borderRadius: string;
  fontScale: number;
}

const defaultThemeConfig: ThemeConfigValues = {
  primaryColor: "hsl(222.2, 47.4%, 11.2%)",
  secondaryColor: "hsl(210, 40%, 96.1%)",
  accentColor: "hsl(210, 40%, 96.1%)",
  borderRadius: "0.5rem",
  fontScale: 1,
};

const ThemeConfigContext = createContext<ThemeConfigContextType | undefined>(undefined);

export function ThemeConfigProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  const [themeConfig, setThemeConfig] = useState<ThemeConfigValues>(() => {
    // Try to load saved theme config from localStorage
    if (typeof window !== "undefined") {
      const savedConfig = localStorage.getItem("themeConfig");
      if (savedConfig) {
        try {
          return JSON.parse(savedConfig);
        } catch (e) {
          console.error("Failed to parse saved theme config", e);
        }
      }
    }
    return defaultThemeConfig;
  });

  // Apply theme configuration to CSS variables
  useEffect(() => {
    const root = document.documentElement;
    
    // Apply theme config values to CSS variables
    root.style.setProperty("--primary", themeConfig.primaryColor);
    root.style.setProperty("--secondary", themeConfig.secondaryColor);
    root.style.setProperty("--accent", themeConfig.accentColor);
    root.style.setProperty("--radius", themeConfig.borderRadius);
    
    // Apply font scale
    root.style.setProperty("--font-scale", themeConfig.fontScale.toString());
    
    // Save theme config to localStorage
    localStorage.setItem("themeConfig", JSON.stringify(themeConfig));
  }, [themeConfig, theme]);

  const updateThemeConfig = (config: Partial<ThemeConfigValues>) => {
    setThemeConfig(prev => ({ ...prev, ...config }));
  };

  const resetThemeConfig = () => {
    setThemeConfig(defaultThemeConfig);
  };

  return (
    <ThemeConfigContext.Provider 
      value={{ 
        ...themeConfig, 
        updateThemeConfig, 
        resetThemeConfig 
      }}
    >
      {children}
    </ThemeConfigContext.Provider>
  );
}

export const useThemeConfig = () => {
  const context = useContext(ThemeConfigContext);
  if (context === undefined) {
    throw new Error("useThemeConfig must be used within a ThemeConfigProvider");
  }
  return context;
};
