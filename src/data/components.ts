
export interface PropType {
  name: string;
  type: string;
  default?: string;
  description?: string;
}

export interface ComponentType {
  id: string;
  name: string;
  category: string;
  description: string;
  usage: string;
  props?: PropType[];
}

export const components: ComponentType[] = [
  {
    id: "button",
    name: "Button",
    category: "Inputs",
    description: "Displays a button or a component that looks like a button.",
    usage: `import { Button } from "@/components/ui/button"

export function ButtonDemo() {
  return (
    <Button variant="outline">Button</Button>
  )
}`,
    props: [
      { name: "variant", type: "string", default: "default" },
      { name: "size", type: "string", default: "default" },
      { name: "asChild", type: "boolean", default: "false" },
    ],
  },
  {
    id: "badge",
    name: "Badge",
    category: "Display",
    description: "Displays a badge or a component that looks like a badge.",
    usage: `import { Badge } from "@/components/ui/badge"

export function BadgeDemo() {
  return <Badge>Badge</Badge>
}`,
    props: [
      { name: "variant", type: "string", default: "default" },
    ],
  },
  {
    id: "card",
    name: "Card",
    category: "Layout",
    description: "Displays a card with header, content, and footer.",
    usage: `import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function CardDemo() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  )
}`,
  },
  {
    id: "avatar",
    name: "Avatar",
    category: "Display",
    description: "An image element with a fallback for displaying user avatars.",
    usage: `import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function AvatarDemo() {
  return (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  )
}`,
  },
  {
    id: "dialog",
    name: "Dialog",
    category: "Overlays",
    description: "A window overlaid on either the primary window or another dialog window.",
    usage: `import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}`,
  },
  {
    id: "input",
    name: "Input",
    category: "Inputs",
    description: "Displays a form input field or a component that looks like an input field.",
    usage: `import { Input } from "@/components/ui/input"

export function InputDemo() {
  return <Input type="email" placeholder="Email" />
}`,
  },
  {
    id: "select",
    name: "Select",
    category: "Inputs",
    description: "Displays a list of options for the user to pick from—triggered by a button.",
    usage: `import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function SelectDemo() {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="light">Light</SelectItem>
        <SelectItem value="dark">Dark</SelectItem>
        <SelectItem value="system">System</SelectItem>
      </SelectContent>
    </Select>
  )
}`,
  },
  {
    id: "switch",
    name: "Switch",
    category: "Inputs",
    description: "A control that allows the user to toggle between checked and not checked.",
    usage: `import { Switch } from "@/components/ui/switch"

export function SwitchDemo() {
  return <Switch />
}`,
  },
  {
    id: "tabs",
    name: "Tabs",
    category: "Navigation",
    description: "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
    usage: `import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function TabsDemo() {
  return (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">Account settings.</TabsContent>
      <TabsContent value="password">Change password.</TabsContent>
    </Tabs>
  )
}`,
  },
  {
    id: "radio-group",
    name: "RadioGroup",
    category: "Inputs",
    description: "A set of checkable buttons—known as radio buttons—where no more than one of the buttons can be checked at a time.",
    usage: `import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export function RadioGroupDemo() {
  return (
    <RadioGroup defaultValue="option-one">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-one" id="option-one" />
        <Label htmlFor="option-one">Option One</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-two" id="option-two" />
        <Label htmlFor="option-two">Option Two</Label>
      </div>
    </RadioGroup>
  )
}`,
  },
];

export const categories = [
  "Inputs", 
  "Display", 
  "Layout", 
  "Navigation", 
  "Overlays"
];
