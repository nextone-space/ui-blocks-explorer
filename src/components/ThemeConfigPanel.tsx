
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
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Palette, RefreshCw } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

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
    mutedColor,
    backgroundColor,
    cardColor,
    textColor,
    borderColor,
    updateThemeConfig,
    resetThemeConfig,
  } = useThemeConfig();

  const ColorInput = ({ 
    id, 
    label, 
    value, 
    onChange 
  }: { 
    id: string; 
    label: string; 
    value: string; 
    onChange: (value: string) => void;
  }) => (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="flex items-center gap-2">
        <div 
          className="w-6 h-6 rounded border" 
          style={{ backgroundColor: `hsl(${value})` }}
        />
        <Input
          id={id}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1"
        />
      </div>
    </div>
  );

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
          <Tabs defaultValue="colors" className="w-full">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="colors">Colors</TabsTrigger>
              <TabsTrigger value="layout">Layout</TabsTrigger>
              <TabsTrigger value="typography">Typography</TabsTrigger>
            </TabsList>
            
            <TabsContent value="colors" className="space-y-6">
              <ColorInput 
                id="primaryColor" 
                label={t('themeConfig.primaryColor', 'Primary Color')} 
                value={primaryColor} 
                onChange={(value) => updateThemeConfig({ primaryColor: value })}
              />
              
              <ColorInput 
                id="secondaryColor" 
                label={t('themeConfig.secondaryColor', 'Secondary Color')} 
                value={secondaryColor} 
                onChange={(value) => updateThemeConfig({ secondaryColor: value })}
              />
              
              <ColorInput 
                id="accentColor" 
                label={t('themeConfig.accentColor', 'Accent Color')}
                value={accentColor} 
                onChange={(value) => updateThemeConfig({ accentColor: value })}
              />
              
              <Separator />
              
              <ColorInput 
                id="backgroundColor" 
                label={t('themeConfig.backgroundColor', 'Background Color')}
                value={backgroundColor} 
                onChange={(value) => updateThemeConfig({ backgroundColor: value })}
              />
              
              <ColorInput 
                id="textColor" 
                label={t('themeConfig.textColor', 'Text Color')}
                value={textColor} 
                onChange={(value) => updateThemeConfig({ textColor: value })}
              />
              
              <ColorInput 
                id="cardColor" 
                label={t('themeConfig.cardColor', 'Card Color')}
                value={cardColor} 
                onChange={(value) => updateThemeConfig({ cardColor: value })}
              />
              
              <ColorInput 
                id="mutedColor" 
                label={t('themeConfig.mutedColor', 'Muted Color')}
                value={mutedColor} 
                onChange={(value) => updateThemeConfig({ mutedColor: value })}
              />
              
              <ColorInput 
                id="borderColor" 
                label={t('themeConfig.borderColor', 'Border Color')}
                value={borderColor} 
                onChange={(value) => updateThemeConfig({ borderColor: value })}
              />
            </TabsContent>
            
            <TabsContent value="layout" className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="borderRadius">{t('themeConfig.borderRadius', 'Border Radius')}</Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="borderRadius"
                    value={borderRadius}
                    onChange={(e) => updateThemeConfig({ borderRadius: e.target.value })}
                    className="flex-1"
                  />
                  <div 
                    className="w-10 h-10 bg-primary"
                    style={{ borderRadius: borderRadius }}
                  />
                </div>
              </div>
              
              {/* Add more layout options here if needed */}
            </TabsContent>
            
            <TabsContent value="typography" className="space-y-6">
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
                
                <div className="pt-4 space-y-2">
                  <p className="font-semibold">Preview:</p>
                  <h2 style={{ fontSize: `calc(${fontScale} * 1.5em)` }} className="font-bold">
                    Heading Text
                  </h2>
                  <p style={{ fontSize: `calc(${fontScale} * 1em)` }}>
                    This is how your text will look with the current scaling.
                  </p>
                </div>
              </div>
              
              {/* Add more typography options here if needed */}
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
