
import React, { useState } from 'react';
import Hero from '@/components/Hero';
import ComponentFilter from '@/components/ComponentFilter';
import ComponentCard from '@/components/ComponentCard';
import { UsageDrawer } from '@/components/UsageDrawer';
import { showInstallToast } from '@/components/InstallToast';
import { components, categories, ComponentType } from '@/data/components';

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedComponent, setSelectedComponent] = useState<ComponentType | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const filteredComponents = selectedCategory === "all"
    ? components
    : components.filter(component => component.category === selectedCategory);

  const handleInstallClick = (component: ComponentType) => {
    showInstallToast(component);
  };

  const handleUsageClick = (component: ComponentType) => {
    setSelectedComponent(component);
    setIsDrawerOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Hero 
          title="ShadCN UI Blocks Showcase" 
          description="Explore reusable UI components with installation and usage guides. Build beautiful interfaces with these ready-to-use components."
        />

        <ComponentFilter 
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
          {filteredComponents.map((component) => (
            <ComponentCard
              key={component.id}
              component={component}
              onClickInstall={handleInstallClick}
              onClickUsage={handleUsageClick}
            />
          ))}
        </div>

        {filteredComponents.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No components found in this category.</p>
          </div>
        )}
      </div>

      <UsageDrawer 
        component={selectedComponent} 
        open={isDrawerOpen}
        onOpenChange={setIsDrawerOpen}
      />
    </div>
  );
};

export default Index;
