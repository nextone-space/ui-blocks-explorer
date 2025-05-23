
import React from 'react';
import { useTranslation } from 'react-i18next';
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
  SidebarRail,
} from "@/components/ui/sidebar";
import { ListOrdered } from "lucide-react";
import { categories } from '@/data/components';

interface ComponentSidebarProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const ComponentSidebar = ({ 
  selectedCategory, 
  onSelectCategory
}: ComponentSidebarProps) => {
  const { t } = useTranslation();
  
  return (
    <Sidebar>
      <SidebarRail />
      <SidebarHeader className="flex flex-row items-center justify-between p-4">
        <h3 className="text-lg font-semibold">{t('common.components')}</h3>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{t('common.categories')}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  isActive={selectedCategory === 'all'}
                  onClick={() => onSelectCategory('all')}
                >
                  <ListOrdered className="h-4 w-4 mr-2" />
                  <span>{t('common.allComponents')}</span>
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
