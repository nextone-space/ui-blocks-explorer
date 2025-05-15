
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ComponentPreview } from "@/components/ComponentPreview";
import { ComponentType } from "@/data/components";

interface ComponentCardProps {
  component: ComponentType;
  onClickInstall: (component: ComponentType) => void;
  onClickUsage: (component: ComponentType) => void;
}

const ComponentCard = ({ 
  component, 
  onClickInstall, 
  onClickUsage 
}: ComponentCardProps) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">{component.name}</CardTitle>
      </CardHeader>
      <CardContent className="p-6 bg-muted/40 flex items-center justify-center min-h-[140px]">
        <ComponentPreview component={component} />
      </CardContent>
      <CardFooter className="flex gap-2 pt-4 pb-4">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex-1"
          onClick={() => onClickInstall(component)}
        >
          Install from Registry
        </Button>
        <Button 
          variant="default" 
          size="sm" 
          className="flex-1"
          onClick={() => onClickUsage(component)}
        >
          View Usage
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ComponentCard;
