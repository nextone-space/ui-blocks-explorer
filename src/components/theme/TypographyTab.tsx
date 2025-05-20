
import React from "react";
import { useTranslation } from "react-i18next";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useThemeConfig } from "../ThemeConfigProvider";
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Font family options
export const fontFamilyOptions = [
  { value: "system-ui, sans-serif", label: "System UI" },
  { value: "Arial, sans-serif", label: "Arial" },
  { value: "Helvetica, sans-serif", label: "Helvetica" },
  { value: "Georgia, serif", label: "Georgia" },
  { value: "Garamond, serif", label: "Garamond" },
  { value: "Verdana, sans-serif", label: "Verdana" },
  { value: "Courier New, monospace", label: "Courier New" },
];

export const TypographyTab = () => {
  const { t } = useTranslation();
  const {
    fontScale,
    fontFamily,
    headingFontFamily,
    letterSpacing,
    lineHeight,
    updateThemeConfig
  } = useThemeConfig();
  
  return (
    <div className="space-y-6">
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
    </div>
  );
};
