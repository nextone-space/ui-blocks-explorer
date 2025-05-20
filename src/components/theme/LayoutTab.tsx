
import React from "react";
import { useTranslation } from "react-i18next";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useThemeConfig } from "../ThemeConfigProvider";

export const LayoutTab = () => {
  const { t } = useTranslation();
  const { borderRadius, updateThemeConfig } = useThemeConfig();
  
  return (
    <div className="space-y-6">
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
    </div>
  );
};
