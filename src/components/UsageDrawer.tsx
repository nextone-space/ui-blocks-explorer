
import React from 'react';
import { ComponentType } from "@/data/components";
import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle 
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface UsageDrawerProps {
  component: ComponentType | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UsageDrawer({ component, open, onOpenChange }: UsageDrawerProps) {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
    console.log('Copied to clipboard!');
  };

  if (!component) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-[540px] w-[90vw] overflow-y-auto">
        <SheetHeader className="mb-6">
          <SheetTitle className="text-2xl">{component.name}</SheetTitle>
          <SheetDescription>
            {component.description}
          </SheetDescription>
        </SheetHeader>

        <Tabs defaultValue="usage" className="mb-6">
          <TabsList className="mb-4">
            <TabsTrigger value="usage">Usage</TabsTrigger>
            <TabsTrigger value="props">Props</TabsTrigger>
          </TabsList>
          <TabsContent value="usage" className="space-y-4">
            <div className="relative">
              <pre className={cn(
                "max-h-[350px] overflow-auto rounded-lg border bg-muted p-4 text-sm",
              )}>
                <code className="text-foreground whitespace-pre">
                  {component.usage || "// Usage code not available"}
                </code>
              </pre>
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute top-2 right-2 h-6 w-6 text-muted-foreground" 
                onClick={() => copyToClipboard(component.usage || "")}>
                <Copy className="h-3 w-3" />
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="props" className="space-y-4">
            <div>
              {component.props ? (
                <div className="rounded-lg border">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="py-2 px-4 text-left font-medium">Prop</th>
                        <th className="py-2 px-4 text-left font-medium">Type</th>
                        <th className="py-2 px-4 text-left font-medium">Default</th>
                      </tr>
                    </thead>
                    <tbody>
                      {component.props.map((prop) => (
                        <tr key={prop.name} className="border-b last:border-0">
                          <td className="py-2 px-4">{prop.name}</td>
                          <td className="py-2 px-4 text-muted-foreground">{prop.type}</td>
                          <td className="py-2 px-4 text-muted-foreground">{prop.default || "-"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-muted-foreground">Props information not available</p>
              )}
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex flex-col gap-4">
          <div className="text-sm text-muted-foreground">
            <p className="font-medium mb-2">Install using CLI:</p>
            <pre className="p-2 rounded bg-muted">
              <code>
                npx shadcn-ui@latest add {component.id}
              </code>
            </pre>
          </div>
          
          <Button variant="outline" className="mt-2" asChild>
            <a 
              href={`https://ui.shadcn.com/docs/components/${component.id}`}
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2"
            >
              Official Documentation
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
