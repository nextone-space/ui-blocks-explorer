
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
import { Palette, RefreshCw, Check, Layout, Type, Sparkles } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

// Theme presets data 
const themePresets = [
  { name: "default", icon: "🌟", label: "Default" },
  { name: "blue", icon: "🔵", label: "Blue" },
  { name: "green", icon: "🟢", label: "Green" },
  { name: "purple", icon: "🟣", label: "Purple" },
  { name: "orange", icon: "🟠", label: "Orange" },
  { name: "compact", icon: "🔍", label: "Compact" },
  { name: "spacious", icon: "🌌", label: "Spacious" },
  { name: "serif", icon: "📜", label: "Serif" },
  { name: "modern", icon: "🎨", label: "Modern" },
];

// Font family options
const fontFamilyOptions = [
  { value: "system-ui, sans-serif", label: "System UI" },
  { value: "Arial, sans-serif", label: "Arial" },
  { value: "Helvetica, sans-serif", label: "Helvetica" },
  { value: "Georgia, serif", label: "Georgia" },
  { value: "Garamond, serif", label: "Garamond" },
  { value: "Verdana, sans-serif", label: "Verdana" },
  { value: "Courier New, monospace", label: "Courier New" },
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
    fontFamily,
    headingFontFamily,
    letterSpacing,
    lineHeight,
    mutedColor,
    backgroundColor,
    cardColor,
    textColor,
    borderColor,
    updateThemeConfig,
    resetThemeConfig,
    applyPreset
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
          <Tabs defaultValue="presets" className="w-full">
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="presets"><Sparkles className="h-4 w-4 mr-1" /> Presets</TabsTrigger>
              <TabsTrigger value="colors"><Palette className="h-4 w-4 mr-1" /> Colors</TabsTrigger>
              <TabsTrigger value="layout"><Layout className="h-4 w-4 mr-1" /> Layout</TabsTrigger>
              <TabsTrigger value="typography"><Type className="h-4 w-4 mr-1" /> Type</TabsTrigger>
            </TabsList>
            
            {/* Presets Tab */}
            <TabsContent value="presets" className="space-y-6">
              <div className="space-y-4">
                <Label>Theme Presets</Label>
                <div className="grid grid-cols-2 gap-2">
                  {themePresets.map((preset) => (
                    <Button
                      key={preset.name}
                      variant="outline"
                      className="h-auto py-3 justify-start"
                      onClick={() => applyPreset(preset.name)}
                    >
                      <div className="flex items-center">
                        <span className="text-xl mr-2">{preset.icon}</span>
                        <span>{preset.label}</span>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            {/* Colors Tab */}
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
            
            {/* Layout Tab */}
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
            </TabsContent>
            
            {/* Typography Tab */}
            <TabsContent value="typography" className="space-y-6">
              {/* Font Scale */}
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
              
              {/* Font Family */}
              <div className="space-y-2">
                <Label htmlFor="fontFamily">{t('themeConfig.fontFamily', 'Base Font Family')}</Label>
                <Select 
                  value={fontFamily} 
                  onValueChange={(value) => updateThemeConfig({ fontFamily: value })}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a font family" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Font Families</SelectLabel>
                      {fontFamilyOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Heading Font Family */}
              <div className="space-y-2">
                <Label htmlFor="headingFontFamily">{t('themeConfig.headingFontFamily', 'Heading Font Family')}</Label>
                <Select 
                  value={headingFontFamily} 
                  onValueChange={(value) => updateThemeConfig({ headingFontFamily: value })}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a heading font family" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Font Families</SelectLabel>
                      {fontFamilyOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Letter Spacing */}
              <div className="space-y-2">
                <Label htmlFor="letterSpacing">
                  {t('themeConfig.letterSpacing', 'Letter Spacing')}: {letterSpacing.toFixed(1)}px
                </Label>
                <Slider
                  id="letterSpacing"
                  min={-2}
                  max={2}
                  step={0.1}
                  value={[letterSpacing]}
                  onValueChange={([value]) => updateThemeConfig({ letterSpacing: value })}
                />
              </div>
              
              {/* Line Height */}
              <div className="space-y-2">
                <Label htmlFor="lineHeight">
                  {t('themeConfig.lineHeight', 'Line Height')}: {lineHeight.toFixed(1)}
                </Label>
                <Slider
                  id="lineHeight"
                  min={1}
                  max={2}
                  step={0.1}
                  value={[lineHeight]}
                  onValueChange={([value]) => updateThemeConfig({ lineHeight: value })}
                />
              </div>
              
              {/* Typography Preview */}
              <div className="pt-4 space-y-4 border p-4 rounded-lg">
                <p className="font-semibold">Preview:</p>
                <div style={{ 
                  fontFamily: headingFontFamily,
                  fontSize: `calc(${fontScale} * 1.5rem)`,
                  letterSpacing: `${letterSpacing}px`,
                  lineHeight: lineHeight
                }} className="font-bold mb-2">
                  Heading Text
                </div>
                <div style={{ 
                  fontFamily: fontFamily,
                  fontSize: `calc(${fontScale} * 1rem)`,
                  letterSpacing: `${letterSpacing}px`,
                  lineHeight: lineHeight
                }}>
                  <p className="mb-2">This is how your text will look with the current typography settings.</p>
                  <p>The quick brown fox jumps over the lazy dog.</p>
                </div>
              </div>
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
