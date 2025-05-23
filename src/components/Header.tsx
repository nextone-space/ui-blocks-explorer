
import React from 'react';
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
