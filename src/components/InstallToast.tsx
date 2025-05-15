
import React from 'react';
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ComponentType } from "@/data/components";
import { Copy } from "lucide-react";

export function showInstallToast(component: ComponentType) {
  const installCommand = `npx shadcn-ui@latest add ${component.id}`;
  
  toast(
    <div className="flex flex-col gap-2 w-full">
      <div className="font-semibold">{`Install ${component.name}`}</div>
      <div className="flex items-center gap-2">
        <code className="bg-muted p-1 px-2 rounded text-xs flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
          {installCommand}
        </code>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-6 w-6" 
          onClick={() => {
            navigator.clipboard.writeText(installCommand);
            toast("Command copied to clipboard");
          }}
        >
          <Copy className="h-3 w-3" />
        </Button>
      </div>
    </div>,
    {
      duration: 5000,
    }
  );
}
