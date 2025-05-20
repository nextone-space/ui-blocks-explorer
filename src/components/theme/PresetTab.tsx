
import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useThemeConfig } from "../ThemeConfigProvider";

// Theme presets data 
export const themePresets = [
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

export const PresetTab = () => {
  const { t } = useTranslation();
  const { applyPreset } = useThemeConfig();
  
  return (
    <div className="space-y-4">
      <Label>{t('themeConfig.presets', 'Theme Presets')}</Label>
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
  );
};
