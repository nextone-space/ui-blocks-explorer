
import React from "react";
import { useTranslation } from "react-i18next";
import { useThemeConfig } from "./ThemeConfigProvider";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Palette, RefreshCw, Layout, Type, Sparkles } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Import theme config components
import { PresetTab } from "./theme/PresetTab";
import { ColorsTab } from "./theme/ColorsTab";
import { LayoutTab } from "./theme/LayoutTab";
import { TypographyTab } from "./theme/TypographyTab";

interface ThemeConfigPanelProps {
  side?: "top" | "right" | "bottom" | "left";
}

const ThemeConfigPanel = ({ side = "right" }: ThemeConfigPanelProps) => {
  const { t } = useTranslation();
  const { resetThemeConfig } = useThemeConfig();
  
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Palette className="h-5 w-5" />
          <span className="sr-only">{t('themeConfig.openConfig')}</span>
        </Button>
      </SheetTrigger>
      <SheetContent side={side} className="w-[300px] sm:w-[400px] overflow-y-auto max-h-screen">
        <SheetHeader>
          <SheetTitle>{t('themeConfig.title', 'Theme Configuration')}</SheetTitle>
          <SheetDescription>
            {t('themeConfig.description', 'Customize your theme appearance')}
          </SheetDescription>
        </SheetHeader>
        
        <div className="py-6">
          <Tabs defaultValue="presets" className="w-full">
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="presets"><Sparkles className="h-4 w-4 mr-1" /> Presets</TabsTrigger>
              <TabsTrigger value="colors"><Palette className="h-4 w-4 mr-1" /> Colors</TabsTrigger>
              <TabsTrigger value="layout"><Layout className="h-4 w-4 mr-1" /> Layout</TabsTrigger>
              <TabsTrigger value="typography"><Type className="h-4 w-4 mr-1" /> Type</TabsTrigger>
            </TabsList>
            
            {/* Presets Tab */}
            <TabsContent value="presets" className="space-y-6">
              <PresetTab />
            </TabsContent>
            
            {/* Colors Tab */}
            <TabsContent value="colors" className="space-y-6">
              <ColorsTab />
            </TabsContent>
            
            {/* Layout Tab */}
            <TabsContent value="layout" className="space-y-6">
              <LayoutTab />
            </TabsContent>
            
            {/* Typography Tab */}
            <TabsContent value="typography" className="space-y-6">
              <TypographyTab />
            </TabsContent>
          </Tabs>
        </div>
        
        <SheetFooter>
          <Button 
            variant="outline" 
            onClick={resetThemeConfig} 
            className="w-full mt-4"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            {t('themeConfig.reset', 'Reset to Default')}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default ThemeConfigPanel;
