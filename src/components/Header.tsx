
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { 
  PanelLeft, 
  Sun, 
  Moon, 
  Github 
} from "lucide-react";
import { useTheme } from '@/components/ThemeProvider';
import LanguageSelector from '@/components/LanguageSelector';
import ThemeConfigPanel from '@/components/ThemeConfigPanel';

const Header = () => {
  const { t } = useTranslation();
  const { theme, setTheme } = useTheme();

  // Force re-render when theme changes
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key && e.key.startsWith('themeConfig_')) {
        // Force re-render by triggering state update
        setTheme(theme);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [theme, setTheme]);

  // Apply theme-specific CSS to body
  useEffect(() => {
    // Get stored theme config
    const savedConfig = localStorage.getItem(`themeConfig_${theme}`);
    if (savedConfig) {
      try {
        const config = JSON.parse(savedConfig);
        
        // Apply font family to body and headings
        if (config.fontFamily) {
          document.body.style.fontFamily = config.fontFamily;
        }
        
        // Add a style tag for heading font family
        let styleTag = document.getElementById('theme-typography');
        if (!styleTag) {
          styleTag = document.createElement('style');
          styleTag.id = 'theme-typography';
          document.head.appendChild(styleTag);
        }
        
        // Apply heading styles
        if (config.headingFontFamily) {
          styleTag.textContent = `
            h1, h2, h3, h4, h5, h6 {
              font-family: ${config.headingFontFamily};
            }
          `;
        }
        
        // Apply letter spacing to body
        if (config.letterSpacing !== undefined) {
          document.body.style.letterSpacing = `${config.letterSpacing}px`;
        }
        
        // Apply line height to body
        if (config.lineHeight !== undefined) {
          document.body.style.lineHeight = config.lineHeight.toString();
        }
      } catch (e) {
        console.error("Failed to parse saved theme config", e);
      }
    }
  }, [theme]);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <SidebarTrigger>
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">{t('header.toggleSidebar')}</span>
          </SidebarTrigger>
          <h1 className="text-xl font-semibold md:text-2xl">{t('header.title')}</h1>
        </div>
        <div className="flex items-center gap-2">
          <LanguageSelector />
          <ThemeConfigPanel />
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <Sun className={`h-5 w-5 transition-all ${
              theme !== "dark" ? "scale-100" : "scale-0 opacity-0"
            }`} />
            <Moon className={`absolute h-5 w-5 transition-all ${
              theme === "dark" ? "scale-100" : "scale-0 opacity-0"
            }`} />
            <span className="sr-only">{t('header.toggleTheme')}</span>
          </Button>
          <Button variant="ghost" size="icon">
            <Github className="h-5 w-5" />
            <span className="sr-only">{t('header.github')}</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
