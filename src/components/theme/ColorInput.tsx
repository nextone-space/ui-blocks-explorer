
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Check } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

// Predefined color palette
export const colorPalette = [
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

interface ColorInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
}

// Parse HSL string to individual values
const parseHsl = (hslString: string) => {
  const [h, s, l] = hslString.split(' ').map(val => parseFloat(val.replace('%', '')));
  return { h, s, l };
};
  
// Create an HSL color string
const createHslString = (h: number, s: number, l: number) => {
  return `${h} ${s}% ${l}%`;
};

export const ColorInput = ({ id, label, value, onChange }: ColorInputProps) => {
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
