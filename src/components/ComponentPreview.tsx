
import React from 'react';
import { ComponentType } from "@/data/components";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const ComponentPreview = ({ component }: { component: ComponentType }) => {
  switch (component.name) {
    case "Button":
      return <Button>Button</Button>;
    case "Badge":
      return <Badge>Badge</Badge>;
    case "Card":
      return (
        <Card className="w-[250px] h-[100px] flex items-center justify-center">
          <CardContent className="p-0">Card Component</CardContent>
        </Card>
      );
    case "Avatar":
      return (
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      );
    case "Dialog":
      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Open Dialog</Button>
          </DialogTrigger>
        </Dialog>
      );
    case "Input":
      return <Input className="w-[200px]" placeholder="Input field" />;
    case "Select":
      return (
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
        </Select>
      );
    case "Switch":
      return <Switch />;
    case "Tabs":
      return (
        <Tabs defaultValue="account" className="w-[250px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>
        </Tabs>
      );
    case "RadioGroup":
      return (
        <RadioGroup defaultValue="option-one" className="flex gap-2">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-one" id="option-one" />
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-two" id="option-two" />
          </div>
        </RadioGroup>
      );
    default:
      return <div className="text-sm text-muted-foreground">Preview not available</div>;
  }
};
