
import React, { useState, useEffect } from 'react';
import Hero from '@/components/Hero';
import ComponentFilter from '@/components/ComponentFilter';
import ComponentCard from '@/components/ComponentCard';
import { UsageDrawer } from '@/components/UsageDrawer';
import { showInstallToast } from '@/components/InstallToast';
import { components, categories, ComponentType } from '@/data/components';
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedComponent, setSelectedComponent] = useState<ComponentType | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Filter components based on category and search query
  const filteredComponents = components.filter(component => {
    const matchesCategory = selectedCategory === "all" || component.category === selectedCategory;
    const matchesSearch = component.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          component.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredComponents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentComponents = filteredComponents.slice(startIndex, endIndex);

  // Reset to first page when filters or search change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery]);

  const handleInstallClick = (component: ComponentType) => {
    showInstallToast(component);
  };

  const handleUsageClick = (component: ComponentType) => {
    setSelectedComponent(component);
    setIsDrawerOpen(true);
  };

  // Generate pagination items
  const generatePaginationItems = () => {
    const items = [];
    
    // Always show first page
    items.push(
      <PaginationItem key="first">
        <PaginationLink 
          isActive={currentPage === 1} 
          onClick={() => setCurrentPage(1)}
        >
          1
        </PaginationLink>
      </PaginationItem>
    );

    // Show ellipsis if needed
    if (currentPage > 3) {
      items.push(
        <PaginationItem key="ellipsis-1">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    // Show current page and surrounding pages
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      if (i === 1 || i === totalPages) continue; // Skip first and last as they're always shown
      items.push(
        <PaginationItem key={i}>
          <PaginationLink 
            isActive={currentPage === i} 
            onClick={() => setCurrentPage(i)}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    // Show ellipsis if needed
    if (currentPage < totalPages - 2) {
      items.push(
        <PaginationItem key="ellipsis-2">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    // Always show last page if there's more than one page
    if (totalPages > 1) {
      items.push(
        <PaginationItem key="last">
          <PaginationLink 
            isActive={currentPage === totalPages} 
            onClick={() => setCurrentPage(totalPages)}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return items;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Hero 
          title="ShadCN UI Blocks Showcase" 
          description="Explore reusable UI components with installation and usage guides. Build beautiful interfaces with these ready-to-use components."
        />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <ComponentFilter 
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
          
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search components..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
          {currentComponents.map((component) => (
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
            <p className="text-muted-foreground">No components found. Try adjusting your search or category filter.</p>
          </div>
        )}

        {totalPages > 1 && (
          <Pagination className="mt-8">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
              
              {generatePaginationItems()}
              
              <PaginationItem>
                <PaginationNext 
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
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
