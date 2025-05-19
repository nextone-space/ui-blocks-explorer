
import React, { useState } from "react";
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
import { Palette, RefreshCw, Check } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface ThemeConfigPanelProps {
  side?: "top" | "right" | "bottom" | "left";
}

// Predefined color palette
const colorPalette = [
  // Gray and neutral shades
  "222.2 47.4% 11.2%", // Dark Gray
  "220 13% 91%", // Light Gray
  "0 0% 45%", // Medium Gray
  "210 40% 96.1%", // Soft Gray
  // Primary colors
  "262 83.3% 57.8%", // Purple
  "221 83% 53%", // Blue
  "142 71% 45%", // Green
  "36 100% 50%", // Orange
  "0 84.2% 60.2%", // Red
  "330 81% 60%", // Pink
  // Pastels
  "262 83% 84%", // Light Purple
  "221 83% 84%", // Light Blue
  "142 71% 84%", // Light Green
  "36 100% 84%", // Light Orange
  "0 84% 84%", // Light Red
  "330 81% 84%", // Light Pink
];

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
  
  // State for current color editing
  const [editingColor, setEditingColor] = useState<string | null>(null);

  // Convert HSL string to individual values for display
  const parseHsl = (hslString: string) => {
    const [h, s, l] = hslString.split(' ').map(val => parseFloat(val.replace('%', '')));
    return { h, s, l };
  };
  
  // Function to create an HSL color string
  const createHslString = (h: number, s: number, l: number) => {
    return `${h} ${s}% ${l}%`;
  };

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
  }) => {
    const { h, s, l } = parseHsl(value);
    
    return (
      <div className="space-y-2">
        <Label htmlFor={id}>{label}</Label>
        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <button 
                className="w-8 h-8 rounded-md border shadow-sm flex items-center justify-center overflow-hidden" 
                style={{ backgroundColor: `hsl(${value})` }}
                aria-label={`Pick a color for ${label}`}
              >
                <span className="sr-only">Open color picker</span>
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-3">
              <div className="space-y-3">
                <div className="grid grid-cols-4 gap-2">
                  {colorPalette.map((color, i) => (
                    <button
                      key={i}
                      className="w-8 h-8 rounded-md border relative hover:scale-110 transition-transform"
                      style={{ backgroundColor: `hsl(${color})` }}
                      onClick={() => onChange(color)}
                      aria-label={`Select color ${i + 1}`}
                    >
                      {value === color && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Check className="h-4 w-4 text-white drop-shadow-md" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
                <div className="space-y-2">
                  <div>
                    <Label htmlFor={`${id}-hue`}>Hue</Label>
                    <Slider 
                      id={`${id}-hue`}
                      min={0} 
                      max={360} 
                      step={1}
                      value={[h]} 
                      onValueChange={([newH]) => onChange(createHslString(newH, s, l))}
                      className="h-4 my-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`${id}-saturation`}>Saturation</Label>
                    <Slider 
                      id={`${id}-saturation`}
                      min={0} 
                      max={100} 
                      step={1}
                      value={[s]} 
                      onValueChange={([newS]) => onChange(createHslString(h, newS, l))}
                      className="h-4 my-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`${id}-lightness`}>Lightness</Label>
                    <Slider 
                      id={`${id}-lightness`}
                      min={0} 
                      max={100} 
                      step={1}
                      value={[l]} 
                      onValueChange={([newL]) => onChange(createHslString(h, s, newL))}
                      className="h-4 my-1"
                    />
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
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
  };

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
