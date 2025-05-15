
import React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ListOrdered, ArrowDown, ArrowUp, Filter } from "lucide-react";
import { categories } from '@/data/components';

interface ComponentSidebarProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  sortOrder: 'latest' | 'popular' | 'hot';
  onSortOrderChange: (order: 'latest' | 'popular' | 'hot') => void;
}

const ComponentSidebar = ({ 
  selectedCategory, 
  onSelectCategory,
  sortOrder,
  onSortOrderChange 
}: ComponentSidebarProps) => {
  return (
    <Sidebar>
      <SidebarHeader className="flex flex-row items-center justify-between p-4">
        <h3 className="text-lg font-semibold">Components</h3>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Sort By</SidebarGroupLabel>
          <SidebarGroupContent className="px-2">
            <ToggleGroup type="single" value={sortOrder} onValueChange={(value) => {
              if (value) onSortOrderChange(value as 'latest' | 'popular' | 'hot');
            }}>
              <ToggleGroupItem value="latest" aria-label="Sort by latest" className="flex items-center gap-2">
                <ArrowDown className="h-4 w-4" />
                <span>Latest</span>
              </ToggleGroupItem>
              <ToggleGroupItem value="popular" aria-label="Sort by popular" className="flex items-center gap-2">
                <ArrowUp className="h-4 w-4" />
                <span>Popular</span>
              </ToggleGroupItem>
              <ToggleGroupItem value="hot" aria-label="Sort by hot" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <span>Hot</span>
              </ToggleGroupItem>
            </ToggleGroup>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>Categories</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  isActive={selectedCategory === 'all'}
                  onClick={() => onSelectCategory('all')}
                >
                  <ListOrdered className="h-4 w-4 mr-2" />
                  <span>All Components</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {categories.map((category) => (
                <SidebarMenuItem key={category}>
                  <SidebarMenuButton 
                    isActive={selectedCategory === category}
                    onClick={() => onSelectCategory(category)}
                  >
                    <span>{category}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default ComponentSidebar;
