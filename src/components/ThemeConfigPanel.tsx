
import React from "react";
import { useTranslation } from "react-i18next";
import { useThemeConfig } from "./ThemeConfigProvider";
import { useTheme } from "./ThemeProvider";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Palette, RefreshCw } from "lucide-react";

interface ThemeConfigPanelProps {
  side?: "top" | "right" | "bottom" | "left";
}

const ThemeConfigPanel = ({ side = "right" }: ThemeConfigPanelProps) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const {
    primaryColor,
    secondaryColor,
    accentColor,
    borderRadius,
    fontScale,
    updateThemeConfig,
    resetThemeConfig,
  } = useThemeConfig();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Palette className="h-5 w-5" />
          <span className="sr-only">{t('themeConfig.openConfig')}</span>
        </Button>
      </SheetTrigger>
      <SheetContent side={side} className="w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle>{t('themeConfig.title', 'Theme Configuration')}</SheetTitle>
          <SheetDescription>
            {t('themeConfig.description', 'Customize your theme appearance')}
          </SheetDescription>
        </SheetHeader>
        
        <div className="py-6 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="primaryColor">{t('themeConfig.primaryColor', 'Primary Color')}</Label>
            <div className="flex items-center gap-2">
              <div 
                className="w-6 h-6 rounded border" 
                style={{ backgroundColor: primaryColor }}
              />
              <Input
                id="primaryColor"
                type="color"
                value={primaryColor}
                onChange={(e) => updateThemeConfig({ primaryColor: e.target.value })}
              />
              <Input
                value={primaryColor}
                onChange={(e) => updateThemeConfig({ primaryColor: e.target.value })}
                className="flex-1"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="secondaryColor">{t('themeConfig.secondaryColor', 'Secondary Color')}</Label>
            <div className="flex items-center gap-2">
              <div 
                className="w-6 h-6 rounded border" 
                style={{ backgroundColor: secondaryColor }}
              />
              <Input
                id="secondaryColor"
                type="color"
                value={secondaryColor}
                onChange={(e) => updateThemeConfig({ secondaryColor: e.target.value })}
              />
              <Input
                value={secondaryColor}
                onChange={(e) => updateThemeConfig({ secondaryColor: e.target.value })}
                className="flex-1"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="accentColor">{t('themeConfig.accentColor', 'Accent Color')}</Label>
            <div className="flex items-center gap-2">
              <div 
                className="w-6 h-6 rounded border" 
                style={{ backgroundColor: accentColor }}
              />
              <Input
                id="accentColor"
                type="color"
                value={accentColor}
                onChange={(e) => updateThemeConfig({ accentColor: e.target.value })}
              />
              <Input
                value={accentColor}
                onChange={(e) => updateThemeConfig({ accentColor: e.target.value })}
                className="flex-1"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="borderRadius">{t('themeConfig.borderRadius', 'Border Radius')}</Label>
            <div className="flex items-center gap-4">
              <Input
                id="borderRadius"
                value={borderRadius}
                onChange={(e) => updateThemeConfig({ borderRadius: e.target.value })}
              />
              <div 
                className="w-10 h-10 bg-primary"
                style={{ borderRadius: borderRadius }}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="fontScale">
              {t('themeConfig.fontScale', 'Font Scale')}: {fontScale.toFixed(1)}
            </Label>
            <Slider
              id="fontScale"
              min={0.8}
              max={1.4}
              step={0.1}
              value={[fontScale]}
              onValueChange={([value]) => updateThemeConfig({ fontScale: value })}
            />
          </div>
          
          <Button 
            variant="outline" 
            onClick={resetThemeConfig} 
            className="w-full mt-4"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            {t('themeConfig.reset', 'Reset to Default')}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ThemeConfigPanel;
