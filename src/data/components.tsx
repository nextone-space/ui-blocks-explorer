import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export interface ComponentType {
  id: string;
  name: string;
  description: string;
  category: string;
  preview: React.ReactNode;
  usage: string;
  installCommand: string;
  updatedAt?: string; // Date when the component was last updated
  installCount?: number; // Number of installations
  trendingScore?: number; // A score to indicate how "hot" the component is
}

export const categories = [
  "Actions",
  "Data Display",
  "Feedback",
  "Forms",
  "Layout",
  "Navigation",
  "Overlays",
  "Typography"
];

// Helper function to generate random dates within the last 30 days
const randomRecentDate = () => {
  const now = new Date();
  const daysAgo = Math.floor(Math.random() * 30);
  const date = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);
  return date.toISOString();
};

// Helper function to generate random install counts between 100 and 5000
const randomInstallCount = () => Math.floor(Math.random() * 4900) + 100;

// Helper function to generate trending scores (combination of recency and popularity)
const calculateTrendingScore = (updatedAt: string, installCount: number) => {
  const daysSinceUpdate = (Date.now() - new Date(updatedAt).getTime()) / (1000 * 60 * 60 * 24);
  return installCount * (1 / (daysSinceUpdate + 1));
};

// Your existing components array with added properties for sorting
export const components: ComponentType[] = [
  {
    id: "avatar",
    name: "Avatar",
    description: "A profile image with support for initials and fallback.",
    category: "Data Display",
    preview: (
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    ),
    usage: `<Avatar>
  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>`,
    installCommand: "npx shadcn-ui@latest add avatar",
  },
  {
    id: "dropdown-menu",
    name: "Dropdown Menu",
    description: "A menu for displaying a list of options.",
    category: "Navigation",
    preview: (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Open</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Log out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
    usage: `<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Open</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent className="w-56">
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem>Billing</DropdownMenuItem>
    <DropdownMenuItem>Team</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Log out</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`,
    installCommand: "npx shadcn-ui@latest add dropdown-menu",
  },
  {
    id: "badge",
    name: "Badge",
    description: "Display eye-catching status or category labels.",
    category: "Data Display",
    preview: <Badge>Badge</Badge>,
    usage: `<Badge>Badge</Badge>`,
    installCommand: "npx shadcn-ui@latest add badge",
  },
  {
    id: "button",
    name: "Button",
    description: "A button that triggers an action.",
    category: "Actions",
    preview: <Button>Button</Button>,
    usage: `<Button>Button</Button>`,
    installCommand: "npx shadcn-ui@latest add button",
  },
  {
    id: "card",
    name: "Card",
    description: "A container for grouping related content.",
    category: "Layout",
    preview: (
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>Card Content</CardContent>
        <CardFooter>Card Footer</CardFooter>
      </Card>
    ),
    usage: `<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card Description</CardDescription>
  </CardHeader>
  <CardContent>Card Content</CardContent>
  <CardFooter>Card Footer</CardFooter>
</Card>`,
    installCommand: "npx shadcn-ui@latest add card",
  },
  {
    id: "input",
    name: "Input",
    description: "A field for accepting user input.",
    category: "Forms",
    preview: <Input placeholder="Input" />,
    usage: `<Input placeholder="Input" />`,
    installCommand: "npx shadcn-ui@latest add input",
  },
  {
    id: "label",
    name: "Label",
    description: "A visual label for form elements.",
    category: "Forms",
    preview: <Label>Label</Label>,
    usage: `<Label>Label</Label>`,
    installCommand: "npx shadcn-ui@latest add label",
  },
  {
    id: "select",
    name: "Select",
    description: "A dropdown menu for selecting an option.",
    category: "Forms",
    preview: (
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">Option 1</SelectItem>
          <SelectItem value="2">Option 2</SelectItem>
        </SelectContent>
      </Select>
    ),
    usage: `<Select>
  <SelectTrigger>
    <SelectValue placeholder="Select" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="1">Option 1</SelectItem>
    <SelectItem value="2">Option 2</SelectItem>
  </SelectContent>
</Select>`,
    installCommand: "npx shadcn-ui@latest add select",
  },
  {
    id: "textarea",
    name: "Textarea",
    description: "A multi-line text input control.",
    category: "Forms",
    preview: <Textarea placeholder="Textarea" />,
    usage: `<Textarea placeholder="Textarea" />`,
    installCommand: "npx shadcn-ui@latest add textarea",
  },
].map(component => {
  const updatedAt = randomRecentDate();
  const installCount = randomInstallCount();
  return {
    ...component,
    updatedAt,
    installCount,
    trendingScore: calculateTrendingScore(updatedAt, installCount)
  };
});
