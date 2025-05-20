
import React from "react";
import { useTranslation } from "react-i18next";
import { Separator } from "@/components/ui/separator";
import { useThemeConfig } from "../ThemeConfigProvider";
import { ColorInput } from "./ColorInput";

export const ColorsTab = () => {
  const { t } = useTranslation();
  const {
    primaryColor,
    secondaryColor,
    accentColor,
    backgroundColor,
    textColor,
    cardColor,
    mutedColor,
    borderColor,
    updateThemeConfig
  } = useThemeConfig();
  
  return (
    <div className="space-y-6">
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
    </div>
  );
};
