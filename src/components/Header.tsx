
import React from 'react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { 
  PanelLeft, 
  Sun, 
  Moon, 
  Github 
} from "lucide-react";
import { useTheme } from '@/components/ThemeProvider';

const Header = () => {
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <SidebarTrigger>
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle Sidebar</span>
          </SidebarTrigger>
          <h1 className="text-xl font-semibold md:text-2xl">ShadCN UI Blocks</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <Sun className={`h-5 w-5 transition-all ${
              theme === "dark" ? "scale-0" : "scale-100"
            }`} />
            <Moon className={`absolute h-5 w-5 transition-all ${
              theme === "dark" ? "scale-100" : "scale-0"
            }`} />
            <span className="sr-only">Toggle theme</span>
          </Button>
          <Button variant="ghost" size="icon">
            <Github className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
